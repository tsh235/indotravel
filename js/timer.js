export const timer = () => {
  const timerBlock = document.querySelector('[data-timer-deadline]');
  
  if (!timerBlock) return;
  
  timerBlock.classList.add('timer');
  timerBlock.style.fontFamily = 'inherit';
  const deadline = timerBlock.dataset.timerDeadline;

  const createTimer = (elem) => {
    const timerTitle = document.createElement('p');
    timerTitle.classList.add('timer__title');
    timerTitle.textContent = 'До конца акции осталось:';

    const timerItemDays = document.createElement('p');
    timerItemDays.classList.add('timer__item', 'timer__item_days');

    const timerCountDays = document.createElement('span');
    timerCountDays.classList.add('timer__count', 'timer__count_days');

    const timerUnitsDays = document.createElement('span');
    timerUnitsDays.classList.add('timer__units', 'timer__units_days');

    timerItemDays.append(timerCountDays, timerUnitsDays);

    const timerItemHours = document.createElement('p');
    timerItemHours.classList.add('timer__item', 'timer__item_hours');

    const timerCountHours = document.createElement('span');
    timerCountHours.classList.add('timer__count', 'timer__count_hours');

    const timerUnitsHours = document.createElement('span');
    timerUnitsHours.classList.add('timer__units', 'timer__units_hours');

    timerItemHours.append(timerCountHours, timerUnitsHours);

    const timerItemMinutes = document.createElement('p');
    timerItemMinutes.classList.add('timer__item', 'timer__item_minutes');

    const timerCountMinutes = document.createElement('span');
    timerCountMinutes.classList.add('timer__count', 'timer__count_minutes');

    const timerUnitsMinutes = document.createElement('span');
    timerUnitsMinutes.classList.add('timer__units', 'timer__units_minutes');

    timerItemMinutes.append(timerCountMinutes, timerUnitsMinutes);

    elem.append(timerTitle, timerItemDays, timerItemHours, timerItemMinutes);

    return {
      timerCountDays,
      timerUnitsDays,
      timerCountHours,
      timerUnitsHours,
      timerCountMinutes,
      timerUnitsMinutes,
    }
  };

  const {
    timerCountDays,
    timerUnitsDays,
    timerCountHours,
    timerUnitsHours,
    timerCountMinutes,
    timerUnitsMinutes,
  } = createTimer(timerBlock);

  const declension = (words, value) => {
    const cases = [ 2, 0, 1, 1, 1, 2 ];
    return words[(value % 100 > 4 && value % 100 < 20) ? 2 : cases[(value % 10 < 5) ? value % 10 : 5]];
  };

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();

    const timeRemaining = dateStop - dateNow;
    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24 % 30);

    return {timeRemaining, seconds, minutes, hours, days};
  }

  const startTimer = () => {
    const timer = getTimeRemaining();

    const days = declension(['день', 'дня', 'дней'], timer.days);
    const hours = declension(['час', 'часа', 'часов'], timer.hours);
    const minutes = declension(['минута', 'минуты', 'минут'], timer.minutes);
    const seconds = declension(['секунда', 'секунды', 'секунд'], timer.seconds);

    if (timer.days > 0) {
      timerCountDays.textContent = timer.days;
      timerUnitsDays.textContent = days;
      timerCountHours.textContent = timer.hours >= 10 ? timer.hours : `0${timer.hours}`;
      timerUnitsHours.textContent = hours;
      timerCountMinutes.textContent = timer.minutes >= 10 ? timer.minutes : `0${timer.minutes}`;
      timerUnitsMinutes.textContent = minutes;
    } else {
      timerCountDays.textContent = timer.hours >= 10 ? timer.hours : `0${timer.hours}`;
      timerUnitsDays.textContent = hours;
      timerCountHours.textContent = timer.minutes >= 10 ? timer.minutes : `0${timer.minutes}`;
      timerUnitsHours.textContent = minutes;
      timerCountMinutes.textContent = timer.seconds >= 10 ? timer.seconds : `0${timer.seconds}`;
      timerUnitsMinutes.textContent = seconds;
    }

    const intervalId = setTimeout(startTimer, 1000);

    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);
      timerBlock.remove();
    }
  }
  
  startTimer();
};

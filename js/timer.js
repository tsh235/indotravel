export const timer = deadline => {
  const heroTimer = document.querySelector('.hero__timer');
  const heroText = document.querySelector('.hero__text');
  const timerCountDays = document.querySelector('.timer__count_days');
  const timerUnitsDays = document.querySelector('.timer__units_days');
  const timerCountHours = document.querySelector('.timer__count_hours');
  const timerUnitsHours = document.querySelector('.timer__units_hours');
  const timerCountMinutes = document.querySelector('.timer__count_minutes');
  const timerUnitsMinutes = document.querySelector('.timer__units_minutes');

  const declension = (words, value) => {
    const cases = [ 2, 0, 1, 1, 1, 2 ];
    return words[(value % 100 > 4 && value % 100 < 20) ? 2 : cases[(value % 10 < 5) ? value % 10 : 5]];
  };

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline);
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

    timerCountDays.textContent = timer.days;
    timerUnitsDays.textContent = days;
    timerCountHours.textContent = timer.hours >= 10 ? timer.hours : `0${timer.hours}`;
    timerUnitsHours.textContent = hours;
    timerCountMinutes.textContent = timer.minutes >= 10 ? timer.minutes : `0${timer.minutes}`;
    timerUnitsMinutes.textContent = minutes;

    const intervalId = setTimeout(startTimer, 1000);

    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);
      heroTimer.remove();
      heroText.remove();
    }
  }
  
  startTimer();
};

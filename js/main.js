import {timer} from './timer.js';
import './burger.js';
import './accordion.js';
import './fly.js';
import {dateConversion, declension} from './helper.js';

timer();

const getData = async () => {
  const response = await fetch('date.json');
  const data = await response.json();
  return data;
};

const data = await getData();

const tourForm = document.querySelector('.tour__form');
const selectDates = document.querySelectorAll('[name="dates"]');
const selectPeoples = document.querySelectorAll('[name="people"]');
const reservationForm = document.querySelector('.reservation__form');
const reservationData = reservationForm.querySelector('.reservation__data');
const reservationPrice = reservationForm.querySelector('.reservation__price');
reservationData.textContent = '';
reservationPrice.textContent = '';

// получаем значение селекта
const getValue = (select) => {
  const selectedValue = select.options[select.selectedIndex].value;
  return selectedValue;
};

// находим объект с нужной датой и вытаскиваем значение
const findObject = (arr, value) => arr.find(obj => obj.date === value);

const renderOptionsDate = (data, select) => {
  if (select.classList.contains('tour__select')) {
    select.innerHTML = `
      <option value="" class="tour__option">Выбери дату</option>
    `;
  } else {
    select.innerHTML = `
      <option value="" class="tour__option">Дата путешествия</option>
    `;
  }

  const options = data.map(item => {
    const option = document.createElement('option');
    if (select.classList.contains('tour__select')) {
      option.className = 'tour__option';
    } else {
      option.className = 'tour__option reservation__option';
    }
    option.value = item.date;
    option.textContent = item.date;

    return option;
  });

  select.append(...options);
};

const renderOptionsPeople = (data, selectDate, selectPeople) => {
  selectPeople.innerHTML = `
    <option value="" class="tour__option">Количество человек</option>
  `;

  if (selectDate.value === '') return;

  const dateValue = getValue(selectDate);

  const {
    'min-people': minPeople,
    'max-people': maxPeople,
  } = findObject(data, dateValue);

  for (let i = minPeople; i <= maxPeople; i++) {
    const option = document.createElement('option');
    if (selectPeople.classList.contains('tour__select')) {
      option.className = 'tour__option';
    } else {
      option.className = 'tour__option reservation__option';
    }
    option.value = i;
    option.textContent = i;

    selectPeople.append(option);
  }
};

const renderSelects = () => {
  selectDates.forEach(selectDate => {
    renderOptionsDate(data, selectDate);
    selectPeoples.forEach(selectPeople => {
      renderOptionsPeople(data, selectDate, selectPeople);
    });
  });
};

const renderPeoples = () => {
  selectDates.forEach(select => {
    select.addEventListener('change', () => {
      const selectPeople =
        document.querySelector(`.${select.classList[0]}[name="people"]`);
      renderOptionsPeople(data, select, selectPeople);
    });
  });
};

const changeReservationInfo = () => {
  const reservationDate = reservationForm.querySelector('#reservation__date');
  const reservationPeople =
    reservationForm.querySelector('#reservation__people');

  reservationData.textContent = '';
  reservationPrice.textContent = '';
  const date = getValue(reservationDate);
  const people = +getValue(reservationPeople);
  const dateText = dateConversion(date);

  if (date === '' || people === 0) return;

  const {price} = findObject(data, date);
  reservationData.textContent = `
    ${dateText}, ${people}
    ${declension(['человек', 'человека', 'человек'], people)}`;
  reservationPrice.textContent = `${(people * price).toLocaleString()}₽`;
};

const reservationInfo = () => {
  reservationForm.addEventListener('change', () => {
    changeReservationInfo();
  });
};

const chandgeSelectDate = () => {
  selectDates.forEach(select => {
    select.addEventListener('change', ({target}) => {
      if (target.classList.contains('tour__select')) {
        const reservationDate =
          reservationForm.querySelector('.reservation__select');
        const reservationPeople =
          reservationForm.querySelector('#reservation__people');
        reservationDate.selectedIndex = target.selectedIndex;
        renderOptionsPeople(data, reservationDate, reservationPeople);
      } else {
        const tourDate = tourForm.querySelector('.tour__select');
        const tourPeople = tourForm.querySelector('#tour__people');
        tourDate.selectedIndex = target.selectedIndex;
        renderOptionsPeople(data, tourDate, tourPeople);
      }
    });
  });
};

const chandgeSelectPeople = () => {
  selectPeoples.forEach(select => {
    select.addEventListener('change', ({target}) => {
      if (target.classList.contains('tour__select')) {
        const reservationPeople =
          reservationForm.querySelector('#reservation__people');
        reservationPeople.selectedIndex = target.selectedIndex;
        changeReservationInfo();
      } else {
        const tourPeople = tourForm.querySelector('#tour__people');
        tourPeople.selectedIndex = target.selectedIndex;
      }
    });
  });
};

renderSelects();
renderPeoples();

reservationInfo();
chandgeSelectDate();
chandgeSelectPeople();

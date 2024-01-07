import { timer } from "./timer.js";
import './burger.js';
import './accordion.js';
import './fly.js';

timer();

const getData = async () => {
  const response = await fetch('date.json');
  const data = await response.json();
  
  return data;
};

const tourDate = document.querySelector('#tour__date');
const tourPeople = document.querySelector('#tour__people');
const reservationDate = document.querySelector('#reservation__date');
const reservationPeople = document.querySelector('#reservation__people');
const reservationForm = document.querySelector('.reservation__form');
const reservationData = reservationForm.querySelector('.reservation__data');
const reservationPrice = reservationForm.querySelector('.reservation__price');
reservationData.textContent = '';
reservationPrice.textContent = '';

const renderOptionsDate = async (text, select, classes) => {
  const data = await getData();

  select.innerHTML = `
    <option value="" class="tour__option">${text}</option>
  `;

  const options = data.map(item => {
    const option = document.createElement('option');
    option.className = classes;
    option.value = item.date;
    option.textContent = item.date;

    return option;
  });

  select.append(...options);
};

const getValue = (select) => {
  const selectedValue = select.options[select.selectedIndex].value;
  return selectedValue;
};

const renderOptionsPeople = (select, min, max) => {
  select.innerHTML = `
    <option value="" class="tour__option">Количество человек</option>
  `;
  for (let i = min; i <= max; i++) {
    const option = document.createElement('option');
    option.className = 'tour__option';
    option.value = i;
    option.textContent = i;

    select.append(option);
  }
};

const findObject = (arr, value) => {
  return arr.find(obj => obj.date === value);
};

const renderPeoples = async (selectDate, selectPeople) => {
  const data = await getData();

  selectPeople.innerHTML = `
    <option value="" class="tour__option">Количество человек</option>
  `;

  selectDate.addEventListener('change', () => {
    const dateValue = getValue(selectDate);
    
    const {
      'min-people': minPeople,
      'max-people': maxPeople
    } = findObject(data, dateValue);

    renderOptionsPeople(selectPeople, minPeople, maxPeople);
  });
};

renderOptionsDate('Выбери дату', tourDate, 'tour__option');
renderOptionsDate('Дата путешествия', reservationDate, 'tour__option reservation__option');

renderPeoples(tourDate, tourPeople);
renderPeoples(reservationDate, reservationPeople);

const changeReservationForm = async () => {
  const data = await getData();

  reservationForm.addEventListener('change', () => {
    const date = getValue(reservationDate);
    const people = +getValue(reservationPeople);
  
    if (date === '' || people === 0) return;
    
    const {price} = findObject(data, date);
    reservationData.textContent = `${date}, ${people} человека`;
    reservationPrice.textContent = `${(people * price).toLocaleString()}₽`
  });
}

changeReservationForm();
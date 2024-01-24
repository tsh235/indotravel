const tourForm = document.querySelector('.tour__form');
const tourDate = tourForm.querySelector('.tour__select');
const tourPeople = tourForm.querySelector('#tour__people');
const selectDates = document.querySelectorAll('[name="dates"]');
const selectPeoples = document.querySelectorAll('[name="people"]');
const reservationForm = document.querySelector('.reservation__form');
const reservationData = reservationForm.querySelector('.reservation__data');
const reservationPrice = reservationForm.querySelector('.reservation__price');
const reservationDate = reservationForm.querySelector('#reservation__date');
const reservationFormName = reservationForm.querySelector('#reservation__name');
const reservationFormPhone = reservationForm.querySelector('#reservation__phone');
const reservationFormBtn = reservationForm.querySelector('.reservation__button');
const reservationPeople = reservationForm.querySelector('#reservation__people');
const footerForm = document.querySelector('.footer__form');

export default {
  tourForm,
  tourDate,
  tourPeople,
  selectDates,
  selectPeoples,
  reservationForm,
  reservationData,
  reservationPrice,
  reservationDate,
  reservationFormName,
  reservationFormPhone,
  reservationFormBtn,
  reservationPeople,
  footerForm,
}
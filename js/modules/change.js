import elems from "./elems.js";
import { dateConversion, declension, findObject, getValue } from "./helpers.js";
import { renderOptionsPeople } from "./render.js";

const {
  tourDate,
  tourPeople,
  selectDates,
  selectPeoples,
  reservationData,
  reservationPrice,
  reservationDate,
  reservationPeople,
} = elems;

export const changeReservationInfo = (data) => {
  reservationData.textContent = '';
  reservationPrice.textContent = '';
  const date = getValue(reservationDate);
  const people = +getValue(reservationPeople);
  const dateText = dateConversion(date);

  if (date === '' || people === 0) return;

  const {price} = findObject(data, date);
  reservationData.textContent = `
    ${dateText}, ${people}
    ${declension(['человек', 'человека', 'человек'], people)}
  `;
  reservationPrice.textContent = `${(people * price).toLocaleString()}₽`;
};

export const chandgeSelectDate = (data) => {
  selectDates.forEach(select => {
    select.addEventListener('change', ({target}) => {
      if (target.classList.contains('tour__select')) {
        reservationDate.selectedIndex = target.selectedIndex;
        renderOptionsPeople(data, reservationDate, reservationPeople);
      } else {
        tourDate.selectedIndex = target.selectedIndex;
        renderOptionsPeople(data, tourDate, tourPeople);
      }
    });
  });
};

export const chandgeSelectPeople = (data) => {
  selectPeoples.forEach(select => {
    select.addEventListener('change', ({target}) => {
      if (target.classList.contains('tour__select')) {
        reservationPeople.selectedIndex = target.selectedIndex;
        changeReservationInfo(data);
      } else {
        tourPeople.selectedIndex = target.selectedIndex;
      }
    });
  });
};
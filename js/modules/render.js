import { changeReservationInfo } from "./change.js";
import elems from "./elems.js";
import { findObject, getValue, isNotEmpty } from "./helpers.js";

const {
  selectDates,
  selectPeoples,
} = elems;

export const renderOptionsDate = (data, select) => {
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

export const renderOptionsPeople = (data, selectDate, selectPeople) => {
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

export const renderSelects = (data) => {
  selectDates.forEach(selectDate => {
    renderOptionsDate(data, selectDate);
    selectPeoples.forEach(selectPeople => {
      renderOptionsPeople(data, selectDate, selectPeople);
    });
  });
};

export const renderPeoples = (data) => {
  selectDates.forEach(select => {
    select.addEventListener('change', () => {
      const selectPeople = document.querySelector(`.${select.classList[0]}[name="people"]`);
      renderOptionsPeople(data, select, selectPeople);
    });
  });
};

export const renderReservationInfo = (data) => {
  reservationForm.addEventListener('change', () => {
    if (isNotEmpty() === true) {
      changeReservationInfo(data);
    }
  });
};
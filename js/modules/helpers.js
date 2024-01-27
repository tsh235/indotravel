import elems from "./elems.js";

const {
  reservationForm,
} = elems;

export const declension = (words, value) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(value % 100 > 4 && value % 100 < 20) ?
    2 : cases[(value % 10 < 5) ? value % 10 : 5]];
};

export const dateConversion = (date) => {
  let dateStart = date.split(' - ')[0].split('.');
  let dateEnd = date.split(' - ')[1].split('.');
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  dateStart = `${+dateStart[0]} ${months[+dateStart[1] - 1]}`;
  dateEnd = `${+dateEnd[0]} ${months[+dateEnd[1] - 1]}`;

  return `${dateStart} - ${dateEnd}`;
};

export const findObject = (arr, value) => arr.find(obj => obj.date === value);

export const getValue = (select) => {
  const selectedValue = select.options[select.selectedIndex].value;
  return selectedValue;
};

export const isNotEmpty = () => {
  const fields = reservationForm.elements;
  let isNotEmpty = true;
  
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].type === 'select-one') {
      if (fields[i].value.trim() === '') {
        isNotEmpty = false;
        break;
      }
    }
  }
  
  return isNotEmpty;
}
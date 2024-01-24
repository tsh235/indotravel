import './modules/timer.js';
import './modules/burger.js';
import './modules/accordion.js';
import './modules/fly.js';
import './modules/album.js';
import {dateConversion, declension} from './modules/helpers.js';
import showModal from './modules/modal.js';

const getData = async () => {
  const response = await fetch('date.json');
  const data = await response.json();
  return data;
};

const data = await getData();

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
      const selectPeople = document.querySelector(`.${select.classList[0]}[name="people"]`);
      renderOptionsPeople(data, select, selectPeople);
    });
  });
};

const changeReservationInfo = () => {
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

const isNotEmpty = () => {
  const form = reservationForm;
  const fields = form.elements;
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

const reservationInfo = () => {
  reservationForm.addEventListener('change', () => {
    if (isNotEmpty() === true) {
      changeReservationInfo();
    }
  });
};

const chandgeSelectDate = () => {
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

const chandgeSelectPeople = () => {
  selectPeoples.forEach(select => {
    select.addEventListener('change', ({target}) => {
      if (target.classList.contains('tour__select')) {
        reservationPeople.selectedIndex = target.selectedIndex;
        changeReservationInfo();
      } else {
        tourPeople.selectedIndex = target.selectedIndex;
      }
    });
  });
};

renderSelects();
renderPeoples();

chandgeSelectDate();
chandgeSelectPeople();
reservationInfo();

const fetchRequest = async (url, {
  method = 'GET',
  cb,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      if (cb) return cb(null, data);
      return;
    }

    throw new Error(
        `Произошла ошибка ${response.status}: ${response.statusText}`,
    );
  } catch (error) {
    return cb(error, data);
  }
};

const validName = () => {
  const mask = /[^А-ЯЁ\s]/i;
  reservationFormName.addEventListener('input', () => {
    reservationFormName.value =
    reservationFormName.value.replace(mask, '');
  });

  const nameValue = reservationFormName.value.split(' ');
  if (nameValue.length < 3) {
    return false;
  } else {
    return true;
  }
};

validName();

const phoneMask = new Inputmask('+7 (999) 999-99-99');
phoneMask.mask(reservationFormPhone);

// Валидация формы
const justValidate = new JustValidate(reservationForm);

justValidate
  .addField('#reservation__date', [
    {
      rule: 'required',
      errorMessage: 'Выберите дату путешествия',
    },
  ])
  .addField('#reservation__people', [
    {
      rule: 'required',
      errorMessage: 'Выберите количество человек',
    },
  ])
  .addField('#reservation__name', [
    {
      rule: 'required',
      errorMessage: 'Введите ваше имя, состоящее из трех или более слов',
    },
  ])
  .addField('#reservation__phone', [
    {
      rule: 'required',
      errorMessage: 'Введите ваш телефон',
    },
    {
      validator() {
        const phone = reservationFormPhone.inputmask.unmaskedvalue();
        return !!(Number(phone) && phone.length === 10);
      },
      errorMessage: 'Некорректный номер телефона',
    },
  ]);

reservationFormBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(reservationForm));
  const price = reservationForm.querySelector('.reservation__price').textContent;

  const checkConfirm = await showModal(formData, price);

  if (checkConfirm === true) {
    fetchRequest('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: {
        title: 'Бронирование тура',
        body: formData,
      },
      cb(error) {
        console.log('error: ', error);
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const formElems = reservationForm.querySelectorAll('input, select, button');

    for (let i = 0; i < formElems.length; i++) {
      formElems[i].disabled = true;
    }
  }
});

footerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(e.target));

  fetchRequest('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: {
      title: 'Форма в footer',
      body: formData,
    },
    cb(error) {
      if (error) {
        const p = document.createElement('h2');
        p.style.color = 'red';
        p.textContent = error;
        reservationForm.insertAdjacentText('beforeend', p);
      }
      const footerFormTitle = footerForm.querySelector('.footer__form-title');
      footerFormTitle.textContent = 'Ваша заявка успешно отправлена';
      const footerFormText = footerForm.querySelector('.footer__text');
      footerFormText.textContent =
        'Наши менеджеры свяжутся с вами в течение 3-х рабочих дней';
      const footerInputWrap = footerForm.querySelector('.footer__input-wrap');
      footerInputWrap.textContent = '';
    },
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
});

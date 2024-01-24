import './modules/timer.js';
import './modules/burger.js';
import './modules/accordion.js';
import './modules/fly.js';
import './modules/album.js';
import showModal from './modules/modal.js';

import {renderPeoples, renderReservationInfo, renderSelects} from './modules/render.js';
import {chandgeSelectDate, chandgeSelectPeople} from './modules/change.js';
import elems from './modules/elems.js';
const {
  reservationForm,
  reservationData,
  reservationPrice,
  reservationFormName,
  reservationFormPhone,
  reservationFormBtn,
  footerForm,
} = elems;

reservationData.textContent = '';
reservationPrice.textContent = '';

const getData = async () => {
  const response = await fetch('date.json');
  const data = await response.json();
  return data;
};

const data = await getData();

renderSelects(data);
renderPeoples(data);
chandgeSelectDate(data);
chandgeSelectPeople(data);
renderReservationInfo(data);

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

import './timer.js';
import './burger.js';
import './accordion.js';
import './fly.js';
import {dateConversion, declension} from './helper.js';

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

const modalRequest = (err) => {
  console.log('err: ', err);
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    z-index: 99999;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
  `;

  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    margin: auto;
    max-width: 980px;
    padding: 77px 20px 85px;
    width: 100%;
    border-radius: 30px;
    border: 1px solid #AFAFAF;
    background-color: #FFF;
    color: #303030;
    text-align: center;
  `;

  const modalTitle = document.createElement('h2');
  modalTitle.style.cssText = `
    max-width: 580px;
    margin: 0 auto 40px;
    font-family: Merriweather;
    font-size: 34px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.02em;
  `;

  const modalText = document.createElement('p');
  modalText.style.cssText = `
    margin-bottom: 64px;
    font-family: Nunito;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
  `;

  const modalImg = document.createElement('div');
  modalImg.style.cssText = `
    margin: 0 auto;
    width: 100px;
    height: 100px;
  `;

  modalImg.innerHTML = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#78EC6E"/>
      <g clip-path="url(#clip0_0_1325)">
        <path d="M42.2618 60.8332L31.4285 49.9999L27.8174 53.611L42.2618 68.0554L73.2142 37.1031L69.6031 33.4919L42.2618 60.8332Z" fill="white"/>
      </g>
      <defs>
        <clipPath id="clip0_0_1325">
          <rect width="61.9048" height="61.9048" fill="white" transform="translate(19.0476 19.0476)"/>
        </clipPath>
      </defs>
    </svg>
  `;

  const modalBtn = document.createElement('button');
  modalBtn.type = 'button';
  modalBtn.style.cssText = `
    margin: 0 auto;
    width: 360px;
    height: 76px;
    border-radius: 12px;
    background-color: #FCB500;
    color: #fff;
    font-family: Nunito;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
  `;
  modalBtn.textContent = 'Забронировать';

  if (err === null) {
    modalTitle.textContent = 'Ваша заявка успешно отправлена';
    modalText.textContent =
      'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней';
    modalContent.append(modalTitle, modalText, modalImg);
  } else {
    modalTitle.textContent = 'Упс... Что-то пошло не так';
    modalText.textContent =
      'Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз';
    modalContent.append(modalTitle, modalText, modalBtn);
  }

  modal.append(modalContent);
  document.body.append(modal);

  if (err === null) {
    setTimeout(() => {
      modal.remove();
      reservationData.textContent = '';
      reservationPrice.textContent = '';
      reservationForm.reset();
    }, 1500);
  } else {
    modalBtn.addEventListener('click', () => {
      modal.remove();
    });
  }
};

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
      if (cb) cb(null, data);
      return;
    }

    throw new Error(
        `Произошла ошибка ${response.status}: ${response.statusText}`,
    );
  } catch (error) {
    cb(error, data);
  }
};

reservationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(e.target));

  fetchRequest('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: {
      title: 'Бронирование тура',
      body: formData,
    },
    cb(error) {
      if (error) {
        console.log('error: ', error);
        modalRequest(error);
      } else {
        modalRequest(null);
      }
    },
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
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

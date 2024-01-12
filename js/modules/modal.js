import loadStyle from './loadStyle.js';

const showModal = async (err, data) => {
  await loadStyle('/css/modal.css');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'overlay_confirm');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal__title');
  modalTitle.textContent = 'Подтверждение заявки';

  const modalTextPeople = document.createElement('p');
  modalTextPeople.classList.add('modal__text');
  modalTextPeople.textContent = `
    Бронирование путешествия в Индию на ${data.people} человек`;

  const modalTextDate = document.createElement('p');
  modalTextDate.classList.add('modal__text');
  modalTextDate.textContent = `В даты: ${data.date} - ${data.date}`;

  const modalTextPrice = document.createElement('p');
  modalTextPrice.classList.add('modal__text');
  modalTextPrice.textContent = `
    Стоимость тура ${(data.price * data.people).toLocaleString()}₽`;

  const modalBtsn = document.createElement('div');
  modalBtsn.classList.add('modal__button');

  const modalBtnConfirm = document.createElement('button');
  modalBtnConfirm.classList.add('modal__btn', 'modal__btn_confirm');
  modalBtnConfirm.textContent = 'Подтверждаю';

  const modalBtnEdit = document.createElement('button');
  modalBtnEdit.classList.add('modal__btn', 'modal__btn_edit');
  modalBtnEdit.textContent = 'Изменить данные';

  modalBtsn.append(modalBtnConfirm, modalBtnEdit);
  modal.append(
      modalTitle,
      modalTextPeople,
      modalTextDate,
      modalTextPrice,
      modalBtsn,
  );

  overlay.append(modal);

  modalBtnEdit.addEventListener('click', () => {
    overlay.remove();
  });

  document.body.append(overlay);
};

export default showModal;

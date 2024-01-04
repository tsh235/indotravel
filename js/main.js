import { timer } from "./timer.js";

timer();

const items = document.querySelectorAll('.travel__item');
const buttons = document.querySelectorAll('.travel__item-title');
const textWrappers = document.querySelectorAll('.travel__item-text-wrapper');

let heightWrapper = 0;

textWrappers.forEach(elem => {
  if (heightWrapper < elem.scrollHeight) {
    heightWrapper = elem.scrollHeight;
  }
});

buttons.forEach((btn, index) => {

  btn.addEventListener('click', () => {

    for (let i = 0; i < items.length; i++) {
      if (index === i) {
        textWrappers[i].style.height =
          items[i].classList.contains('travel__item_active') ?
          '' : `${heightWrapper}px`;
          items[i].classList.toggle('travel__item_active');
      } else {
        textWrappers[i].style.height = '';
        items[i].classList.remove('travel__item_active');
      }
    }

  });

});

// burger
const burger = document.querySelector('.header__menu-button');
const menu = document.querySelector('.header__menu');

burger.addEventListener('click', () => {
  menu.classList.toggle('header__menu_active');

  menu.addEventListener('click', ({target}) => {
    if (target.closest('.header__link')) {
      menu.classList.remove('header__menu_active');
    }
  });
});

document.addEventListener('click', ({target}) => {
  const its_menu = target === menu || menu.contains(target);
  const its_btnMenu = target === burger;
  const menu_is_active = menu.classList.contains('header__menu_active');

  if (!its_menu && !its_btnMenu && menu_is_active) {
    menu.classList.remove('header__menu_active');
  }
});

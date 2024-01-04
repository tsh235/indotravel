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
});

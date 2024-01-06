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
  const itsMenu = target === menu || menu.contains(target);
  const itsBtnMenu = target === burger;
  const menuIsActive = menu.classList.contains('header__menu_active');

  if (!itsMenu && !itsBtnMenu && menuIsActive) {
    menu.classList.remove('header__menu_active');
  }
});

const burger = document.querySelector('.header__menu-button');
const menu = document.querySelector('.header__menu');

const duration = 1000;
const distance = 80;
let requestID = NaN;

const menuShow = (duration, callback) => {
  let startAnimation = NaN;

  requestID = requestAnimationFrame(function step(timestamp) {
    startAnimation ||= timestamp;

    const progress = (timestamp - startAnimation) / duration;

    callback(progress);

    if (progress < 1) {
      requestID = requestAnimationFrame(step);
    }
  });
};

const easyInOut = time => 0.5 * (1 - Math.cos(Math.PI * time));

burger.addEventListener('click', () => {
  menu.classList.toggle('header__menu_active');

  menuShow(duration, (progress) => {
    const right = easyInOut(progress) * distance;
    menu.style.right = `${right}px`;
  });

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

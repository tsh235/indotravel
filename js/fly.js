const docEl = document.documentElement;
const fly = document.createElement('div');

fly.style.cssText = `
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 0;
  right: 0;
  background: url('../../img/airplane.svg') center/contain no-repeat;
  pointer-events: none;
  z-index: 100;
`;

document.body.append(fly);

const calcPositionFly = () => {
  const maxTop = docEl.clientHeight - fly.clientHeight;
  const maxScroll = docEl.scrollHeight - docEl.clientHeight;
  const percentScroll = (window.pageYOffset * 100) / maxScroll;

  const bottom = maxTop * (percentScroll / 100);
  fly.style.transform = `translateY(${-bottom}px)`;
};

window.addEventListener('scroll', () => {
  requestAnimationFrame(calcPositionFly);
});

calcPositionFly();

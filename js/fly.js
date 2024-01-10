const fly = () => {
  const docEl = document.documentElement;
  const airplane = document.createElement('div');

  airplane.style.cssText = `
    position: fixed;
    width: 50px;
    height: 50px;
    bottom: 0;
    right: 0;
    background: url('../../img/airplane.svg') center/contain no-repeat;
    pointer-events: none;
    z-index: 100;
  `;

  document.body.append(airplane);

  const calcPositionFlyUp = () => {
    const maxTop = docEl.clientHeight - airplane.clientHeight;
    const maxScroll = docEl.scrollHeight - docEl.clientHeight;
    const percentScroll = (window.pageYOffset * 100) / maxScroll;
    const bottom = maxTop * (percentScroll / 100);
    
    if (bottom === maxTop) {
      airplane.style.transform = `rotate(180deg) translateY(${bottom}px)`;
    } else {
      airplane.style.transform = `translateY(${-bottom}px)`;
    }
  };

  const calcPositionFlyDown = () => {
    const maxTop = docEl.clientHeight - airplane.clientHeight;
    const maxScroll = docEl.scrollHeight - docEl.clientHeight;
    const percentScroll = (window.pageYOffset * 100) / maxScroll;
    const bottom = maxTop * (percentScroll / 100);
    
    if (bottom === 0) {
      airplane.style.transform = `translateY(${-bottom}px)`;
    } else {
      airplane.style.transform = `rotate(180deg) translateY(${bottom}px)`;
    }
  };

  let scrollPos = 0;
  window.addEventListener('scroll', function() {
    const st = window.scrollY;
    if (st > scrollPos) {
      requestAnimationFrame(calcPositionFlyUp);
    } else {
      requestAnimationFrame(calcPositionFlyDown);
    };
    scrollPos = st;
  });
};

if (window.innerWidth > 758) {
  fly();
}
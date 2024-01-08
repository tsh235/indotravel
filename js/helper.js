export const declension = (words, value) => {
  const cases = [ 2, 0, 1, 1, 1, 2 ];
  return words[(value % 100 > 4 && value % 100 < 20) ? 2 : cases[(value % 10 < 5) ? value % 10 : 5]];
};

export const dateConversion = (date) => {
  let dateStart = date.split(' - ')[0].split('.');
  let dateEnd = date.split(' - ')[1].split('.');
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ];
  
  dateStart = `${+dateStart[0]} ${months[+dateStart[1] - 1]}`;
  dateEnd = `${+dateEnd[0]} ${months[+dateEnd[1] - 1]}`;
  
  return `${dateStart} - ${dateEnd}`;
}
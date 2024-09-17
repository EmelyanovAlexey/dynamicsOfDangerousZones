// получить имя в формате Фамилия И.О.
export function getFioInitiatives(name) {
  if (name === '' || name === null || name === undefined) return '';
  let fio = '';
  const fioSplit = name.split(' ');

  fio = `${fioSplit[0]} ${fioSplit[1][0]}.`;
  if (fioSplit.length > 1) {
    fio += ` ${fioSplit[2][0]}.`;
  }

  return fio;
}

export default {};

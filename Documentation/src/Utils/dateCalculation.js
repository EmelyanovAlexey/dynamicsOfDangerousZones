export default function dateCalculation() {
  // получение текста даты
  function getTextDate(date) {
    return `${date.substr(8, 2)}.${date.substr(5, 2)}.${date.substr(0, 4)}`;
  }

  // получение текста даты и врмени
  function getTextDateTime(date) {
    return `${date.substr(8, 2)}.${date.substr(5, 2)}.${date.substr(
      0,
      4,
    )}, ${date.substr(11, 2)}:${date.substr(14, 2)}`;
  }

  // получение объекта статуса времени
  function getCountDate(start, finish, dateCurrent, percentTime) {
    const timeCard = {
      timePassed: null,
      timeTotal: null,
      timeStatus: null,
      timeCurDifference: null,
      text: 'осталось',
    };
    const startDate = new Date(start.substr(0, 19));
    const finishDate = new Date(finish.substr(0, 19));
    const curDate =
      dateCurrent === null ? new Date() : new Date(dateCurrent.substr(0, 19));

    timeCard.timePassed = Math.ceil(
      Math.abs(startDate.getTime() - curDate.getTime()) / (1000 * 3600 * 24),
    );
    timeCard.timeTotal = Math.ceil(
      Math.abs(startDate.getTime() - finishDate.getTime()) / (1000 * 3600 * 24),
    );
    timeCard.timeCurDifference = Math.ceil(
      Math.abs(curDate.getTime() - finishDate.getTime()) / (1000 * 3600 * 24),
    );

    if (curDate > finishDate) {
      timeCard.text = 'просрочено';
    }

    const percent = (timeCard.timePassed * 100) / timeCard.timeTotal;
    if (percent < Number(percentTime)) {
      timeCard.timeStatus = 'good';
    } else if (percent >= Number(percentTime) && percent < 100) {
      timeCard.timeStatus = 'dangerous';
    } else {
      timeCard.timeStatus = 'bad';
    }
    return timeCard;
  }

  return {
    getTextDate,
    getTextDateTime,
    getCountDate,
  };
}

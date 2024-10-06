export function getStat(data) {
  return data.map((dataItem) => {
    const arr = [];
    arr.push(dataItem.page_name);
    arr.push(dataItem.count);
    arr.push(`${dataItem.countSec} сек.`);
    arr.push(dataItem.date_at.slice(0, 16).replace('T', ' '));
    return arr;
  });
}

export default {};

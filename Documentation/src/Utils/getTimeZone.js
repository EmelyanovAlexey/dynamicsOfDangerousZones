export default function getTimeZone() {
  const offset = new Date().getTimezoneOffset() / 60;
  const absOffset = Math.abs(offset);
  const result = `${offset < 0 ? '+' : '-'}${
    String(absOffset).length === 2 ? absOffset : `0${absOffset}`
  }:00`;
  return result;
}

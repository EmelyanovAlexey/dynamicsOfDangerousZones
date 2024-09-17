export default function mainFunction() {
  // проверка на пустоту
  function isValue(value) {
    if (value === '' || value === undefined || value === null) {
      return 0;
    }
    return 1;
  }

  function cropName(text, length) {
    const cropText = text.slice(0, length);
    if (text.length > 60) {
      return `${cropText} ...`;
    }
    return cropText;
  }

  return {
    isValue,
    cropName,
  };
}

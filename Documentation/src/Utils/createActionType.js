/**
 * Формирует тип действия вида ДЕЙСТВИЕ/модуль/пакет
 * @param {String} moduleName Имя модуля
 * @param {String} actionName Имя действия
 */
export default function createActionType(moduleName, actionName) {
  if (moduleName == null) throw new Error('Не указано имя модуля');
  if (actionName == null) throw new Error('Не указано действие');
  const appName = process.env.REACT_APP_NAME;
  return `${actionName.toUpperCase()}/${moduleName}/${appName}`;
}

/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import joinClassNames from '../../Utils/joinClassNames';
import MarkerCheckbox from './MarkerCheckbox';
import MarkerRadio from './MarkerRadio';

import './Switcher.css';

function selectMarker(type) {
  const markerView = {
    checkbox: (checked) => <MarkerCheckbox checked={checked} />,
    radio: (checked) => <MarkerRadio checked={checked} />,
  };
  return markerView[type];
}

/**
 * Универсальный компонент переключатель.
 *
 * Для изменения поведения переключателя используется
 * атрибут `type`, который принимает один из аргументов:
 *
 * - `checkbox` — каждый из связных компонентов выбирается независимо
 * - `radio` — выбирается только один компонент из связных элементов
 *
 * Для связки элементов друг с другом нужно указать
 * одинаковое значение атрибута `name`.
 *
 * По умолчанию для типа `checkbox` маркер выводится ввиде прямоугольника
 * с галкой внутри; для `radio` ввиде круга с точкой внутри. Чтобы изменить
 * вид маркера нужно передать соответствующий компонент в аргументе
 * `MarkerComponent`.
 *
 * `MarkerComponent` обязательно должен реализовывать атрибут `checked`
 */
function Switcher({
  name,
  type,
  checked,
  caption,
  value,
  className,
  markerRenderFn,
  onChange,
}) {
  const renderMarker = markerRenderFn || selectMarker(type);
  return (
    <label className={joinClassNames(['switcher', className])}>
      <input
        type={type}
        name={name}
        className="switcher__input a11y_hidden"
        checked={checked}
        value={value}
        onChange={onChange}
      />
      {renderMarker(checked)}
      {caption && <span className="switcher__label">{caption}</span>}
    </label>
  );
}

Switcher.propTypes = {
  /**
   * Имя данных
   */
  name: PropTypes.string,

  /**
   * Тип переключателя
   */
  type: PropTypes.oneOf(['checkbox', 'radio']),

  /**
   * Флаг состояния
   */
  checked: PropTypes.bool,

  /**
   * Подпись
   */
  caption: PropTypes.string,

  /**
   * Значение
   */
  value: PropTypes.string,
  /**
   * Список классов
   */
  className: PropTypes.string,

  /**
   * Собственный компонент маркера
   */
  markerRenderFn: PropTypes.func,

  /**
   * Событие вызываемое при изменении состояния
   */
  onChange: PropTypes.func,
};

Switcher.defaultProps = {
  name: undefined,
  type: 'checkbox',
  checked: false,
  caption: '',
  value: '',
  className: '',
  markerRenderFn: undefined,
  onChange: undefined,
};

export default Switcher;

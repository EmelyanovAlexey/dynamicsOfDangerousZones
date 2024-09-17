/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './TextArea.css';

/**
 * Поле ввода textArea
 *
 * @param {String} type тип для изменения json
 * @param {String} textInput стартовый текст
 * @param {String} placeholder placeholder поля ввода
 * @param {Function} changeText функция для изменения текста
 * @param {Function} showChange смена активности отображения
 * поле ввода
 */
function TextArea({
  className,
  type,
  textInput,
  placeholder,
  changeText,
  onBlur,
  onKeyDown,
}) {
  const [text, setText] = useState(
    textInput === null ? '' : textInput.replaceAll('<br>', '\n'),
  );
  const textRef = React.createRef();

  // изменение времени
  function changeTextInput(textCur) {
    setText(textCur);
    changeText(type, textCur);
  }

  useEffect(() => {
    if (textInput !== text) {
      setText(textInput);
    }
  }, [textInput]);

  return (
    <div className="TextAreaForDetailModal">
      <textarea
        onBlur={onBlur}
        type="text"
        className={clsx(['TextAreaForDetailModal_input', className])}
        ref={textRef}
        value={text}
        placeholder={placeholder}
        onChange={() => {
          changeTextInput(textRef.current.value);
          const textSend = textRef.current.value.split('\n').join('<br>');
          changeText(type, textSend);
        }}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

TextArea.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  textInput: PropTypes.string,
  placeholder: PropTypes.string,
  changeText: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
};

TextArea.defaultProps = {
  className: '',
  type: '',
  textInput: '',
  placeholder: '',
  changeText: () => {},
  onBlur: undefined,
  onKeyDown: undefined,
};

export default TextArea;

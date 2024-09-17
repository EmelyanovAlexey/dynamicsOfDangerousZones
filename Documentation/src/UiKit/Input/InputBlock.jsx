import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';
import Glyph from '../Glyph';
import Button from '../Button';

import './InputBlock.css';

/**
 * Поле ввода
 *
 * @param {String} title название данного поля ввода
 * @param {String} type тип для того что бы знать куда сохранять значение
 * @param {String} textInput изначальный текст
 * @param {String} placeholder placeholder для input
 * @param {Function} changeText фун-я для изменения конечного
 * результата поля ввода
 */
function InputBlock({
  className,
  label,
  value,
  placeholder,
  isSearch,
  isLoading,
  isNumber,
  onChange,
  isResetFilter,
  onBlur,
}) {
  const [text, setText] = useState(value !== undefined ? value : '');

  function changeTextInput(textCur) {
    setText(textCur);
    onChange(textCur);
  }

  // получить текст placeholder
  function getPlaceholder() {
    if (text === '' && label) {
      return label;
    }
    if (text === '' && !label) {
      return placeholder;
    }
    return value;
  }

  useEffect(() => {
    if (isResetFilter) {
      changeTextInput('');
    }
  }, [isResetFilter]);

  return (
    <div className={clsx(['input_block', className])}>
      {label && <div className="input_block_label">{label}</div>}
      <div className="input_block_input">
        <input
          type={isNumber ? 'number' : 'text'}
          value={text && text}
          onBlur={onBlur}
          placeholder={getPlaceholder()}
          onChange={(event) => {
            changeTextInput(event.target.value);
          }}
        />
      </div>
      {isSearch && text.length === 0 && (
        <div className="input_block_search">
          <Glyph className="input_block_search_icon" name="Search" />
        </div>
      )}
      {text.length !== 0 && (
        <Button
          className={isLoading ? 'input_no_show' : 'input_block_delete'}
          onClick={() => {
            changeTextInput('');
          }}
        >
          <Glyph className="input_block_cross_icon" name="Cross" />
        </Button>
      )}
      {isLoading && <Spinner className="input_block_loading" />}
    </div>
  );
}

InputBlock.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isSearch: PropTypes.bool,
  isLoading: PropTypes.bool,
  isNumber: PropTypes.bool,
  onChange: PropTypes.func,
  isResetFilter: PropTypes.bool,
  onBlur: PropTypes.bool,
};

InputBlock.defaultProps = {
  className: '',
  label: '',
  value: '',
  placeholder: '',
  isSearch: false,
  isLoading: false,
  isNumber: false,
  onChange: () => {},
  isResetFilter: false,
  onBlur: () => {},
};

export default InputBlock;
// import React from 'react';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
//
// import Spinner from '../Spinner';
// import Glyph from '../Glyph';
// import Button from '../Button';
//
// import './InputBlock.css';
//
// /**
//  * Поле ввода
//  *
//  * @param {String} title название данного поля ввода
//  * @param {String} type тип для того что бы знать куда сохранять значение
//  * @param {String} textInput изначальный текст
//  * @param {String} placeholder placeholder для input
//  * @param {Function} changeText фун-я для изменения конечного
//  * результата поля ввода
//  */
// function InputBlock({
//   className,
//   label,
//   value,
//   placeholder,
//   isSearch,
//   isLoading,
//   isNumber,
//   onChange,
//   inputText,
// }) {
//   function changeTextInput(textCur) {
//     onChange(textCur);
//   }
//
//   // получить текст placeholder
//   function getPlaceholder() {
//     if (inputText === '' && label) {
//       return label;
//     }
//     if (inputText === '' && !label) {
//       return placeholder;
//     }
//     return value;
//   }
//
//   return (
//     <div className={clsx(['input_block', className])}>
//       {label && <div className="input_block_label">{label}</div>}
//       <div className="input_block_input">
//         <input
//           type={isNumber ? 'number' : 'text'}
//           value={inputText && inputText}
//           placeholder={getPlaceholder()}
//           onChange={(event) => {
//             changeTextInput(event.target.value);
//           }}
//         />
//       </div>
//       {isSearch && inputText.length === 0 && (
//         <div className="input_block_search">
//           <Glyph className="input_block_search_icon" name="Search" />
//         </div>
//       )}
//       {inputText.length !== 0 && (
//         <Button
//           className={isLoading ? 'input_no_show' : 'input_block_delete'}
//           onClick={() => {
//             changeTextInput('');
//           }}
//         >
//           <Glyph className="input_block_cross_icon" name="Cross" />
//         </Button>
//       )}
//       {isLoading && <Spinner className="input_block_loading" />}
//     </div>
//   );
// }
//
// InputBlock.propTypes = {
//   className: PropTypes.string,
//   label: PropTypes.string,
//   value: PropTypes.string,
//   placeholder: PropTypes.string,
//   isSearch: PropTypes.bool,
//   isLoading: PropTypes.bool,
//   isNumber: PropTypes.bool,
//   onChange: PropTypes.func,
//   inputText: PropTypes.string,
// };
//
// InputBlock.defaultProps = {
//   className: '',
//   label: '',
//   value: '',
//   placeholder: '',
//   isSearch: false,
//   isLoading: false,
//   isNumber: false,
//   onChange: () => {},
//   inputText: '',
// };
//
// export default InputBlock;

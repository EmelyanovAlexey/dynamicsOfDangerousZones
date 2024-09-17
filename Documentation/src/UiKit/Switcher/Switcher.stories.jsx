import React from 'react';
import PropTypes from 'prop-types';
import Switcher from '.';
import MarkerSwitcher from './MarkerSwitcher';

function CheckboxTemplate({
  name,
  type,
  caption,
  checked,
  value,
  className,
  MarkerComponent,
}) {
  return (
    <Switcher
      name={name}
      type={type}
      caption={caption}
      className={className}
      checked={checked}
      value={value}
      MarkerComponent={MarkerComponent}
    />
  );
}

CheckboxTemplate.propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(['checkbox', 'radio']),
  checked: PropTypes.bool,
  caption: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  MarkerComponent: PropTypes.func,
};

CheckboxTemplate.defaultProps = {
  name: undefined,
  type: 'checkbox',
  checked: false,
  caption: '',
  value: '',
  className: '',
  MarkerComponent: undefined,
};

export const CheckboxDefault = CheckboxTemplate.bind({});
CheckboxDefault.storyName = 'Чекбокс';

export const RadioButton = CheckboxTemplate.bind({});
RadioButton.args = {
  type: 'radio',
  checked: true,
};
RadioButton.storyName = 'Радиокнопка';

export const CustomComonent = CheckboxTemplate.bind({});
CustomComonent.args = {
  checked: true,
  MarkerComponent: MarkerSwitcher,
};
CustomComonent.storyName = 'Кастомный маркер';

export default {
  title: 'Атомарные/Переключатель',
  component: Switcher,
};

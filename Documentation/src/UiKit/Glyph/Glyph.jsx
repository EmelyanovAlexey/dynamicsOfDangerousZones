import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import { joinClassNames } from '../../Utils';

import './Glyph.css';

function Loading() {
  return <div className="glyph__loading" />;
}

/**
 * Символ обозначающий какое-либо слово
 *
 * Глиф находится в квадратной области.
 * Размер области по умолчанию `1rem`.
 * Для переопределения размера используется
 * кастомное css свойство `--glyph-size`
 */
function Glyph({ name, className }) {
  const Image = React.lazy(() => import(`./Glyphs/${name}.jsx`));
  return (
    <div className={joinClassNames(['glyph', className])}>
      <Suspense fallback={<Loading />}>
        <Image />
      </Suspense>
    </div>
  );
}

Glyph.propTypes = {
  /**
   * Имя глифа
   */
  name: PropTypes.oneOf([
    'Arrow',
    'ArrowItem',
    'BorderUser',
    'Bin',
    'Burger',
    'Chevron',
    'Checkmark',
    'Cross',
    'Download',
    'Edit',
    'Menu',
    'Filter',
    'Ok',
    'Warning',
    'Download',
    'Search',
    'Calendar',
    'Burger',
    'Minus',
    'Plus',
    'SortTable',
    'EditVariantTwo',
    'Pen',
    'Settings',
    'Clock',
    'File',
    'Question',
  ]).isRequired,

  /**
   * Имена классов для расширения
   */
  className: PropTypes.string,
};

Glyph.defaultProps = {
  className: '',
};

export default Glyph;

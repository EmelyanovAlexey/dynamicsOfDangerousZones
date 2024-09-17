import React from 'react';
import PropTypes from 'prop-types';
import Glyph from '.';

function GlyphTemplate({ name }) {
  return <Glyph name={name} />;
}

GlyphTemplate.propTypes = {
  name: PropTypes.string.isRequired,
};

export const Default = GlyphTemplate.bind({});
Default.args = {
  name: 'Chevron',
};
Default.storyName = 'Образец';

export default {
  title: 'Атомарные/Глиф',
  component: Glyph,
};

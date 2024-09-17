import PropTypes from 'prop-types';

export const personCardShape = PropTypes.shape({
  text: PropTypes.string,
  status: PropTypes.number,
});

export const employeeShape = PropTypes.shape({
  id: PropTypes.string,
  fullName: PropTypes.string,
  position: PropTypes.string,
  status: PropTypes.number,
});

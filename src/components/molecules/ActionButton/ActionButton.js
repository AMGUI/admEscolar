import React from 'react';
import PropTypes from 'prop-types';

/**
 * ActionButton Molecule Component
 * Button specifically styled for action items in lists
 */
const ActionButton = ({
  icon,
  label,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center px-4 py-3 text-left text-gray-700
        hover:bg-gray-50 rounded-lg transition-all
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      <i className={`fas ${icon} text-gray-500 mr-3`} />
      {label}
    </button>
  );
};

ActionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default ActionButton;


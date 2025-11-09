import React from 'react';
import PropTypes from 'prop-types';

/**
 * Label Atom Component
 * Reusable label component
 */
const Label = ({
  children,
  htmlFor,
  required = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'block text-sm font-medium text-gray-700 mb-2';
  const labelClasses = `${baseClasses} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <label htmlFor={htmlFor} className={labelClasses} {...props}>
      {children}
      {required && <span className="text-danger ml-1">*</span>}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Label;


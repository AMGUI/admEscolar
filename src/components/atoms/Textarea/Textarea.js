import React from 'react';
import PropTypes from 'prop-types';

/**
 * Textarea Atom Component
 * Reusable textarea component
 */
const Textarea = ({
  name,
  value,
  onChange,
  placeholder,
  rows = 3,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : '';
  const textareaClasses = `${baseClasses} ${disabledClass} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      required={required}
      className={textareaClasses}
      {...props}
    />
  );
};

Textarea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Textarea;


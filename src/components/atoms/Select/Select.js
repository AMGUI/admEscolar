import React from 'react';
import PropTypes from 'prop-types';

/**
 * Select Atom Component
 * Reusable select/dropdown component
 */
const Select = ({
  name,
  value,
  onChange,
  options = [],
  placeholder,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : '';
  const selectClasses = `${baseClasses} ${disabledClass} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={selectClasses}
      {...props}
    >
      {placeholder && (
        <option value="">{placeholder}</option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Select;


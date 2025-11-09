import React from 'react';
import PropTypes from 'prop-types';

/**
 * Icon Atom Component
 * Reusable icon component using Font Awesome
 */
const Icon = ({
  name,
  size = 'md',
  color = 'gray',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  const getColorClass = (color) => {
    const colorMap = {
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
      gray: 'text-gray-500',
      white: 'text-white',
      black: 'text-black',
    };
    return colorMap[color] || colorMap.gray;
  };

  const iconClasses = `
    fas ${name}
    ${sizeClasses[size] || sizeClasses.md}
    ${getColorClass(color)}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return <i className={iconClasses} {...props} />;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'gray', 'white', 'black']),
  className: PropTypes.string,
};

export default Icon;


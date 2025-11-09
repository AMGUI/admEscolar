import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button Atom Component
 * Reusable button component with multiple variants
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  onClick,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center';
  
  const getVariantClasses = (variant) => {
    const variantMap = {
      primary: 'bg-primary hover:bg-secondary text-white',
      secondary: 'bg-gray-700 hover:bg-gray-800 text-white',
      success: 'bg-success hover:bg-green-600 text-white',
      warning: 'bg-warning hover:bg-yellow-600 text-white',
      danger: 'bg-danger hover:bg-red-600 text-white',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
      ghost: 'text-gray-700 hover:bg-gray-100',
    };
    return variantMap[variant] || variantMap.primary;
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full flex-1' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const buttonClasses = `
    ${baseClasses}
    ${getVariantClasses(variant)}
    ${sizeClasses[size] || sizeClasses.md}
    ${widthClass}
    ${disabledClass}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const renderIcon = () => {
    if (!icon) return null;
    const iconElement = <i className={`fas ${icon} ${iconPosition === 'right' ? 'ml-2' : 'mr-2'}`} />;
    return iconElement;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};

export default Button;


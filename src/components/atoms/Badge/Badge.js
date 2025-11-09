import React from 'react';
import PropTypes from 'prop-types';

/**
 * Badge Atom Component
 * Reusable badge component for status indicators
 */
const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-full';
  
  const getVariantClasses = (variant) => {
    const variantMap = {
      primary: 'bg-blue-50 text-primary',
      secondary: 'bg-indigo-50 text-secondary',
      success: 'bg-green-50 text-success',
      warning: 'bg-yellow-50 text-warning',
      danger: 'bg-red-50 text-danger',
      gray: 'bg-gray-100 text-gray-700',
    };
    return variantMap[variant] || variantMap.primary;
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  const badgeClasses = `
    ${baseClasses}
    ${getVariantClasses(variant)}
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'gray']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Badge;


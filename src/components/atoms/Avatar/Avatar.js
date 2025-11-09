import React from 'react';
import PropTypes from 'prop-types';

/**
 * Avatar Atom Component
 * Reusable avatar component
 */
const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
    xl: 'w-12 h-12 text-lg',
  };

  const baseClasses = 'rounded-full flex items-center justify-center bg-gray-300 text-gray-700 font-medium';
  const avatarClasses = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${className}`.trim().replace(/\s+/g, ' ');

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name}
        className={avatarClasses}
        {...props}
      />
    );
  }

  return (
    <div className={avatarClasses} {...props}>
      {name ? getInitials(name) : '?'}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

export default Avatar;


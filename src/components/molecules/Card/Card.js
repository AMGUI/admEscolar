import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card Molecule Component
 * Reusable card container component
 */
const Card = ({
  children,
  title,
  icon,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  ...props
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 fade-in ${className}`.trim()} {...props}>
      {title && (
        <div className={`mb-6 flex items-center ${headerClassName}`.trim()}>
          {icon && <i className={`fas ${icon} mr-2 text-primary`} />}
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
      {footer && <div className="mt-6 pt-6 border-t border-gray-200">{footer}</div>}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footer: PropTypes.node,
};

export default Card;


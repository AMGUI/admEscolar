import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../atoms';

/**
 * StatCard Molecule Component
 * Displays statistics with icon and color coding
 */
const StatCard = ({
  title,
  value,
  icon,
  color = 'primary',
  className = '',
  ...props
}) => {
  const getColorClasses = (color) => {
    const configs = {
      primary: {
        border: 'border-l-4 border-primary',
        iconBg: 'bg-blue-50',
        iconColor: 'primary',
      },
      secondary: {
        border: 'border-l-4 border-secondary',
        iconBg: 'bg-indigo-50',
        iconColor: 'secondary',
      },
      success: {
        border: 'border-l-4 border-success',
        iconBg: 'bg-green-50',
        iconColor: 'success',
      },
      warning: {
        border: 'border-l-4 border-warning',
        iconBg: 'bg-yellow-50',
        iconColor: 'warning',
      },
      danger: {
        border: 'border-l-4 border-danger',
        iconBg: 'bg-red-50',
        iconColor: 'danger',
      },
    };
    return configs[color] || configs.primary;
  };

  const config = getColorClasses(color);

  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm p-6
        ${config.border}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      <div className="flex items-center">
        <div className={`p-3 ${config.iconBg} rounded-lg mr-4`}>
          <Icon name={icon} size="xl" color={config.iconColor} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger']),
  className: PropTypes.string,
};

export default StatCard;


import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Badge } from '../../atoms';

/**
 * BillItem Molecule Component
 * Displays a bill/invoice item in a list
 */
const BillItem = ({
  name,
  period,
  value,
  status,
  statusColor = 'warning',
  className = '',
  onClick,
  ...props
}) => {
  const statusColorMap = {
    Pendente: 'warning',
    Pago: 'success',
    Atrasado: 'danger',
  };

  const badgeColor = statusColorMap[status] || statusColor;

  const iconBgConfig = {
    warning: 'bg-yellow-50',
    success: 'bg-green-50',
    danger: 'bg-red-50',
    primary: 'bg-blue-50',
    secondary: 'bg-indigo-50',
  };

  const iconBg = iconBgConfig[badgeColor] || iconBgConfig.warning;

  return (
    <div
      className={`
        flex items-center justify-between p-4 bg-gray-50 rounded-lg
        ${onClick ? 'cursor-pointer hover:bg-gray-100' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center">
        <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center mr-3`}>
          <Icon name="fa-user" color={badgeColor} />
        </div>
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{period} - {value}</p>
        </div>
      </div>
      <Badge variant={badgeColor}>{status}</Badge>
    </div>
  );
};

BillItem.propTypes = {
  name: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  statusColor: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger']),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default BillItem;


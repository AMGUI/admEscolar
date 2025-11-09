import React from 'react';
import PropTypes from 'prop-types';

/**
 * MenuItem Molecule Component
 * Displays a menu item with checkbox, name, and price
 */
const MenuItem = ({
  id,
  nome,
  preco,
  checked,
  onChange,
  className = '',
  ...props
}) => {
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div
      className={`
        flex items-center justify-between p-4 border border-gray-200 rounded-lg
        hover:bg-gray-50 transition-colors cursor-pointer
        ${checked ? 'border-primary bg-blue-50' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      onClick={() => onChange(id)}
      {...props}
    >
      <label className="flex items-center cursor-pointer flex-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(id)}
          className="h-5 w-5 text-primary rounded focus:ring-primary focus:ring-2"
          onClick={(e) => e.stopPropagation()}
        />
        <span className="ml-3 font-medium text-gray-700 flex-1">{nome}</span>
      </label>
      <span className="text-gray-700 font-semibold ml-4">
        R$ {formatPrice(preco)}
      </span>
    </div>
  );
};

MenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  preco: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default MenuItem;


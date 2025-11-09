import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input, InputMasked, Select, Textarea, MASK_TYPES } from '../../atoms';

/**
 * FormField Molecule Component
 * Combines Label with Input, Select, or Textarea
 */
const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  options,
  rows,
  required = false,
  disabled = false,
  error,
  fieldType = 'input', // 'input', 'select', 'textarea'
  maskType, // 'cpf', 'cnpj', 'rg', 'phone', 'currency'
  className = '',
  ...props
}) => {
  const renderField = () => {
    const commonProps = {
      name,
      value,
      onChange,
      placeholder,
      disabled,
      required,
      className: error ? 'border-danger focus:ring-danger' : '',
    };

    switch (fieldType) {
      case 'select':
        return <Select options={options} {...commonProps} {...props} />;
      case 'textarea':
        return <Textarea rows={rows} {...commonProps} {...props} />;
      case 'input':
      default:
        // Use InputMasked if maskType is provided
        if (maskType) {
          return <InputMasked maskType={maskType} type={type} {...commonProps} {...props} />;
        }
        return <Input type={type} {...commonProps} {...props} />;
    }
  };

  return (
    <div className={className}>
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
      )}
      {renderField()}
      {error && (
        <p className="mt-1 text-sm text-danger">{error}</p>
      )}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  rows: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  fieldType: PropTypes.oneOf(['input', 'select', 'textarea']),
  maskType: PropTypes.oneOf([
    MASK_TYPES.CPF,
    MASK_TYPES.CNPJ,
    MASK_TYPES.RG,
    MASK_TYPES.PHONE,
    MASK_TYPES.CURRENCY,
  ]),
  className: PropTypes.string,
};

export default FormField;


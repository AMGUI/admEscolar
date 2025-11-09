import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import { applyMask, MASK_TYPES } from '../../../utils/masks';

/**
 * InputMasked Atom Component
 * Input component with mask support
 */
const InputMasked = ({
  maskType,
  value = '',
  onChange,
  onBlur,
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState('');

  // Update display value when value prop changes
  useEffect(() => {
    if (maskType && value) {
      setDisplayValue(applyMask(value, maskType));
    } else {
      setDisplayValue(value || '');
    }
  }, [value, maskType]);

  /**
   * Handles input change with mask
   */
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const maskedValue = maskType ? applyMask(inputValue, maskType) : inputValue;
    
    setDisplayValue(maskedValue);
    
    // Call original onChange with masked value
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: maskedValue,
        },
      };
      onChange(syntheticEvent);
    }
  };

  /**
   * Handles input blur
   */
  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <Input
      {...props}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

InputMasked.propTypes = {
  maskType: PropTypes.oneOf([
    MASK_TYPES.CPF,
    MASK_TYPES.CNPJ,
    MASK_TYPES.RG,
    MASK_TYPES.PHONE,
    MASK_TYPES.CURRENCY,
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default InputMasked;


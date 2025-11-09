/**
 * Mask utilities
 * Functions to apply and remove masks from input values
 */

/**
 * Applies CPF mask (000.000.000-00)
 * @param {string} value - Value to mask
 * @returns {string} - Masked value
 */
export const applyCPFMask = (value) => {
  if (!value) return '';
  
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // Limit to 11 digits
  const limited = numbers.slice(0, 11);
  
  // Apply mask
  if (limited.length <= 3) {
    return limited;
  } else if (limited.length <= 6) {
    return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  } else if (limited.length <= 9) {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  } else {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9, 11)}`;
  }
};

/**
 * Applies CNPJ mask (00.000.000/0000-00)
 * @param {string} value - Value to mask
 * @returns {string} - Masked value
 */
export const applyCNPJMask = (value) => {
  if (!value) return '';
  
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // Limit to 14 digits
  const limited = numbers.slice(0, 14);
  
  // Apply mask
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 5) {
    return `${limited.slice(0, 2)}.${limited.slice(2)}`;
  } else if (limited.length <= 8) {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5)}`;
  } else if (limited.length <= 12) {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8)}`;
  } else {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8, 12)}-${limited.slice(12, 14)}`;
  }
};

/**
 * Applies RG mask (00.000.000-0)
 * @param {string} value - Value to mask
 * @returns {string} - Masked value
 */
export const applyRGMask = (value) => {
  if (!value) return '';
  
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // Limit to 9 digits
  const limited = numbers.slice(0, 9);
  
  // Apply mask
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 5) {
    return `${limited.slice(0, 2)}.${limited.slice(2)}`;
  } else if (limited.length <= 8) {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5)}`;
  } else {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}-${limited.slice(8, 9)}`;
  }
};

/**
 * Applies phone mask ((00) 00000-0000)
 * @param {string} value - Value to mask
 * @returns {string} - Masked value
 */
export const applyPhoneMask = (value) => {
  if (!value) return '';
  
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // Limit to 11 digits
  const limited = numbers.slice(0, 11);
  
  // Apply mask
  if (limited.length <= 2) {
    return limited.length > 0 ? `(${limited}` : limited;
  } else if (limited.length <= 7) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  } else {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7, 11)}`;
  }
};

/**
 * Applies currency mask (R$ 0,00)
 * @param {string} value - Value to mask
 * @returns {string} - Masked value
 */
export const applyCurrencyMask = (value) => {
  if (!value) return '';
  
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // Convert to currency format
  const amount = (parseInt(numbers) / 100).toFixed(2);
  return `R$ ${amount.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

/**
 * Removes mask from value (keeps only numbers)
 * @param {string} value - Masked value
 * @returns {string} - Unmasked value (numbers only)
 */
export const removeMask = (value) => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};

/**
 * Mask types
 */
export const MASK_TYPES = {
  CPF: 'cpf',
  CNPJ: 'cnpj',
  RG: 'rg',
  PHONE: 'phone',
  CURRENCY: 'currency',
};

/**
 * Applies mask based on type
 * @param {string} value - Value to mask
 * @param {string} maskType - Type of mask to apply
 * @returns {string} - Masked value
 */
export const applyMask = (value, maskType) => {
  switch (maskType) {
    case MASK_TYPES.CPF:
      return applyCPFMask(value);
    case MASK_TYPES.CNPJ:
      return applyCNPJMask(value);
    case MASK_TYPES.RG:
      return applyRGMask(value);
    case MASK_TYPES.PHONE:
      return applyPhoneMask(value);
    case MASK_TYPES.CURRENCY:
      return applyCurrencyMask(value);
    default:
      return value;
  }
};


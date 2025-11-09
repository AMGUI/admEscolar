/**
 * Validation utilities
 * Centralized validation functions for CPF, CNPJ, etc.
 */

/**
 * Validates Brazilian CPF (Cadastro de Pessoas Físicas)
 * @param {string} cpf - CPF to validate
 * @returns {boolean} - True if valid
 */
export const isValidCPF = (cpf) => {
  if (!cpf) return false;
  
  // Remove non-numeric characters
  cpf = cpf.replace(/[^\d]/g, '');
  
  // Check length
  if (cpf.length !== 11) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Validate first digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  if (parseInt(cpf.charAt(9)) !== digit) return false;
  
  // Validate second digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  return parseInt(cpf.charAt(10)) === digit;
};

/**
 * Validates Brazilian CNPJ (Cadastro Nacional de Pessoas Jurídicas)
 * @param {string} cnpj - CNPJ to validate
 * @returns {boolean} - True if valid
 */
export const isValidCNPJ = (cnpj) => {
  if (!cnpj) return false;
  
  // Remove non-numeric characters
  cnpj = cnpj.replace(/[^\d]/g, '');
  
  // Check length
  if (cnpj.length !== 14) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  
  let length = cnpj.length - 2;
  const numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;
  
  // Validate first digit
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;
  
  // Validate second digit
  length++;
  sum = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1));
};

/**
 * Formats CPF with mask
 * @param {string} cpf - CPF to format
 * @returns {string} - Formatted CPF (000.000.000-00)
 */
export const formatCPF = (cpf) => {
  if (!cpf) return '';
  const cleaned = cpf.replace(/[^\d]/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Formats CNPJ with mask
 * @param {string} cnpj - CNPJ to format
 * @returns {string} - Formatted CNPJ (00.000.000/0000-00)
 */
export const formatCNPJ = (cnpj) => {
  if (!cnpj) return '';
  const cleaned = cnpj.replace(/[^\d]/g, '');
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};


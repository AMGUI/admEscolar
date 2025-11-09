import { useState } from 'react';
import { DEFAULT_CONTRACT } from '../utils/constants';
import { isValidCPF, isValidCNPJ } from '../utils/validators';
import { removeMask } from '../utils/masks';

/**
 * Custom hook for contract form management
 * @returns {Object} Contract form state and handlers
 */
export const useContractForm = () => {
  const [contract, setContract] = useState(DEFAULT_CONTRACT);
  const [errors, setErrors] = useState({});

  /**
   * Validates contract form
   * @returns {boolean} True if valid
   */
  const validate = () => {
    const newErrors = {};

    // Required fields
    if (!contract.nomeEscola.trim()) {
      newErrors.nomeEscola = 'Nome da escola é obrigatório';
    }
    if (!contract.nomeResponsavel.trim()) {
      newErrors.nomeResponsavel = 'Nome do responsável é obrigatório';
    }
    if (!contract.nomeAluno.trim()) {
      newErrors.nomeAluno = 'Nome do aluno é obrigatório';
    }

    // CPF validation (remove mask before validating)
    if (contract.cpfResponsavel) {
      const cpfUnmasked = removeMask(contract.cpfResponsavel);
      if (!isValidCPF(cpfUnmasked)) {
        newErrors.cpfResponsavel = 'CPF inválido';
      }
    }

    // CNPJ validation (remove mask before validating)
    if (contract.cnpjEscola) {
      const cnpjUnmasked = removeMask(contract.cnpjEscola);
      if (!isValidCNPJ(cnpjUnmasked)) {
        newErrors.cnpjEscola = 'CNPJ inválido';
      }
    }

    // Monthly payment validation
    const valor = parseFloat(contract.valorMensalidade);
    if (contract.valorMensalidade && (isNaN(valor) || valor <= 0)) {
      newErrors.valorMensalidade = 'Valor da mensalidade deve ser positivo';
    }

    // Date validation
    if (contract.dataInicio && contract.dataTermino) {
      if (new Date(contract.dataTermino) <= new Date(contract.dataInicio)) {
        newErrors.dataTermino = 'Data de término deve ser posterior à data de início';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles input change
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContract((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * Resets form to default values
   */
  const resetForm = () => {
    setContract(DEFAULT_CONTRACT);
    setErrors({});
  };

  /**
   * Sets contract data (for editing)
   * @param {Object} contractData - Contract data
   */
  const setContractData = (contractData) => {
    setContract(contractData);
    setErrors({});
  };

  return {
    contract,
    errors,
    validate,
    handleChange,
    resetForm,
    setContractData,
    setContract,
  };
};


import { useState } from 'react';

/**
 * Custom hook for contracts management
 * @returns {Object} Contracts state and handlers
 */
export const useContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  /**
   * Adds a new contract
   * @param {Object} contract - Contract data
   * @returns {number} Contract ID
   */
  const addContract = (contract) => {
    const newContract = {
      ...contract,
      id: Date.now(),
    };
    setContracts((prev) => [...prev, newContract]);
    return newContract.id;
  };

  /**
   * Updates an existing contract
   * @param {number} id - Contract ID
   * @param {Object} contract - Updated contract data
   */
  const updateContract = (id, contract) => {
    setContracts((prev) =>
      prev.map((c) => (c.id === id ? { ...contract, id } : c))
    );
  };

  /**
   * Deletes a contract
   * @param {number} id - Contract ID
   */
  const deleteContract = (id) => {
    setContracts((prev) => prev.filter((c) => c.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  /**
   * Gets a contract by ID
   * @param {number} id - Contract ID
   * @returns {Object|null} Contract data or null
   */
  const getContract = (id) => {
    return contracts.find((c) => c.id === id) || null;
  };

  /**
   * Sets contract for editing
   * @param {number} id - Contract ID
   */
  const setEditing = (id) => {
    setEditingId(id);
  };

  /**
   * Clears editing state
   */
  const clearEditing = () => {
    setEditingId(null);
  };

  return {
    contracts,
    editingId,
    addContract,
    updateContract,
    deleteContract,
    getContract,
    setEditing,
    clearEditing,
  };
};


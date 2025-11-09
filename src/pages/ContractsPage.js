import React, { useState } from 'react';
import { Header, ContractList, Card, FormField, Button, MASK_TYPES } from '../components';
import { useContractForm, useContracts } from '../hooks';
import { generateContractPDF } from '../utils/contractService';

/**
 * ContractsPage Component
 * Contract management page with form and list
 */
const ContractsPage = () => {
  const {
    contract,
    errors,
    validate,
    handleChange,
    resetForm,
    setContractData,
  } = useContractForm();

  const {
    contracts,
    editingId,
    addContract,
    updateContract,
    deleteContract,
    setEditing,
    clearEditing,
  } = useContracts();

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  /**
   * Handles form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId) {
      updateContract(editingId, contract);
    } else {
      addContract(contract);
    }

    resetForm();
    clearEditing();
  };

  /**
   * Handles edit action
   */
  const handleEdit = (contractData) => {
    setContractData(contractData);
    setEditing(contractData.id);
  };

  /**
   * Handles delete action
   */
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este contrato?')) {
      deleteContract(id);
      if (editingId === id) {
        resetForm();
        clearEditing();
      }
    }
  };

  /**
   * Handles PDF generation
   */
  const handleGeneratePDF = async (contractData) => {
    setIsGeneratingPDF(true);
    try {
      await generateContractPDF(contractData);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  /**
   * Handles cancel action
   */
  const handleCancel = () => {
    resetForm();
    clearEditing();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Gestão de Contratos Educacionais" icon="fa-file-contract" />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Form Card */}
        <Card
          title={editingId ? 'Editar Contrato' : 'Novo Contrato'}
          icon="fa-file-contract"
          className="mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* School Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Dados da Escola
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <FormField
                    label="Nome da Escola"
                    name="nomeEscola"
                    value={contract.nomeEscola}
                    onChange={handleChange}
                    required
                    error={errors.nomeEscola}
                  />
                </div>

                <FormField
                  label="CNPJ da Escola"
                  name="cnpjEscola"
                  value={contract.cnpjEscola}
                  onChange={handleChange}
                  placeholder="00.000.000/0000-00"
                  maskType={MASK_TYPES.CNPJ}
                  error={errors.cnpjEscola}
                />

                <div className="md:col-span-2">
                  <FormField
                    label="Endereço da Escola"
                    name="enderecoEscola"
                    value={contract.enderecoEscola}
                    onChange={handleChange}
                    placeholder="Rua, número, bairro, cidade - UF"
                  />
                </div>
              </div>
            </div>

            {/* Responsible Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Dados do Responsável
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <FormField
                    label="Nome do Responsável"
                    name="nomeResponsavel"
                    value={contract.nomeResponsavel}
                    onChange={handleChange}
                    required
                    error={errors.nomeResponsavel}
                  />
                </div>

                <FormField
                  label="CPF do Responsável"
                  name="cpfResponsavel"
                  value={contract.cpfResponsavel}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  maskType={MASK_TYPES.CPF}
                  error={errors.cpfResponsavel}
                />

                <FormField
                  label="RG do Responsável"
                  name="rgResponsavel"
                  value={contract.rgResponsavel}
                  onChange={handleChange}
                  placeholder="00.000.000-0"
                  maskType={MASK_TYPES.RG}
                />

                <div className="md:col-span-2">
                  <FormField
                    label="Endereço do Responsável"
                    name="enderecoResponsavel"
                    value={contract.enderecoResponsavel}
                    onChange={handleChange}
                    placeholder="Rua, número, bairro, cidade - UF"
                  />
                </div>
              </div>
            </div>

            {/* Student Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Dados do Aluno
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <FormField
                    label="Nome do Aluno"
                    name="nomeAluno"
                    value={contract.nomeAluno}
                    onChange={handleChange}
                    required
                    error={errors.nomeAluno}
                  />
                </div>

                <FormField
                  label="Ano Letivo"
                  name="anoLetivo"
                  type="number"
                  value={contract.anoLetivo}
                  onChange={handleChange}
                  placeholder="2024"
                />

                <FormField
                  label="Data de Início"
                  name="dataInicio"
                  type="date"
                  value={contract.dataInicio}
                  onChange={handleChange}
                />

                <FormField
                  label="Data de Término"
                  name="dataTermino"
                  type="date"
                  value={contract.dataTermino}
                  onChange={handleChange}
                  error={errors.dataTermino}
                />
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Dados Financeiros
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Valor da Mensalidade (R$)"
                  name="valorMensalidade"
                  type="number"
                  value={contract.valorMensalidade}
                  onChange={handleChange}
                  placeholder="0,00"
                  step="0.01"
                  min="0"
                  error={errors.valorMensalidade}
                />

                <FormField
                  label="Dia do Vencimento"
                  name="diaVencimento"
                  type="number"
                  value={contract.diaVencimento}
                  onChange={handleChange}
                  min="1"
                  max="31"
                  placeholder="10"
                />

                <FormField
                  label="Percentual de Multa (%)"
                  name="percentualMulta"
                  type="number"
                  value={contract.percentualMulta}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  placeholder="2"
                />

                <FormField
                  label="Percentual de Juros (%)"
                  name="percentualJuros"
                  type="number"
                  value={contract.percentualJuros}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  placeholder="1"
                />
              </div>
            </div>

            {/* Signature Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Dados de Assinatura
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Local de Assinatura"
                  name="local"
                  value={contract.local}
                  onChange={handleChange}
                  placeholder="Cidade - Estado"
                />

                <FormField
                  label="Data de Assinatura"
                  name="dataAssinatura"
                  type="date"
                  value={contract.dataAssinatura}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex space-x-4 pt-4 border-t">
              <Button
                type="submit"
                variant="primary"
                icon={editingId ? 'fa-save' : 'fa-plus'}
                fullWidth
              >
                {editingId ? 'Atualizar Contrato' : 'Salvar Contrato'}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Contracts List */}
        <ContractList
          contracts={contracts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onGeneratePDF={handleGeneratePDF}
        />
      </main>
    </div>
  );
};

export default ContractsPage;

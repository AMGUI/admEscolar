import React from 'react';
import PropTypes from 'prop-types';
import { Card, ContractItem } from '../../molecules';

/**
 * ContractList Organism Component
 * List of contracts with actions
 */
const ContractList = ({
  contracts = [],
  onEdit,
  onDelete,
  onGeneratePDF,
  title = 'Contratos Cadastrados',
  emptyMessage = 'Nenhum contrato cadastrado.',
  className = '',
  ...props
}) => {
  return (
    <Card title={title} icon="fa-file-contract" className={className} {...props}>
      {contracts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{emptyMessage}</p>
      ) : (
        <div className="space-y-4">
          {contracts.map((contract) => (
            <ContractItem
              key={contract.id}
              contract={contract}
              onEdit={onEdit}
              onDelete={onDelete}
              onGeneratePDF={onGeneratePDF}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

ContractList.propTypes = {
  contracts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nomeAluno: PropTypes.string.isRequired,
      nomeEscola: PropTypes.string.isRequired,
      anoLetivo: PropTypes.string,
      valorMensalidade: PropTypes.string,
    })
  ),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onGeneratePDF: PropTypes.func.isRequired,
  title: PropTypes.string,
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
};

export default ContractList;


import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../atoms';

/**
 * ContractItem Molecule Component
 * Displays a contract item in a list with actions
 */
const ContractItem = ({
  contract,
  onEdit,
  onDelete,
  onGeneratePDF,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        border border-gray-200 rounded-lg p-4
        flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4
        hover:shadow-md transition-shadow
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      <div className="flex-1">
        <p className="font-medium text-gray-900 mb-1">{contract.nomeAluno}</p>
        <p className="text-sm text-gray-600">
          {contract.nomeEscola} • {contract.anoLetivo}
        </p>
        {contract.valorMensalidade && (
          <p className="text-sm text-gray-500 mt-1">
            Mensalidade: R$ {parseFloat(contract.valorMensalidade).toFixed(2)}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          icon="fa-edit"
          onClick={() => onEdit(contract)}
        >
          Editar
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon="fa-trash"
          onClick={() => onDelete(contract.id)}
          className="!text-danger hover:!text-danger hover:!bg-red-50"
        >
          Excluir
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon="fa-file-pdf"
          onClick={() => onGeneratePDF(contract)}
        >
          PDF
        </Button>
      </div>
    </div>
  );
};

ContractItem.propTypes = {
  contract: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nomeAluno: PropTypes.string.isRequired,
    nomeEscola: PropTypes.string.isRequired,
    anoLetivo: PropTypes.string,
    valorMensalidade: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onGeneratePDF: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ContractItem;


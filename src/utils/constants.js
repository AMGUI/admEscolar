/**
 * Constants
 * Application-wide constants
 */

/**
 * Default contract values
 */
export const DEFAULT_CONTRACT = {
  nomeEscola: '',
  cnpjEscola: '',
  enderecoEscola: '',
  nomeResponsavel: '',
  cpfResponsavel: '',
  rgResponsavel: '',
  enderecoResponsavel: '',
  nomeAluno: '',
  anoLetivo: new Date().getFullYear().toString(),
  dataInicio: '',
  dataTermino: '',
  valorMensalidade: '',
  diaVencimento: '10',
  percentualMulta: '2',
  percentualJuros: '1',
  local: '',
  dataAssinatura: new Date().toISOString().split('T')[0],
};

/**
 * Contract template path
 */
export const CONTRACT_TEMPLATE_PATH = '/assets/modelo_contrato.txt';


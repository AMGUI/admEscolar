/**
 * Contract Service
 * Service for contract-related operations (PDF generation, etc.)
 */
import { jsPDF } from 'jspdf';
import { CONTRACT_TEMPLATE_PATH } from './constants';

/**
 * Checks if a value is empty or undefined
 * @param {any} value - Value to check
 * @returns {boolean} - True if empty
 */
const isEmpty = (value) => {
  return value === null || value === undefined || value === '' || (typeof value === 'string' && value.trim() === '');
};

/**
 * Formats date to Brazilian format (DD/MM/YYYY)
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {string} - Formatted date (DD/MM/YYYY) or empty string
 */
const formatDate = (dateString) => {
  if (isEmpty(dateString)) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('pt-BR');
  } catch (error) {
    console.warn('Erro ao formatar data:', dateString, error);
    return '';
  }
};

/**
 * Formats currency value to Brazilian format
 * @param {string|number} value - Currency value
 * @returns {string} - Formatted currency (without R$ symbol)
 */
const formatCurrency = (value) => {
  if (isEmpty(value)) return '0,00';
  try {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '0,00';
    return numValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } catch (error) {
    console.warn('Erro ao formatar valor:', value, error);
    return '0,00';
  }
};

/**
 * Gets value or default placeholder
 * @param {any} value - Value to check
 * @param {string} placeholder - Placeholder if value is empty
 * @returns {string} - Value or placeholder
 */
const getValueOrPlaceholder = (value, placeholder) => {
  if (isEmpty(value)) {
    return placeholder;
  }
  return String(value).trim();
};

/**
 * Generates PDF from contract data
 * @param {Object} contractData - Contract data
 * @returns {Promise<void>}
 */
export const generateContractPDF = async (contractData) => {
  try {
    // Validate contractData
    if (!contractData || typeof contractData !== 'object') {
      throw new Error('Dados do contrato inválidos');
    }

    // Debug: Log contract data with specific fields
    console.log('=== DEBUG: Dados do contrato para PDF ===');
    console.log('CPF:', contractData.cpfResponsavel, 'Tipo:', typeof contractData.cpfResponsavel);
    console.log('CNPJ:', contractData.cnpjEscola, 'Tipo:', typeof contractData.cnpjEscola);
    console.log('RG:', contractData.rgResponsavel, 'Tipo:', typeof contractData.rgResponsavel);
    console.log('Dados completos:', JSON.stringify(contractData, null, 2));

    // 1. Load template
    const response = await fetch(CONTRACT_TEMPLATE_PATH);
    if (!response.ok) {
      throw new Error(`Modelo de contrato não encontrado em ${CONTRACT_TEMPLATE_PATH}`);
    }
    let template = await response.text();

    // Debug: Check if template contains placeholders
    console.log('Template carregado. Contém $cpfResponsavel$:', template.includes('$cpfResponsavel$'));
    console.log('Template carregado. Contém $cnpjEscola$:', template.includes('$cnpjEscola$'));
    console.log('Template carregado. Contém $rgResponsavel$:', template.includes('$rgResponsavel$'));

    // 2. Format monthly payment value
    const valorFormatado = formatCurrency(contractData?.valorMensalidade);

    // 3. Mapping of replacements with proper value checking
    // Use explicit checks to ensure values are properly handled
    const cpfValue = contractData.cpfResponsavel?.trim() || '';
    const cnpjValue = contractData.cnpjEscola?.trim() || '';
    const rgValue = contractData.rgResponsavel?.trim() || '';

    console.log('Valores extraídos - CPF:', cpfValue, 'CNPJ:', cnpjValue, 'RG:', rgValue);

    const replacements = {
      $nomeEscola$: getValueOrPlaceholder(contractData?.nomeEscola, '[NOME DA ESCOLA]'),
      $cnpjEscola$: cnpjValue || '[CNPJ]',
      $enderecoEscola$: getValueOrPlaceholder(contractData?.enderecoEscola, '[ENDEREÇO DA ESCOLA]'),
      $nomeResponsavel$: getValueOrPlaceholder(contractData?.nomeResponsavel, '[NOME DO RESPONSÁVEL]'),
      $cpfResponsavel$: cpfValue || '[CPF]',
      $rgResponsavel$: rgValue || '[RG]',
      $enderecoResponsavel$: getValueOrPlaceholder(contractData?.enderecoResponsavel, '[ENDEREÇO DO RESPONSÁVEL]'),
      $nomeAluno$: getValueOrPlaceholder(contractData?.nomeAluno, '[NOME DO ALUNO]'),
      $anoLetivo$: getValueOrPlaceholder(contractData?.anoLetivo, '[ANO LETIVO]'),
      $dataInicio$: formatDate(contractData?.dataInicio) || '[DATA INÍCIO]',
      $dataTermino$: formatDate(contractData?.dataTermino) || '[DATA TÉRMINO]',
      $valorMensalidade$: valorFormatado,
      $diaVencimento$: getValueOrPlaceholder(contractData?.diaVencimento, '10'),
      $percentualMulta$: getValueOrPlaceholder(contractData?.percentualMulta, '2'),
      $percentualJuros$: getValueOrPlaceholder(contractData?.percentualJuros, '1'),
      $local$: getValueOrPlaceholder(contractData?.local, '[LOCAL]'),
      $dataAssinatura$: formatDate(contractData?.dataAssinatura) || '[DATA ASSINATURA]',
    };

    // Debug: Log replacements
    console.log('=== Substituições a serem aplicadas ===');
    console.log('$cpfResponsavel$:', replacements.$cpfResponsavel$);
    console.log('$cnpjEscola$:', replacements.$cnpjEscola$);
    console.log('$rgResponsavel$:', replacements.$rgResponsavel$);

    // 4. Safe replacement with regex (escaping $)
    let result = template;
    Object.entries(replacements).forEach(([placeholder, value]) => {
      const regex = new RegExp(placeholder.replace(/\$/g, '\\$'), 'g');
      const beforeReplace = result;
      result = result.replace(regex, value);
      // Debug: Log if replacement happened
      if (beforeReplace !== result) {
        console.log(`Substituído ${placeholder} por: ${value}`);
      } else if (beforeReplace.includes(placeholder)) {
        console.warn(`Placeholder ${placeholder} não foi substituído!`);
      }
    });

    // Debug: Check if all placeholders were replaced
    const remainingPlaceholders = result.match(/\$[^$]+\$/g);
    if (remainingPlaceholders && remainingPlaceholders.length > 0) {
      console.warn('Placeholders não substituídos:', remainingPlaceholders);
    }

    // 5. Generate PDF
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const lineHeight = 7;
    const margin = 15;
    const maxWidth = pageWidth - margin * 2;
    const lines = doc.splitTextToSize(result, maxWidth);

    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    let y = margin;
    const bottomMargin = 20;

    lines.forEach((line) => {
      // Check if we need a new page
      if (y + lineHeight > pageHeight - bottomMargin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    // Generate filename (remove special characters and spaces)
    const alunoName = contractData.nomeAluno
      ? contractData.nomeAluno.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
      : 'novo';
    const filename = `contrato_${alunoName}_${Date.now()}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error(`Erro ao gerar PDF: ${error.message || 'Falha desconhecida'}`);
  }
};


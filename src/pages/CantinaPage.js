import React, { useState } from 'react';
import { Header, Card, Button, MenuItem, Badge, Icon } from '../components';

/**
 * CantinaPage Component
 * School cafeteria order page where parents can order snacks for their children
 */
const CantinaPage = () => {
  // Menu options with name, price and ID
  const opcoes = [
    { id: 'pao-queijo', nome: 'Pão de Queijo', preco: 3.5 },
    { id: 'bolo-cenoura', nome: 'Bolo de Cenoura', preco: 4.0 },
    { id: 'biscoito-caseiro', nome: 'Biscoito Caseiro', preco: 2.5 },
    { id: 'fruta-fresca', nome: 'Fruta Fresca (banana ou maçã)', preco: 2.0 },
    { id: 'suco-natural', nome: 'Suco Natural (laranja ou caju)', preco: 5.0 },
    { id: 'iogurte', nome: 'Iogurte Natural', preco: 4.5 },
    { id: 'mingau', nome: 'Mingau de Aveia', preco: 3.0 },
  ];

  const [selecionados, setSelecionados] = useState({});
  const [pedidoEnviado, setPedidoEnviado] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Toggles item selection
   */
  const toggleItem = (id) => {
    setSelecionados((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /**
   * Calculates total price
   */
  const valorTotal = opcoes
    .filter((item) => selecionados[item.id])
    .reduce((total, item) => total + item.preco, 0);

  /**
   * Gets selected items count
   */
  const itensSelecionados = Object.values(selecionados).filter(Boolean).length;

  /**
   * Formats currency value
   */
  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (itensSelecionados === 0) {
      alert('Por favor, selecione pelo menos um item.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get selected items for logging
      const itemsPedidos = opcoes
        .filter((item) => selecionados[item.id])
        .map((item) => ({
          nome: item.nome,
          preco: item.preco,
        }));

      console.log('Pedido enviado:', {
        items: itemsPedidos,
        total: valorTotal,
        data: new Date().toISOString(),
      });

      setPedidoEnviado(true);
      setSelecionados({});

      // Reset after 5 seconds
      setTimeout(() => {
        setPedidoEnviado(false);
      }, 5000);
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      alert('Erro ao enviar pedido. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Clears all selections
   */
  const handleClear = () => {
    setSelecionados({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Pedidos da Cantina Escolar" icon="fa-utensils" />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Information Card */}
        <Card
          title="Fazer Pedido"
          icon="fa-shopping-cart"
          className="mb-6"
        >
          <p className="text-gray-600 mb-2">
            Selecione os lanches da tarde para seu(s) filho(s). Os pedidos devem ser feitos até as 10h para serem servidos no mesmo dia.
          </p>
          {itensSelecionados > 0 && (
            <div className="mt-3">
              <Badge variant="primary">
                {itensSelecionados} {itensSelecionados === 1 ? 'item selecionado' : 'itens selecionados'}
              </Badge>
            </div>
          )}
        </Card>

        {/* Success Message */}
        {pedidoEnviado && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <div className="flex items-start">
              <Icon name="fa-check-circle" size="xl" color="success" className="mr-3 mt-1" />
              <div>
                <p className="font-semibold text-green-800">Pedido enviado com sucesso!</p>
                <p className="text-sm text-green-700 mt-1">
                  Seu pedido foi registrado e será preparado pela cantina.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Menu Items Card */}
        <Card title="Escolha os lanches" icon="fa-list" className="mb-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-3 mb-6">
              {opcoes.map((item) => (
                <MenuItem
                  key={item.id}
                  id={item.id}
                  nome={item.nome}
                  preco={item.preco}
                  checked={!!selecionados[item.id]}
                  onChange={toggleItem}
                />
              ))}
            </div>

            {/* Total Section */}
            {valorTotal > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-700">Total:</span>
                  <span className="text-2xl font-bold text-success">
                    R$ {formatCurrency(valorTotal)}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              <Button
                type="submit"
                variant="primary"
                icon="fa-paper-plane"
                fullWidth
                disabled={valorTotal === 0 || isSubmitting || pedidoEnviado}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Pedido'}
              </Button>
              {itensSelecionados > 0 && !pedidoEnviado && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  disabled={isSubmitting}
                >
                  Limpar
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Info Footer */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2 flex items-center justify-center">
              <Icon name="fa-clock" size="sm" className="mr-2" />
              Os pedidos devem ser feitos até as 10h para serem servidos no mesmo dia.
            </p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} - Cantina Escolar | PG Web
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default CantinaPage;

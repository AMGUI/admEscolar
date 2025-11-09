import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';

/**
 * HomePage Component
 * Main landing page with navigation options
 */
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-3xl font-bold text-gray-800">Bem-vindo ao Sistema PG Web</h1>
        <p className="text-gray-600">Selecione uma área para continuar</p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap">
          <Button
            variant="primary"
            size="lg"
            icon="fa-file-invoice-dollar"
            onClick={() => navigate('/financeiro')}
            className="shadow-md transform hover:scale-105"
          >
            Administração Financeira
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon="fa-file-contract"
            onClick={() => navigate('/contratos')}
            className="shadow-md transform hover:scale-105"
          >
            Contratos
          </Button>

          <Button
            variant="success"
            size="lg"
            icon="fa-utensils"
            onClick={() => navigate('/cantina')}
            className="shadow-md transform hover:scale-105"
          >
            Cantina
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

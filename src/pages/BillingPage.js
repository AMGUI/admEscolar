import React, { useState } from 'react';
import {
  Header,
  StatsGrid,
  QuickActions,
  RecentBillsList,
  RevenueSummary,
  UpcomingDueDates,
  Card,
  FormField,
  Button,
} from '../components';

/**
 * BillingPage Component
 * Financial administration page with billing management
 */
const BillingPage = () => {
  const [formData, setFormData] = useState({
    student: '',
    course: '',
    month: '2024-12',
    amount: '',
    status: 'pending',
    observations: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { student, course, amount, month } = formData;
    if (!student || !course || !amount || !month) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    alert('Cobrança gerada com sucesso!');
    setFormData({
      student: '',
      course: '',
      month: '2024-12',
      amount: '',
      status: 'pending',
      observations: '',
    });
  };

  const handleClear = () => {
    setFormData({
      student: '',
      course: '',
      month: '2024-12',
      amount: '',
      status: 'pending',
      observations: '',
    });
  };

  // Stats data
  const stats = [
    { title: 'Total de Alunos', value: '127', icon: 'fa-users', color: 'primary' },
    { title: 'Mensalidades em Aberto', value: '43', icon: 'fa-file-invoice', color: 'warning' },
    { title: 'Pagas este Mês', value: '84', icon: 'fa-check-circle', color: 'success' },
    { title: 'Em Atraso', value: '12', icon: 'fa-exclamation-triangle', color: 'danger' },
  ];

  // Student options
  const studentOptions = [
    { value: '1', label: 'Maria Silva - Matrícula: 2024001' },
    { value: '2', label: 'João Santos - Matrícula: 2024002' },
    { value: '3', label: 'Ana Oliveira - Matrícula: 2024003' },
    { value: '4', label: 'Pedro Costa - Matrícula: 2024004' },
    { value: '5', label: 'Carla Mendes - Matrícula: 2024005' },
  ];

  // Course options
  const courseOptions = [
    { value: '1', label: 'Desenvolvimento Web Full Stack' },
    { value: '2', label: 'Design UX/UI' },
    { value: '3', label: 'Marketing Digital' },
    { value: '4', label: 'Data Science' },
    { value: '5', label: 'Inteligência Artificial' },
  ];

  // Status options
  const statusOptions = [
    { value: 'pending', label: 'Pendente' },
    { value: 'paid', label: 'Pago' },
    { value: 'overdue', label: 'Atrasado' },
  ];

  // Recent bills data
  const recentBills = [
    { name: 'Maria Silva', period: 'Dez/2024', value: 'R$ 499,00', status: 'Pendente', statusColor: 'warning' },
    { name: 'João Santos', period: 'Dez/2024', value: 'R$ 399,00', status: 'Pago', statusColor: 'success' },
    { name: 'Ana Oliveira', period: 'Nov/2024', value: 'R$ 499,00', status: 'Atrasado', statusColor: 'danger' },
  ];

  // Quick actions data
  const quickActions = [
    { icon: 'fa-file-export', label: 'Exportar Relatório', onClick: () => console.log('Export') },
    { icon: 'fa-envelope', label: 'Enviar Lembretes', onClick: () => console.log('Reminder') },
    { icon: 'fa-print', label: 'Imprimir Cobranças', onClick: () => console.log('Print') },
    { icon: 'fa-cog', label: 'Configurações', onClick: () => console.log('Settings') },
  ];

  // Upcoming due dates data
  const upcomingDueDates = [
    { date: '15/12/2024', count: '8 cobranças' },
    { date: '20/12/2024', count: '12 cobranças' },
    { date: '25/12/2024', count: '5 cobranças' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="PG Web - Cobrança de Mensalidades" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card title="Gerar Nova Cobrança" icon="fa-file-invoice-dollar">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Aluno"
                    name="student"
                    fieldType="select"
                    value={formData.student}
                    onChange={handleInputChange}
                    options={studentOptions}
                    placeholder="Selecione um aluno"
                    required
                  />

                  <FormField
                    label="Curso"
                    name="course"
                    fieldType="select"
                    value={formData.course}
                    onChange={handleInputChange}
                    options={courseOptions}
                    placeholder="Selecione um curso"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="Mês/Ano"
                    name="month"
                    type="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    required
                  />

                  <FormField
                    label="Valor (R$)"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0,00"
                    step="0.01"
                    min="0"
                    required
                  />

                  <FormField
                    label="Status"
                    name="status"
                    fieldType="select"
                    value={formData.status}
                    onChange={handleInputChange}
                    options={statusOptions}
                    required
                  />
                </div>

                <FormField
                  label="Observações (Opcional)"
                  name="observations"
                  fieldType="textarea"
                  value={formData.observations}
                  onChange={handleInputChange}
                  placeholder="Adicione observações sobre esta cobrança..."
                  rows={3}
                />

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    icon="fa-plus-circle"
                    fullWidth
                  >
                    Gerar Cobrança
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClear}
                  >
                    Limpar
                  </Button>
                </div>
              </form>
            </Card>

            <RecentBillsList bills={recentBills} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <QuickActions actions={quickActions} />
            <UpcomingDueDates dueDates={upcomingDueDates} />
            <RevenueSummary
              amount="R$ 32.450,00"
              percentageChange="+12% em relação ao mês anterior"
              targetAmount="R$ 35.000,00"
              progressPercentage={93}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillingPage;

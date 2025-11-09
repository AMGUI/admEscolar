# Estrutura de Componentes - Atomic Design

Este projeto segue os princípios do **Atomic Design**, organizando os componentes em três níveis hierárquicos: Átomos, Moléculas e Organismos.

## 📁 Estrutura de Pastas

```
src/components/
├── atoms/           # Componentes básicos e indivisíveis
├── molecules/       # Combinações de átomos
├── organisms/       # Combinações de moléculas
└── index.js         # Exportações centralizadas
```

## 🧪 Átomos (Atoms)

Componentes básicos e reutilizáveis que formam a base da interface.

### Componentes Disponíveis:
- **Button** - Botão com múltiplas variantes (primary, secondary, success, warning, danger, outline, ghost)
- **Input** - Campo de entrada de texto
- **Select** - Campo de seleção/dropdown
- **Textarea** - Campo de texto multilinha
- **Label** - Rótulo para campos de formulário
- **Icon** - Ícone usando Font Awesome
- **Badge** - Badge de status com cores
- **Avatar** - Avatar de usuário

### Uso:
```jsx
import { Button, Input, Icon } from '../components';

<Button variant="primary" icon="fa-user" onClick={handleClick}>
  Clique aqui
</Button>
```

## 🧬 Moléculas (Molecules)

Combinações de átomos que formam componentes mais complexos.

### Componentes Disponíveis:
- **FormField** - Campo de formulário completo (Label + Input/Select/Textarea)
- **Card** - Container de card reutilizável
- **StatCard** - Card de estatísticas com ícone e cor
- **ActionButton** - Botão de ação para listas
- **BillItem** - Item de cobrança/fatura em lista

### Uso:
```jsx
import { FormField, Card, StatCard } from '../components';

<FormField
  label="Nome"
  name="name"
  value={value}
  onChange={handleChange}
  required
/>
```

## 🦠 Organismos (Organisms)

Combinações de moléculas que formam seções completas da interface.

### Componentes Disponíveis:
- **Header** - Cabeçalho da aplicação
- **StatsGrid** - Grid de cartões de estatísticas
- **QuickActions** - Menu de ações rápidas
- **RecentBillsList** - Lista de cobranças recentes
- **RevenueSummary** - Resumo de receita com progresso
- **UpcomingDueDates** - Lista de próximos vencimentos

### Uso:
```jsx
import { Header, StatsGrid, QuickActions } from '../components';

<Header title="Minha Aplicação" userName="Admin" />
<StatsGrid stats={statsData} />
```

## 🎨 Tema

As cores do tema estão centralizadas em `src/theme/colors.js` e são utilizadas através das classes do Tailwind CSS configuradas no `public/index.html`.

### Cores Disponíveis:
- `primary` - Azul principal (#2563eb)
- `secondary` - Azul secundário (#1e40af)
- `success` - Verde (#10b981)
- `warning` - Amarelo (#f59e0b)
- `danger` - Vermelho (#ef4444)

## 📝 Princípios de Clean Code

1. **Reutilização** - Componentes são reutilizáveis e configuráveis via props
2. **Single Responsibility** - Cada componente tem uma responsabilidade única
3. **PropTypes** - Todos os componentes têm validação de tipos
4. **Documentação** - Componentes são documentados com JSDoc
5. **Consistência** - Padrões visuais e de código consistentes

## 🚀 Como Usar

### Importação Centralizada:
```jsx
import { Button, Card, Header } from '../components';
```

### Importação Específica:
```jsx
import { Button } from '../components/atoms';
import { Card } from '../components/molecules';
import { Header } from '../components/organisms';
```

## 📚 Exemplos

Veja os exemplos de uso nos arquivos:
- `src/pages/Homepages.js`
- `src/pages/BillingPage.js`
- `src/pages/ContractsPage.js`


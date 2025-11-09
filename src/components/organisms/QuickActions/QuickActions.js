import React from 'react';
import PropTypes from 'prop-types';
import { Card, ActionButton } from '../../molecules';

/**
 * QuickActions Organism Component
 * Sidebar quick actions menu
 */
const QuickActions = ({
  actions = [],
  title = 'Ações Rápidas',
  className = '',
  ...props
}) => {
  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <Card title={title} className={className} {...props}>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <ActionButton
            key={index}
            icon={action.icon}
            label={action.label}
            onClick={action.onClick}
          />
        ))}
      </div>
    </Card>
  );
};

QuickActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
  title: PropTypes.string,
  className: PropTypes.string,
};

export default QuickActions;


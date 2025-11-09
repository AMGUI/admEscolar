import React from 'react';
import PropTypes from 'prop-types';
import { StatCard } from '../../molecules';

/**
 * StatsGrid Organism Component
 * Grid of statistic cards
 */
const StatsGrid = ({
  stats = [],
  className = '',
  ...props
}) => {
  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 ${className}`.trim()} {...props}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

StatsGrid.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      icon: PropTypes.string.isRequired,
      color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger']),
    })
  ),
  className: PropTypes.string,
};

export default StatsGrid;


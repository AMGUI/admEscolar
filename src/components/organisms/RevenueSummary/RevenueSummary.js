import React from 'react';
import PropTypes from 'prop-types';

/**
 * RevenueSummary Organism Component
 * Revenue summary card with progress indicator
 */
const RevenueSummary = ({
  title = 'Receita Mensal',
  amount,
  percentageChange,
  targetAmount,
  progressPercentage,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        bg-gradient-to-br from-primary to-secondary rounded-xl shadow-sm p-6 text-white fade-in
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      <h3 className="text-md font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold mb-2">{amount}</p>
      {percentageChange && (
        <p className="text-sm opacity-90">{percentageChange}</p>
      )}
      {targetAmount && progressPercentage !== undefined && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex justify-between text-sm">
            <span>Meta: {targetAmount}</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
            <div
              className="bg-white rounded-full h-2 transition-all"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

RevenueSummary.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.string.isRequired,
  percentageChange: PropTypes.string,
  targetAmount: PropTypes.string,
  progressPercentage: PropTypes.number,
  className: PropTypes.string,
};

export default RevenueSummary;


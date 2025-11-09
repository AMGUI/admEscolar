import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../molecules';

/**
 * UpcomingDueDates Organism Component
 * List of upcoming due dates
 */
const UpcomingDueDates = ({
  dueDates = [],
  title = 'Próximos Vencimentos',
  className = '',
  ...props
}) => {
  return (
    <Card title={title} className={className} {...props}>
      <div className="space-y-3">
        {dueDates.length > 0 ? (
          dueDates.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{item.date}</span>
              <span className="text-sm font-medium text-gray-900">{item.count}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">Nenhum vencimento próximo</p>
        )}
      </div>
    </Card>
  );
};

UpcomingDueDates.propTypes = {
  dueDates: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      count: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
  className: PropTypes.string,
};

export default UpcomingDueDates;


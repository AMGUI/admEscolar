import React from 'react';
import PropTypes from 'prop-types';
import { Card, BillItem } from '../../molecules';

/**
 * RecentBillsList Organism Component
 * List of recent bills/invoices
 */
const RecentBillsList = ({
  bills = [],
  title = 'Cobranças Recentes',
  className = '',
  onBillClick,
  ...props
}) => {
  return (
    <Card title={title} icon="fa-history" className={className} {...props}>
      <div className="space-y-4">
        {bills.length > 0 ? (
          bills.map((bill, index) => (
            <BillItem
              key={index}
              name={bill.name}
              period={bill.period}
              value={bill.value}
              status={bill.status}
              statusColor={bill.statusColor}
              onClick={onBillClick ? () => onBillClick(bill) : undefined}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">Nenhuma cobrança recente</p>
        )}
      </div>
    </Card>
  );
};

RecentBillsList.propTypes = {
  bills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      period: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      statusColor: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger']),
    })
  ),
  title: PropTypes.string,
  className: PropTypes.string,
  onBillClick: PropTypes.func,
};

export default RecentBillsList;


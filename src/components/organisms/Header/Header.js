import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Avatar } from '../../atoms';

/**
 * Header Organism Component
 * Application header with logo, title, and user info
 */
const Header = ({
  title,
  icon = 'fa-graduation-cap',
  userName = 'Administrador',
  userInitials = 'A',
  userAvatar,
  className = '',
  ...props
}) => {
  return (
    <header className={`bg-white shadow-sm border-b ${className}`.trim()} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="bg-primary text-white p-2 rounded-lg mr-3">
              <Icon name={icon} size="xl" color="white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{userName}</span>
            <Avatar name={userInitials} src={userAvatar} size="md" />
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  userName: PropTypes.string,
  userInitials: PropTypes.string,
  userAvatar: PropTypes.string,
  className: PropTypes.string,
};

export default Header;


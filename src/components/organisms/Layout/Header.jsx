import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Header = ({ onMenuClick, currentPath }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    switch (currentPath) {
      case '/':
        return 'Dashboard';
      case '/courses':
        return 'My Courses';
      case '/create-course':
        return 'Create Course';
      case '/sales':
        return 'Sales Analytics';
      case '/students':
        return 'Students';
      case '/settings':
        return 'Settings';
      default:
        if (currentPath.startsWith('/courses/')) {
          return 'Course Details';
        }
        return 'SkillBites';
    }
  };

  const handleCreateCourse = () => {
    navigate('/create-course');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="Menu" size={20} className="text-gray-600" />
          </button>

          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">
              {getPageTitle()}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">
                Welcome back! Ready to create amazing courses?
              </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Quick Create Button */}
          {currentPath !== '/create-course' && (
            <Button
              variant="primary"
              size="sm"
              icon="Plus"
              onClick={handleCreateCourse}
              className="hidden md:flex"
            >
              Create Course
            </Button>
          )}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <ApperIcon name="Bell" size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-floating border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-display font-semibold text-gray-900">
                    Notifications
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <ApperIcon name="CheckCircle" size={16} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        New student enrolled
                      </p>
                      <p className="text-xs text-gray-500">
                        Sarah joined "Web Development Basics"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <ApperIcon name="DollarSign" size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Payment received
                      </p>
                      <p className="text-xs text-gray-500">
                        $49 from course purchase
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100">
                  <button className="text-sm text-primary hover:text-primary-dark font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">John Educator</p>
              <p className="text-xs text-gray-500">Course Creator</p>
            </div>
            <div className="w-10 h-10 bg-gradient-purple rounded-full flex items-center justify-center">
              <ApperIcon name="User" size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
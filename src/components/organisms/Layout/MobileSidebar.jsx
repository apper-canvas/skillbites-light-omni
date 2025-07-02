import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const MobileSidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
    { name: 'My Courses', href: '/courses', icon: 'BookOpen' },
    { name: 'Create Course', href: '/create-course', icon: 'Plus' },
    { name: 'Sales', href: '/sales', icon: 'TrendingUp' },
    { name: 'Students', href: '/students', icon: 'Users' },
    { name: 'Settings', href: '/settings', icon: 'Settings' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-purple rounded-lg flex items-center justify-center">
                  <ApperIcon name="GraduationCap" size={24} className="text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-display font-bold text-gray-900">
                    SkillBites
                  </h1>
                  <p className="text-sm text-gray-600">Course Creator</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ApperIcon name="X" size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-r-2 border-primary'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                    }`
                  }
                >
                  <ApperIcon name={item.icon} size={18} />
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Bottom Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <ApperIcon name="Star" size={18} className="text-accent" />
                  <span className="font-medium text-gray-900">Go Premium</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Unlock advanced features and analytics
                </p>
                <button className="w-full bg-gradient-purple text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200">
                  Upgrade Now
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
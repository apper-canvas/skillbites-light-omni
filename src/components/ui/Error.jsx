import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry,
  title = "Oops! Something went wrong",
  type = "general"
}) => {
  const getErrorIcon = () => {
    switch (type) {
      case 'network':
        return 'WifiOff';
      case 'notFound':
        return 'Search';
      case 'permission':
        return 'Lock';
      default:
        return 'AlertTriangle';
    }
  };

  const getErrorTitle = () => {
    switch (type) {
      case 'network':
        return "Connection Problem";
      case 'notFound':
        return "Not Found";
      case 'permission':
        return "Access Denied";
      default:
        return title;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon 
          name={getErrorIcon()} 
          size={40} 
          className="text-red-500"
        />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-display font-bold text-gray-900 mb-3"
      >
        {getErrorTitle()}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 max-w-md leading-relaxed"
      >
        {message}
      </motion.p>

      {onRetry && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onRetry}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="RefreshCw" size={18} />
          Try Again
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-sm text-gray-500"
      >
        If the problem persists, please contact support.
      </motion.div>
    </motion.div>
  );
};

export default Error;
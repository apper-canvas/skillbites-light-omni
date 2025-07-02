import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue,
  color = 'primary',
  className = '' 
}) => {
  const getColorStyles = () => {
    switch (color) {
      case 'primary':
        return 'from-primary/10 to-primary/5 text-primary';
      case 'accent':
        return 'from-accent/10 to-accent/5 text-accent';
      case 'success':
        return 'from-green-100 to-green-50 text-green-600';
      case 'info':
        return 'from-blue-100 to-blue-50 text-blue-600';
      default:
        return 'from-primary/10 to-primary/5 text-primary';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`card ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getColorStyles()} flex items-center justify-center`}>
          <ApperIcon name={icon} size={24} />
        </div>
        
        {trend && trendValue && (
          <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
            <ApperIcon name={getTrendIcon()} size={16} />
            {trendValue}
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-3xl font-display font-bold text-gray-900 mb-1">
          {value}
        </h3>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
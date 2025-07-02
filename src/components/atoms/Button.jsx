import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-purple text-white hover:shadow-lg';
      case 'secondary':
        return 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white';
      case 'accent':
        return 'bg-gradient-amber text-white hover:shadow-lg';
      case 'ghost':
        return 'bg-transparent text-gray-700 hover:bg-gray-100';
      case 'danger':
        return 'bg-red-500 text-white hover:bg-red-600';
      default:
        return 'bg-gradient-purple text-white hover:shadow-lg';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 
        rounded-lg font-medium transition-all duration-200
        ${getVariantStyles()} 
        ${getSizeStyles()}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader" size={18} className="animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <ApperIcon name={icon} size={18} />
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <ApperIcon name={icon} size={18} />
          )}
        </>
      )}
    </motion.button>
  );
};

export default Button;
import ApperIcon from '@/components/ApperIcon';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  icon,
  className = '' 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'primary':
        return 'bg-primary/10 text-primary border border-primary/20';
      case 'secondary':
        return 'bg-gray-100 text-gray-700 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-3 py-1 text-sm';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1 text-sm';
    }
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-medium
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${className}
      `}
    >
      {icon && <ApperIcon name={icon} size={14} />}
      {children}
    </span>
  );
};

export default Badge;
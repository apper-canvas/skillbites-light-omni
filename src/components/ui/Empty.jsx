import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "No items found",
  description = "Get started by creating your first item.",
  icon = "Package",
  actionText = "Create New",
  actionPath = "/create",
  type = "general"
}) => {
  const navigate = useNavigate();

  const getEmptyContent = () => {
    switch (type) {
      case 'courses':
        return {
          title: "No courses yet",
          description: "Start building your educational empire! Create your first mini-course and begin sharing your expertise with the world.",
          icon: "GraduationCap",
          actionText: "Create First Course",
          actionPath: "/create-course"
        };
      case 'students':
        return {
          title: "No students enrolled",
          description: "Once you publish your courses and students start enrolling, you'll see their progress and activity here.",
          icon: "Users",
          actionText: "View Courses",
          actionPath: "/courses"
        };
      case 'sales':
        return {
          title: "No sales data",
          description: "Your sales analytics will appear here once students start purchasing your courses.",
          icon: "TrendingUp",
          actionText: "Promote Courses",
          actionPath: "/courses"
        };
      default:
        return { title, description, icon, actionText, actionPath };
    }
  };

  const content = getEmptyContent();

  const handleAction = () => {
    navigate(content.actionPath);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-8 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-8"
      >
        <ApperIcon 
          name={content.icon} 
          size={48} 
          className="text-primary"
        />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-display font-bold text-gray-900 mb-4"
      >
        {content.title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-10 max-w-lg text-lg leading-relaxed"
      >
        {content.description}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={handleAction}
        className="btn-primary text-lg px-8 py-4 flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ApperIcon name="Plus" size={20} />
        {content.actionText}
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex items-center gap-8 text-sm text-gray-500"
      >
        <div className="flex items-center gap-2">
          <ApperIcon name="Zap" size={16} />
          Quick setup
        </div>
        <div className="flex items-center gap-2">
          <ApperIcon name="Star" size={16} />
          Professional quality
        </div>
        <div className="flex items-center gap-2">
          <ApperIcon name="DollarSign" size={16} />
          Start earning
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Empty;
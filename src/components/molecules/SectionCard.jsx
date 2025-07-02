import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const SectionCard = ({ 
  section, 
  index, 
  onEdit, 
  onDelete, 
  onReorder,
  isDragging = false 
}) => {
  const getSectionIcon = (type) => {
    switch (type) {
      case 'video':
        return 'Play';
      case 'pdf':
        return 'FileText';
      case 'quiz':
        return 'HelpCircle';
      default:
        return 'BookOpen';
    }
  };

  const getSectionTypeLabel = (type) => {
    switch (type) {
      case 'video':
        return 'Video Lesson';
      case 'pdf':
        return 'PDF Resource';
      case 'quiz':
        return 'Quiz';
      default:
        return 'Content';
    }
  };

  const getTypeVariant = (type) => {
    switch (type) {
      case 'video':
        return 'primary';
      case 'pdf':
        return 'info';
      case 'quiz':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      className={`
        bg-white rounded-xl p-6 shadow-card border border-gray-100
        ${isDragging ? 'shadow-floating rotate-1' : ''}
      `}
    >
      <div className="flex items-start gap-4">
        {/* Drag Handle */}
        <div className="flex flex-col items-center gap-2 pt-1">
          <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center cursor-grab hover:bg-gray-200 transition-colors">
            <ApperIcon name="GripVertical" size={14} className="text-gray-400" />
          </div>
          <div className="text-xs text-gray-400 font-medium">
            {index + 1}
          </div>
        </div>

        {/* Section Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
          <ApperIcon name={getSectionIcon(section.type)} size={24} className="text-primary" />
        </div>

        {/* Section Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h4 className="font-display font-semibold text-lg text-gray-900 mb-1">
                {section.title}
              </h4>
              <Badge variant={getTypeVariant(section.type)} size="sm">
                {getSectionTypeLabel(section.type)}
              </Badge>
            </div>
          </div>

          {/* Section Details */}
          <div className="space-y-2">
            {section.type === 'video' && section.content?.duration && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ApperIcon name="Clock" size={16} />
                <span>{Math.ceil(section.content.duration / 60)} minutes</span>
              </div>
            )}

            {section.type === 'pdf' && section.content?.pages && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ApperIcon name="FileText" size={16} />
                <span>{section.content.pages} pages</span>
              </div>
            )}

            {section.type === 'quiz' && section.content?.questions && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ApperIcon name="HelpCircle" size={16} />
                <span>{section.content.questions.length} questions</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon="Edit"
            onClick={() => onEdit(section)}
            className="text-gray-600 hover:text-primary"
          />
          <Button
            variant="ghost"
            size="sm"
            icon="Trash2"
            onClick={() => onDelete(section.id)}
            className="text-gray-600 hover:text-red-600"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SectionCard;
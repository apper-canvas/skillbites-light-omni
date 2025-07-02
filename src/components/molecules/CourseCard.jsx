import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const CourseCard = ({ course, onEdit, onDelete, showActions = true }) => {
  const navigate = useNavigate();

  const getStatusVariant = (status) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'archived':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const handleViewCourse = () => {
    navigate(`/courses/${course.Id}`);
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="card cursor-pointer group"
      onClick={handleViewCourse}
    >
      {/* Course Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ApperIcon name="PlayCircle" size={48} className="text-primary/40" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={getStatusVariant(course.status)} size="sm">
            {course.status}
          </Badge>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
            {formatDuration(course.duration)}
          </div>
        </div>
      </div>

      {/* Course Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-display font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mt-1">
            {course.description}
          </p>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <ApperIcon name="Users" size={14} />
              <span>{course.enrollmentCount} students</span>
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="Star" size={14} />
              <span>{course.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="font-semibold text-primary">
            ${course.price}
          </div>
        </div>

        {/* Course Category */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" size="sm">
            {course.category}
          </Badge>
          <div className="text-xs text-gray-400">
            {new Date(course.updatedAt).toLocaleDateString()}
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div 
            className="flex gap-2 pt-3 border-t border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="sm"
              icon="Edit"
              onClick={() => onEdit(course)}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon="Trash2"
              onClick={() => onDelete(course.Id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CourseCard;
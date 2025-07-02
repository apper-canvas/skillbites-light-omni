import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import CourseBuilder from '@/components/organisms/CourseBuilder';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { courseService } from '@/services/api/courseService';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      loadCourse();
    }
  }, [id]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await courseService.getById(parseInt(id));
      setCourse(data);
    } catch (err) {
      setError('Failed to load course. Please try again.');
      console.error('Course detail error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCourse = async (courseData) => {
    try {
      setSaving(true);
      const updatedCourse = await courseService.update(parseInt(id), courseData);
      setCourse(updatedCourse);
      setIsEditing(false);
      toast.success('Course updated successfully!');
    } catch (error) {
      toast.error('Failed to update course. Please try again.');
      console.error('Update course error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePublishCourse = async () => {
    if (!course.sections || course.sections.length === 0) {
      toast.warning('Please add at least one section before publishing.');
      return;
    }

    if (!course.title || !course.description || !course.price) {
      toast.warning('Please fill in all required course information.');
      return;
    }

    try {
      const updatedCourse = await courseService.update(parseInt(id), {
        ...course,
        status: 'published'
      });
      setCourse(updatedCourse);
      toast.success('Course published successfully! 🎉');
    } catch (error) {
      toast.error('Failed to publish course.');
      console.error('Publish error:', error);
    }
  };

  const handleArchiveCourse = async () => {
    if (window.confirm('Are you sure you want to archive this course?')) {
      try {
        const updatedCourse = await courseService.update(parseInt(id), {
          ...course,
          status: 'archived'
        });
        setCourse(updatedCourse);
        toast.info('Course archived.');
      } catch (error) {
        toast.error('Failed to archive course.');
        console.error('Archive error:', error);
      }
    }
  };

  const handlePreviewCourse = (courseData) => {
    console.log('Preview course:', courseData);
    toast.info('Course preview feature coming soon!');
  };

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

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  if (loading) return <Loading type="form" />;
  if (error) return <Error message={error} onRetry={loadCourse} />;
  if (!course) return <Error message="Course not found" type="notFound" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            icon="ArrowLeft"
            onClick={() => navigate('/courses')}
            size="sm"
          />
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-display font-bold text-gray-900">
                {course.title || 'Untitled Course'}
              </h1>
              <Badge variant={getStatusVariant(course.status)}>
                {course.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <ApperIcon name="Users" size={16} />
                <span>{course.enrollmentCount} students</span>
              </div>
              <div className="flex items-center gap-1">
                <ApperIcon name="Star" size={16} />
                <span>{course.rating.toFixed(1)} rating</span>
              </div>
              <div className="flex items-center gap-1">
                <ApperIcon name="Clock" size={16} />
                <span>{formatDuration(course.duration)}</span>
              </div>
              <div className="flex items-center gap-1">
                <ApperIcon name="DollarSign" size={16} />
                <span>${course.price}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isEditing && (
            <>
              <Button
                variant="ghost"
                icon="Eye"
                onClick={() => handlePreviewCourse(course)}
              >
                Preview
              </Button>
              
              {course.status === 'draft' && (
                <Button
                  variant="accent"
                  icon="Upload"
                  onClick={handlePublishCourse}
                >
                  Publish Course
                </Button>
              )}
              
              {course.status === 'published' && (
                <Button
                  variant="ghost"
                  icon="Archive"
                  onClick={handleArchiveCourse}
                >
                  Archive
                </Button>
              )}
              
              <Button
                variant="primary"
                icon="Edit"
                onClick={() => setIsEditing(true)}
              >
                Edit Course
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Course Stats */}
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <ApperIcon name="Users" size={24} className="text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">
                {course.enrollmentCount}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Total Students</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <ApperIcon name="DollarSign" size={24} className="text-green-500" />
              <span className="text-2xl font-bold text-gray-900">
                ${(course.enrollmentCount * course.price).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Total Revenue</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <ApperIcon name="Star" size={24} className="text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">
                {course.rating.toFixed(1)}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Average Rating</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <ApperIcon name="BookOpen" size={24} className="text-purple-500" />
              <span className="text-2xl font-bold text-gray-900">
                {course.sections?.length || 0}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Course Sections</p>
          </div>
        </div>
      )}

      {/* Course Content */}
      {isEditing ? (
        <CourseBuilder
          course={course}
          onSave={handleSaveCourse}
          onPreview={handlePreviewCourse}
        />
      ) : (
        <div className="space-y-8">
          {/* Course Information */}
          <div className="card">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">
              Course Overview
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {course.description || 'No description provided.'}
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Category</h4>
                  <Badge variant="secondary">{course.category}</Badge>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Pricing</h4>
                  <p className="text-2xl font-bold text-primary">
                    ${course.price} {course.currency}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Last Updated</h4>
                  <p className="text-gray-600">
                    {new Date(course.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Sections */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-gray-900">
                Course Content ({course.sections?.length || 0} sections)
              </h2>
            </div>

            {!course.sections || course.sections.length === 0 ? (
              <div className="text-center py-12">
                <ApperIcon name="BookOpen" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No content added yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start building your course by adding sections.
                </p>
                <Button
                  variant="primary"
                  icon="Edit"
                  onClick={() => setIsEditing(true)}
                >
                  Add Content
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {course.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section, index) => (
                    <div
                      key={section.id}
                      className="bg-gray-50 rounded-lg p-4 flex items-center gap-4"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-medium text-sm">
                          {index + 1}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {section.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge variant="secondary" size="sm">
                            {section.type}
                          </Badge>
                          {section.type === 'video' && section.content?.duration && (
                            <span className="text-sm text-gray-600">
                              {Math.ceil(section.content.duration / 60)} min
                            </span>
                          )}
                          {section.type === 'quiz' && section.content?.questions && (
                            <span className="text-sm text-gray-600">
                              {section.content.questions.length} questions
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Save Indicator */}
      {saving && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-floating p-4 flex items-center gap-3">
          <ApperIcon name="Loader" size={20} className="text-primary animate-spin" />
          <span className="text-gray-700">Saving changes...</span>
        </div>
      )}
    </motion.div>
  );
};

export default CourseDetailPage;
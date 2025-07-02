import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import CourseBuilder from '@/components/organisms/CourseBuilder';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { courseService } from '@/services/api/courseService';

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const handleSaveCourse = async (courseData) => {
    try {
      setSaving(true);
      
      // Prepare course data
      const newCourse = {
        ...courseData,
        status: 'draft',
        enrollmentCount: 0,
        rating: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const savedCourse = await courseService.create(newCourse);
      
      toast.success('Course created successfully!');
      navigate(`/courses/${savedCourse.Id}`);
    } catch (error) {
      toast.error('Failed to create course. Please try again.');
      console.error('Create course error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePreviewCourse = (courseData) => {
    console.log('Preview course:', courseData);
    toast.info('Course preview feature coming soon!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Create New Course
          </h1>
          <p className="text-gray-600 mt-2">
            Build your mini-course with videos, PDFs, and quizzes
          </p>
        </div>
        
        <Button
          variant="ghost"
          icon="ArrowLeft"
          onClick={() => navigate('/courses')}
        >
          Back to Courses
        </Button>
      </div>

      {/* Course Creation Steps */}
      <div className="mb-8">
        <div className="bg-white rounded-xl p-6 shadow-card">
          <h2 className="font-display font-semibold text-lg text-gray-900 mb-4">
            Getting Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Course Info</h3>
                <p className="text-sm text-gray-600">
                  Add title, description, pricing, and category
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Add Content</h3>
                <p className="text-sm text-gray-600">
                  Upload videos, PDFs, and create quizzes
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Publish</h3>
                <p className="text-sm text-gray-600">
                  Review, preview, and publish your course
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Card */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-6 border border-accent/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-dark rounded-lg flex items-center justify-center flex-shrink-0">
              <ApperIcon name="Lightbulb" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-gray-900 mb-2">
                💡 Pro Tips for Success
              </h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Keep videos under 10 minutes for better engagement</li>
                <li>Include downloadable resources to add value</li>
                <li>Add quizzes to test knowledge retention</li>
                <li>Write clear, compelling descriptions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Course Builder */}
      <CourseBuilder
        onSave={handleSaveCourse}
        onPreview={handlePreviewCourse}
      />

      {/* Save Indicator */}
      {saving && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-floating p-4 flex items-center gap-3">
          <ApperIcon name="Loader" size={20} className="text-primary animate-spin" />
          <span className="text-gray-700">Saving course...</span>
        </div>
      )}
    </motion.div>
  );
};

export default CreateCoursePage;
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import SectionCard from '@/components/molecules/SectionCard';
import SectionEditor from './SectionEditor';

const CourseBuilder = ({ course, onSave, onPreview }) => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'USD',
    category: '',
    thumbnail: '',
    sections: [],
    ...course
  });

  const [editingSection, setEditingSection] = useState(null);
  const [showSectionEditor, setShowSectionEditor] = useState(false);

  const categories = [
    'Technology', 'Business', 'Creative', 'Marketing', 
    'Design', 'Development', 'Photography', 'Writing'
  ];

  const handleInputChange = (field, value) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSection = (type) => {
    const newSection = {
      id: Date.now().toString(),
      type,
      title: '',
      order: courseData.sections.length,
      content: {}
    };
    setEditingSection(newSection);
    setShowSectionEditor(true);
  };

  const handleEditSection = (section) => {
    setEditingSection(section);
    setShowSectionEditor(true);
  };

  const handleSaveSection = (sectionData) => {
    if (editingSection.id && courseData.sections.find(s => s.id === editingSection.id)) {
      // Update existing section
      setCourseData(prev => ({
        ...prev,
        sections: prev.sections.map(s => 
          s.id === editingSection.id ? sectionData : s
        )
      }));
    } else {
      // Add new section
      setCourseData(prev => ({
        ...prev,
        sections: [...prev.sections, sectionData]
      }));
    }
    
    setShowSectionEditor(false);
    setEditingSection(null);
  };

  const handleDeleteSection = (sectionId) => {
    setCourseData(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId)
    }));
  };

  const handleReorderSections = (fromIndex, toIndex) => {
    const sections = [...courseData.sections];
    const [movedSection] = sections.splice(fromIndex, 1);
    sections.splice(toIndex, 0, movedSection);
    
    // Update order property
    const reorderedSections = sections.map((section, index) => ({
      ...section,
      order: index
    }));

    setCourseData(prev => ({
      ...prev,
      sections: reorderedSections
    }));
  };

  const calculateDuration = () => {
    return courseData.sections.reduce((total, section) => {
      if (section.type === 'video' && section.content?.duration) {
        return total + section.content.duration;
      }
      return total;
    }, 0);
  };

  const handleSave = () => {
    const courseToSave = {
      ...courseData,
      duration: calculateDuration(),
      updatedAt: new Date().toISOString()
    };
    onSave(courseToSave);
  };

  return (
    <div className="space-y-8">
      {/* Course Basic Info */}
      <div className="card">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
          Course Information
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input
            label="Course Title"
            placeholder="Enter course title"
            value={courseData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={courseData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="input-field"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe what students will learn..."
              value={courseData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="input-field resize-none"
            />
          </div>
          
          <Input
            label="Price"
            type="number"
            placeholder="0.00"
            value={courseData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            icon="DollarSign"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={courseData.currency}
              onChange={(e) => handleInputChange('currency', e.target.value)}
              className="input-field"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course Sections */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-gray-900">
            Course Content
          </h2>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              icon="Play"
              onClick={() => handleAddSection('video')}
            >
              Add Video
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon="FileText"
              onClick={() => handleAddSection('pdf')}
            >
              Add PDF
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon="HelpCircle"
              onClick={() => handleAddSection('quiz')}
            >
              Add Quiz
            </Button>
          </div>
        </div>

        {courseData.sections.length === 0 ? (
          <div className="text-center py-12">
            <ApperIcon name="BookOpen" size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No content yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start building your course by adding video lessons, PDF resources, or quizzes.
            </p>
            <div className="flex justify-center gap-2">
              <Button
                variant="primary"
                size="sm"
                icon="Play"
                onClick={() => handleAddSection('video')}
              >
                Add Video
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon="FileText"
                onClick={() => handleAddSection('pdf')}
              >
                Add PDF
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {courseData.sections
                .sort((a, b) => a.order - b.order)
                .map((section, index) => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    index={index}
                    onEdit={handleEditSection}
                    onDelete={handleDeleteSection}
                    onReorder={handleReorderSections}
                  />
                ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {courseData.sections.length} sections • {Math.ceil(calculateDuration() / 60)} minutes total
        </div>
        
        <div className="flex gap-4">
          <Button
            variant="secondary"
            icon="Eye"
            onClick={() => onPreview(courseData)}
          >
            Preview Course
          </Button>
          <Button
            variant="primary"
            icon="Save"
            onClick={handleSave}
          >
            Save Course
          </Button>
        </div>
      </div>

      {/* Section Editor Modal */}
      <AnimatePresence>
        {showSectionEditor && (
          <SectionEditor
            section={editingSection}
            onSave={handleSaveSection}
            onCancel={() => {
              setShowSectionEditor(false);
              setEditingSection(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseBuilder;
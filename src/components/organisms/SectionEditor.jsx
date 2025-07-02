import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

const SectionEditor = ({ section, onSave, onCancel }) => {
  const [sectionData, setSectionData] = useState({
    title: '',
    type: 'video',
    content: {},
    ...section
  });

  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    if (section?.type === 'quiz' && section?.content?.questions) {
      setQuizQuestions(section.content.questions);
    }
  }, [section]);

  const handleInputChange = (field, value) => {
    setSectionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContentChange = (field, value) => {
    setSectionData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }));
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      question: '',
      type: 'multiple',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1
    };
    setQuizQuestions(prev => [...prev, newQuestion]);
  };

  const handleQuestionChange = (questionId, field, value) => {
    setQuizQuestions(prev =>
      prev.map(q =>
        q.id === questionId ? { ...q, [field]: value } : q
      )
    );
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuizQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              )
            }
          : q
      )
    );
  };

  const handleDeleteQuestion = (questionId) => {
    setQuizQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const handleSave = () => {
    let finalSectionData = { ...sectionData };

    if (sectionData.type === 'quiz') {
      finalSectionData.content = {
        ...finalSectionData.content,
        questions: quizQuestions
      };
    }

    onSave(finalSectionData);
  };

  const renderVideoEditor = () => (
    <div className="space-y-4">
      <Input
        label="Video File URL"
        placeholder="https://example.com/video.mp4"
        value={sectionData.content.url || ''}
        onChange={(e) => handleContentChange('url', e.target.value)}
        icon="Link"
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Duration (seconds)"
          type="number"
          placeholder="0"
          value={sectionData.content.duration || ''}
          onChange={(e) => handleContentChange('duration', parseInt(e.target.value) || 0)}
          icon="Clock"
        />
        
        <Input
          label="Thumbnail URL"
          placeholder="https://example.com/thumb.jpg"
          value={sectionData.content.thumbnail || ''}
          onChange={(e) => handleContentChange('thumbnail', e.target.value)}
          icon="Image"
        />
      </div>
    </div>
  );

  const renderPDFEditor = () => (
    <div className="space-y-4">
      <Input
        label="PDF File URL"
        placeholder="https://example.com/document.pdf"
        value={sectionData.content.url || ''}
        onChange={(e) => handleContentChange('url', e.target.value)}
        icon="Link"
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Number of Pages"
          type="number"
          placeholder="0"
          value={sectionData.content.pages || ''}
          onChange={(e) => handleContentChange('pages', parseInt(e.target.value) || 0)}
          icon="FileText"
        />
        
        <Input
          label="File Size (MB)"
          type="number"
          step="0.1"
          placeholder="0.0"
          value={sectionData.content.size || ''}
          onChange={(e) => handleContentChange('size', parseFloat(e.target.value) || 0)}
          icon="HardDrive"
        />
      </div>
    </div>
  );

  const renderQuizEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Quiz Questions</h4>
        <Button
          variant="ghost"
          size="sm"
          icon="Plus"
          onClick={handleAddQuestion}
        >
          Add Question
        </Button>
      </div>

      {quizQuestions.length === 0 ? (
        <div className="text-center py-8">
          <ApperIcon name="HelpCircle" size={32} className="text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">No questions yet. Add your first question to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quizQuestions.map((question, questionIndex) => (
            <div key={question.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <h5 className="font-medium text-gray-900">
                  Question {questionIndex + 1}
                </h5>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="Trash2"
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="text-red-600 hover:text-red-700"
                />
              </div>

              <div className="space-y-4">
                <Input
                  label="Question"
                  placeholder="Enter your question..."
                  value={question.question}
                  onChange={(e) => handleQuestionChange(question.id, 'question', e.target.value)}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Type
                    </label>
                    <select
                      value={question.type}
                      onChange={(e) => handleQuestionChange(question.id, 'type', e.target.value)}
                      className="input-field"
                    >
                      <option value="multiple">Multiple Choice</option>
                      <option value="truefalse">True/False</option>
                      <option value="short">Short Answer</option>
                    </select>
                  </div>

                  <Input
                    label="Points"
                    type="number"
                    min="1"
                    value={question.points}
                    onChange={(e) => handleQuestionChange(question.id, 'points', parseInt(e.target.value) || 1)}
                  />
                </div>

                {question.type === 'multiple' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Answer Options
                    </label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => handleQuestionChange(question.id, 'correctAnswer', optionIndex)}
                          className="text-primary focus:ring-primary"
                        />
                        <Input
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(question.id, optionIndex, e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'truefalse' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Correct Answer
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`tf-${question.id}`}
                          checked={question.correctAnswer === 'true'}
                          onChange={() => handleQuestionChange(question.id, 'correctAnswer', 'true')}
                          className="text-primary focus:ring-primary"
                        />
                        True
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`tf-${question.id}`}
                          checked={question.correctAnswer === 'false'}
                          onChange={() => handleQuestionChange(question.id, 'correctAnswer', 'false')}
                          className="text-primary focus:ring-primary"
                        />
                        False
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-floating max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-display font-bold text-gray-900">
            {section?.id ? 'Edit Section' : 'Add Section'}
          </h3>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ApperIcon name="X" size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <Input
              label="Section Title"
              placeholder="Enter section title..."
              value={sectionData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />

            {sectionData.type === 'video' && renderVideoEditor()}
            {sectionData.type === 'pdf' && renderPDFEditor()}
            {sectionData.type === 'quiz' && renderQuizEditor()}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Section
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SectionEditor;
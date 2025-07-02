import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CourseCard from '@/components/molecules/CourseCard';
import SearchFilter from '@/components/molecules/SearchFilter';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { courseService } from '@/services/api/courseService';

const CoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('updatedAt');

  const categories = ['Technology', 'Business', 'Creative', 'Marketing', 'Design', 'Development', 'Photography', 'Writing'];

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    applySort();
  }, [courses, sortBy]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await courseService.getAll();
      setCourses(data);
      setFilteredCourses(data);
    } catch (err) {
      setError('Failed to load courses. Please try again.');
      console.error('Courses error:', err);
    } finally {
      setLoading(false);
    }
  };

  const applySort = () => {
    const sorted = [...filteredCourses].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'price':
          return b.price - a.price;
        case 'enrollmentCount':
          return b.enrollmentCount - a.enrollmentCount;
        case 'rating':
          return b.rating - a.rating;
        case 'updatedAt':
        default:
          return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });
    setFilteredCourses(sorted);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredCourses(courses);
      return;
    }

    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleFilter = ({ category, priceRange }) => {
    let filtered = [...courses];

    if (category) {
      filtered = filtered.filter(course => course.category === category);
    }

    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter(course => {
        const price = course.price;
        const min = priceRange.min ? parseFloat(priceRange.min) : 0;
        const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    setFilteredCourses(filtered);
  };

  const handleEditCourse = (course) => {
    navigate(`/courses/${course.Id}`);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        await courseService.delete(courseId);
        setCourses(courses.filter(c => c.Id !== courseId));
        setFilteredCourses(filteredCourses.filter(c => c.Id !== courseId));
        toast.success('Course deleted successfully');
      } catch (err) {
        toast.error('Failed to delete course');
        console.error('Delete error:', err);
      }
    }
  };

  const handleDuplicateCourse = async (course) => {
    try {
      const duplicatedCourse = {
        ...course,
        title: `${course.title} (Copy)`,
        status: 'draft',
        enrollmentCount: 0,
        rating: 0
      };
      delete duplicatedCourse.Id;
      
      const newCourse = await courseService.create(duplicatedCourse);
      setCourses([newCourse, ...courses]);
      setFilteredCourses([newCourse, ...filteredCourses]);
      toast.success('Course duplicated successfully');
    } catch (err) {
      toast.error('Failed to duplicate course');
      console.error('Duplicate error:', err);
    }
  };

  const getStatusCount = (status) => {
    return courses.filter(course => course.status === status).length;
  };

  if (loading) return <Loading type="cards" count={6} />;
  if (error) return <Error message={error} onRetry={loadCourses} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            My Courses
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and organize your educational content
          </p>
        </div>
        
        <Button
          variant="primary"
          icon="Plus"
          onClick={() => navigate('/create-course')}
        >
          Create Course
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              <p className="text-sm text-gray-600">Total Courses</p>
            </div>
            <ApperIcon name="BookOpen" size={24} className="text-primary" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{getStatusCount('published')}</p>
              <p className="text-sm text-gray-600">Published</p>
            </div>
            <ApperIcon name="CheckCircle" size={24} className="text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">{getStatusCount('draft')}</p>
              <p className="text-sm text-gray-600">Drafts</p>
            </div>
            <ApperIcon name="Edit" size={24} className="text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-600">{getStatusCount('archived')}</p>
              <p className="text-sm text-gray-600">Archived</p>
            </div>
            <ApperIcon name="Archive" size={24} className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        categories={categories}
        searchPlaceholder="Search courses..."
      />

      {/* View Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ApperIcon name="Grid3X3" size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ApperIcon name="List" size={18} />
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            {filteredCourses.length} of {courses.length} courses
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field py-2 px-3 text-sm"
          >
            <option value="updatedAt">Last Updated</option>
            <option value="title">Title</option>
            <option value="price">Price</option>
            <option value="enrollmentCount">Students</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Courses Grid/List */}
      {filteredCourses.length === 0 ? (
        <Empty type="courses" />
      ) : (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }
        `}>
          {filteredCourses.map((course) => (
            viewMode === 'grid' ? (
              <CourseCard
                key={course.Id}
                course={course}
                onEdit={handleEditCourse}
                onDelete={handleDeleteCourse}
              />
            ) : (
              <motion.div
                key={course.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200"
              >
                <div className="flex items-start gap-6">
                  <div className="w-32 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex-shrink-0">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ApperIcon name="PlayCircle" size={24} className="text-primary/40" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-display font-semibold text-gray-900 truncate">
                        {course.title}
                      </h3>
                      <Badge variant={course.status === 'published' ? 'success' : 'warning'}>
                        {course.status}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Users" size={14} />
                        <span>{course.enrollmentCount} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Star" size={14} />
                        <span>{course.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Clock" size={14} />
                        <span>{Math.ceil(course.duration / 60)}m</span>
                      </div>
                      <div className="font-semibold text-primary">
                        ${course.price}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="Eye"
                        onClick={() => navigate(`/courses/${course.Id}`)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="Edit"
                        onClick={() => handleEditCourse(course)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="Copy"
                        onClick={() => handleDuplicateCourse(course)}
                      >
                        Duplicate
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="Trash2"
                        onClick={() => handleDeleteCourse(course.Id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CoursesPage;
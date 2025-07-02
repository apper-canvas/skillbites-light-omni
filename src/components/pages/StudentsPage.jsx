import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/molecules/StatCard';
import SearchFilter from '@/components/molecules/SearchFilter';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { courseService } from '@/services/api/courseService';
import { enrollmentService } from '@/services/api/enrollmentService';

const StudentsPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    loadStudentData();
  }, []);

  useEffect(() => {
    filterEnrollments();
  }, [enrollments, selectedCourse]);

  const loadStudentData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [coursesData, enrollmentsData] = await Promise.all([
        courseService.getAll(),
        enrollmentService.getAll()
      ]);
      
      setCourses(coursesData);
      setEnrollments(enrollmentsData);
    } catch (err) {
      setError('Failed to load student data. Please try again.');
      console.error('Student data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterEnrollments = () => {
    let filtered = [...enrollments];
    
    if (selectedCourse) {
      filtered = filtered.filter(enrollment => 
        enrollment.courseId === parseInt(selectedCourse)
      );
    }

    setFilteredEnrollments(filtered);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      filterEnrollments();
      return;
    }

    const filtered = enrollments.filter(enrollment =>
      enrollment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEnrollments(filtered);
  };

  const calculateStudentStats = () => {
    const totalStudents = new Set(enrollments.map(e => e.studentEmail)).size;
    const totalEnrollments = enrollments.length;
    const completedCourses = enrollments.filter(e => e.completedAt).length;
    const completionRate = totalEnrollments > 0 ? (completedCourses / totalEnrollments) * 100 : 0;
    const averageProgress = enrollments.reduce((sum, e) => sum + e.progress, 0) / totalEnrollments || 0;

    return {
      totalStudents,
      totalEnrollments,
      completionRate: completionRate.toFixed(1),
      averageProgress: averageProgress.toFixed(1)
    };
  };

  const getStudentDetails = (enrollment) => {
    const course = courses.find(c => c.Id === enrollment.courseId);
    return {
      ...enrollment,
      course
    };
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-600 bg-green-100';
    if (progress >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return <Loading type="list" count={8} />;
  if (error) return <Error message={error} onRetry={loadStudentData} />;

  const stats = calculateStudentStats();

  if (enrollments.length === 0) {
    return <Empty type="students" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Students
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor student progress and engagement
          </p>
        </div>
        
        <Button variant="ghost" icon="Download">
          Export Data
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon="Users"
          trend="up"
          trendValue="+12%"
          color="primary"
        />
        <StatCard
          title="Total Enrollments"
          value={stats.totalEnrollments}
          icon="BookOpen"
          trend="up"
          trendValue="+8%"
          color="success"
        />
        <StatCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          icon="CheckCircle"
          trend="up"
          trendValue="+5%"
          color="accent"
        />
        <StatCard
          title="Average Progress"
          value={`${stats.averageProgress}%`}
          icon="TrendingUp"
          trend="up"
          trendValue="+3%"
          color="info"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search students by email..."
              onChange={(e) => handleSearch(e.target.value)}
              className="input-field w-full"
            />
          </div>
          
          <div className="lg:w-64">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="input-field w-full"
            >
              <option value="">All Courses</option>
              {courses.map(course => (
                <option key={course.Id} value={course.Id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-gray-900">
            Student Enrollments ({filteredEnrollments.length})
          </h2>
        </div>

        {filteredEnrollments.length === 0 ? (
          <div className="text-center py-12">
            <ApperIcon name="Users" size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No students found
            </h3>
            <p className="text-gray-600">
              {selectedCourse ? 'No students enrolled in selected course.' : 'No student enrollments yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEnrollments.map((enrollment) => {
              const studentData = getStudentDetails(enrollment);
              return (
                <motion.div
                  key={enrollment.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                        <ApperIcon name="User" size={20} className="text-primary" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {enrollment.studentEmail}
                        </h4>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-sm text-gray-600">
                            Enrolled in: <strong>{studentData.course?.title || 'Unknown Course'}</strong>
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatDate(enrollment.enrolledAt)}
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              Progress
                            </span>
                            <span className={`text-sm font-medium px-2 py-1 rounded-full ${getProgressColor(enrollment.progress)}`}>
                              {enrollment.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${enrollment.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Quiz Scores */}
                        {enrollment.quizScores && Object.keys(enrollment.quizScores).length > 0 && (
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-600">Quiz Scores:</span>
                            {Object.entries(enrollment.quizScores).map(([quizId, score]) => (
                              <Badge key={quizId} variant="secondary" size="sm">
                                Quiz {quizId}: {score}%
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      {enrollment.completedAt && (
                        <Badge variant="success" icon="CheckCircle">
                          Completed
                        </Badge>
                      )}
                      
                      <div className="text-right text-sm text-gray-500">
                        <div>Revenue: <span className="font-semibold text-green-600">${studentData.course?.price || 0}</span></div>
                        {enrollment.completedAt && (
                          <div>Completed: {formatDate(enrollment.completedAt)}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Student Summary by Course */}
      <div className="card">
        <h2 className="text-xl font-display font-bold text-gray-900 mb-6">
          Enrollment Summary by Course
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses
            .filter(course => enrollments.some(e => e.courseId === course.Id))
            .map(course => {
              const courseEnrollments = enrollments.filter(e => e.courseId === course.Id);
              const completedCount = courseEnrollments.filter(e => e.completedAt).length;
              const averageProgress = courseEnrollments.reduce((sum, e) => sum + e.progress, 0) / courseEnrollments.length;
              
              return (
                <div key={course.Id} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 truncate">
                    {course.title}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium">{courseEnrollments.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-medium text-green-600">{completedCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Progress:</span>
                      <span className="font-medium">{averageProgress.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-primary">${(courseEnrollments.length * course.price).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
};

export default StudentsPage;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StatCard from '@/components/molecules/StatCard';
import CourseCard from '@/components/molecules/CourseCard';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { courseService } from '@/services/api/courseService';
import { enrollmentService } from '@/services/api/enrollmentService';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
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
      setError('Failed to load dashboard data. Please try again.');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const totalStudents = enrollments.length;
    const totalRevenue = enrollments.reduce((sum, enrollment) => {
      const course = courses.find(c => c.Id === enrollment.courseId);
      return sum + (course?.price || 0);
    }, 0);
    
    const publishedCourses = courses.filter(c => c.status === 'published').length;
    const completionRate = enrollments.length > 0 
      ? (enrollments.filter(e => e.completedAt).length / enrollments.length) * 100 
      : 0;

    return {
      totalCourses: publishedCourses,
      totalStudents,
      totalRevenue,
      completionRate
    };
  };

  const getRecentCourses = () => {
    return courses
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 6);
  };

  const getRecentEnrollments = () => {
    return enrollments
      .sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt))
      .slice(0, 5)
      .map(enrollment => {
        const course = courses.find(c => c.Id === enrollment.courseId);
        return { ...enrollment, course };
      })
      .filter(e => e.course);
  };

  const handleEditCourse = (course) => {
    navigate(`/courses/${course.Id}`);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.delete(courseId);
        setCourses(courses.filter(c => c.Id !== courseId));
      } catch (err) {
        console.error('Error deleting course:', err);
      }
    }
  };

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  const stats = calculateStats();
  const recentCourses = getRecentCourses();
  const recentEnrollments = getRecentEnrollments();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Published Courses"
          value={stats.totalCourses}
          icon="BookOpen"
          trend="up"
          trendValue="+12%"
          color="primary"
        />
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon="Users"
          trend="up"
          trendValue="+8%"
          color="success"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon="DollarSign"
          trend="up"
          trendValue="+23%"
          color="accent"
        />
        <StatCard
          title="Completion Rate"
          value={`${stats.completionRate.toFixed(1)}%`}
          icon="TrendingUp"
          trend="up"
          trendValue="+5%"
          color="info"
        />
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-display font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            icon="Plus"
            onClick={() => navigate('/create-course')}
          >
            Create New Course
          </Button>
          <Button
            variant="secondary"
            icon="BarChart3"
            onClick={() => navigate('/sales')}
          >
            View Analytics
          </Button>
          <Button
            variant="ghost"
            icon="Users"
            onClick={() => navigate('/students')}
          >
            Manage Students
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Courses */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-gray-900">
              Recent Courses
            </h2>
            <Button
              variant="ghost"
              size="sm"
              icon="ArrowRight"
              onClick={() => navigate('/courses')}
            >
              View All
            </Button>
          </div>

          {recentCourses.length === 0 ? (
            <Empty 
              type="courses"
              title="No courses yet"
              description="Create your first course to get started!"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentCourses.map((course) => (
                <CourseCard
                  key={course.Id}
                  course={course}
                  onEdit={handleEditCourse}
                  onDelete={handleDeleteCourse}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-display font-bold text-gray-900 mb-6">
            Recent Enrollments
          </h2>

          {recentEnrollments.length === 0 ? (
            <div className="card text-center py-8">
              <ApperIcon name="Users" size={32} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No recent enrollments</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentEnrollments.map((enrollment) => (
                <motion.div
                  key={enrollment.Id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-lg p-4 shadow-card border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <ApperIcon name="UserPlus" size={16} className="text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {enrollment.studentEmail}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        Enrolled in "{enrollment.course.title}"
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-600">
                        +${enrollment.course.price}
                      </p>
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1 ml-auto"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
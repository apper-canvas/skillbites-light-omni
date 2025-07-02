import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import StatCard from '@/components/molecules/StatCard';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { courseService } from '@/services/api/courseService';
import { enrollmentService } from '@/services/api/enrollmentService';

const SalesPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('30');

  useEffect(() => {
    loadSalesData();
  }, []);

  const loadSalesData = async () => {
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
      setError('Failed to load sales data. Please try again.');
      console.error('Sales data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateSalesStats = () => {
    const totalRevenue = enrollments.reduce((sum, enrollment) => {
      const course = courses.find(c => c.Id === enrollment.courseId);
      return sum + (course?.price || 0);
    }, 0);

    const totalSales = enrollments.length;
    const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;
    
    // Calculate growth (mock data for demo)
    const previousRevenue = totalRevenue * 0.8; // Mock previous period
    const revenueGrowth = ((totalRevenue - previousRevenue) / previousRevenue) * 100;

    return {
      totalRevenue,
      totalSales,
      averageOrderValue,
      revenueGrowth: revenueGrowth.toFixed(1)
    };
  };

  const getRevenueChartData = () => {
    // Group enrollments by date and calculate daily revenue
    const dailyRevenue = {};
    
    enrollments.forEach(enrollment => {
      const date = new Date(enrollment.enrolledAt).toLocaleDateString();
      const course = courses.find(c => c.Id === enrollment.courseId);
      const revenue = course?.price || 0;
      
      if (dailyRevenue[date]) {
        dailyRevenue[date] += revenue;
      } else {
        dailyRevenue[date] = revenue;
      }
    });

    const sortedDates = Object.keys(dailyRevenue).sort((a, b) => new Date(a) - new Date(b));
    const revenueValues = sortedDates.map(date => dailyRevenue[date]);

    return {
      series: [{
        name: 'Revenue',
        data: revenueValues
      }],
      options: {
        chart: {
          type: 'line',
          height: 350,
          toolbar: { show: false }
        },
        colors: ['#5B4FE8'],
        stroke: {
          curve: 'smooth',
          width: 3
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [0, 90, 100]
          }
        },
        dataLabels: { enabled: false },
        xaxis: {
          categories: sortedDates,
          labels: {
            style: { colors: '#6B7280' }
          }
        },
        yaxis: {
          labels: {
            style: { colors: '#6B7280' },
            formatter: (value) => `$${value}`
          }
        },
        grid: {
          borderColor: '#E5E7EB',
          strokeDashArray: 5
        },
        tooltip: {
          y: {
            formatter: (value) => `$${value}`
          }
        }
      }
    };
  };

  const getTopCourses = () => {
    const courseRevenue = {};
    
    enrollments.forEach(enrollment => {
      const course = courses.find(c => c.Id === enrollment.courseId);
      if (course) {
        if (courseRevenue[course.Id]) {
          courseRevenue[course.Id].revenue += course.price;
          courseRevenue[course.Id].sales += 1;
        } else {
          courseRevenue[course.Id] = {
            course,
            revenue: course.price,
            sales: 1
          };
        }
      }
    });

    return Object.values(courseRevenue)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadSalesData} />;

  const stats = calculateSalesStats();
  const revenueChart = getRevenueChartData();
  const topCourses = getTopCourses();

  if (enrollments.length === 0) {
    return <Empty type="sales" />;
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
            Sales Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Track your course performance and revenue
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field py-2 px-3"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          
          <Button variant="ghost" icon="Download">
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon="DollarSign"
          trend="up"
          trendValue={`+${stats.revenueGrowth}%`}
          color="success"
        />
        <StatCard
          title="Total Sales"
          value={stats.totalSales}
          icon="ShoppingCart"
          trend="up"
          trendValue="+15%"
          color="primary"
        />
        <StatCard
          title="Average Order Value"
          value={`$${stats.averageOrderValue.toFixed(2)}`}
          icon="TrendingUp"
          trend="up"
          trendValue="+8%"
          color="accent"
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          icon="Target"
          trend="up"
          trendValue="+0.5%"
          color="info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-gray-900">
                Revenue Trend
              </h2>
              <Badge variant="success" icon="TrendingUp">
                +{stats.revenueGrowth}%
              </Badge>
            </div>
            
            {revenueChart.series[0].data.length > 0 ? (
              <Chart
                options={revenueChart.options}
                series={revenueChart.series}
                type="line"
                height={350}
              />
            ) : (
              <div className="flex items-center justify-center h-80 text-gray-500">
                <div className="text-center">
                  <ApperIcon name="BarChart3" size={48} className="mx-auto mb-2 opacity-50" />
                  <p>No revenue data available</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Top Performing Courses */}
        <div>
          <div className="card">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-6">
              Top Performing Courses
            </h2>
            
            {topCourses.length === 0 ? (
              <div className="text-center py-8">
                <ApperIcon name="BookOpen" size={32} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No course sales yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topCourses.map((item, index) => (
                  <motion.div
                    key={item.course.Id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-sm">
                        #{index + 1}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {item.course.title}
                      </h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>{item.sales} sales</span>
                        <span className="font-semibold text-green-600">
                          ${item.revenue}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-gray-900">
            Recent Transactions
          </h2>
          <Button variant="ghost" size="sm" icon="ArrowRight">
            View All
          </Button>
        </div>
        
        {enrollments.length === 0 ? (
          <div className="text-center py-8">
            <ApperIcon name="CreditCard" size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No transactions yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Student</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Course</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {enrollments
                  .sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt))
                  .slice(0, 10)
                  .map((enrollment) => {
                    const course = courses.find(c => c.Id === enrollment.courseId);
                    return (
                      <tr key={enrollment.Id} className="border-b border-gray-100">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <ApperIcon name="User" size={14} className="text-primary" />
                            </div>
                            <span className="font-medium text-gray-900">
                              {enrollment.studentEmail}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-gray-900">
                            {course?.title || 'Unknown Course'}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="font-semibold text-green-600">
                            ${course?.price || 0}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-600">
                          {new Date(enrollment.enrolledAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant="success" size="sm">
                            Completed
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SalesPage;
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/organisms/Layout/Layout';
import DashboardPage from '@/components/pages/DashboardPage';
import CoursesPage from '@/components/pages/CoursesPage';
import CreateCoursePage from '@/components/pages/CreateCoursePage';
import CourseDetailPage from '@/components/pages/CourseDetailPage';
import SalesPage from '@/components/pages/SalesPage';
import StudentsPage from '@/components/pages/StudentsPage';
import SettingsPage from '@/components/pages/SettingsPage';

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/create-course" element={<CreateCoursePage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRouter;
import { mockCourses } from '@/services/mockData/courses';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const courseService = {
  async getAll() {
    await delay(300);
    return [...mockCourses];
  },

  async getById(id) {
    await delay(250);
    const course = mockCourses.find(c => c.Id === id);
    if (!course) {
      throw new Error('Course not found');
    }
    return { ...course };
  },

  async create(courseData) {
    await delay(400);
    const maxId = Math.max(...mockCourses.map(c => c.Id), 0);
    const newCourse = {
      ...courseData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockCourses.push(newCourse);
    return { ...newCourse };
  },

  async update(id, courseData) {
    await delay(350);
    const index = mockCourses.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error('Course not found');
    }
    const updatedCourse = {
      ...mockCourses[index],
      ...courseData,
      Id: id,
      updatedAt: new Date().toISOString()
    };
    mockCourses[index] = updatedCourse;
    return { ...updatedCourse };
  },

  async delete(id) {
    await delay(300);
    const index = mockCourses.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error('Course not found');
    }
    mockCourses.splice(index, 1);
    return true;
  }
};
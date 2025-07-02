import { mockEnrollments } from '@/services/mockData/enrollments';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const enrollmentService = {
  async getAll() {
    await delay(250);
    return [...mockEnrollments];
  },

  async getById(id) {
    await delay(200);
    const enrollment = mockEnrollments.find(e => e.Id === id);
    if (!enrollment) {
      throw new Error('Enrollment not found');
    }
    return { ...enrollment };
  },

  async getByCourseId(courseId) {
    await delay(200);
    return mockEnrollments.filter(e => e.courseId === courseId);
  },

  async create(enrollmentData) {
    await delay(300);
    const maxId = Math.max(...mockEnrollments.map(e => e.Id), 0);
    const newEnrollment = {
      ...enrollmentData,
      Id: maxId + 1,
      enrolledAt: new Date().toISOString()
    };
    mockEnrollments.push(newEnrollment);
    return { ...newEnrollment };
  },

  async update(id, enrollmentData) {
    await delay(250);
    const index = mockEnrollments.findIndex(e => e.Id === id);
    if (index === -1) {
      throw new Error('Enrollment not found');
    }
    const updatedEnrollment = {
      ...mockEnrollments[index],
      ...enrollmentData,
      Id: id
    };
    mockEnrollments[index] = updatedEnrollment;
    return { ...updatedEnrollment };
  },

  async delete(id) {
    await delay(200);
    const index = mockEnrollments.findIndex(e => e.Id === id);
    if (index === -1) {
      throw new Error('Enrollment not found');
    }
    mockEnrollments.splice(index, 1);
    return true;
  }
};
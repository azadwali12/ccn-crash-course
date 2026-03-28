import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ user_id: '', course_id: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [enrollRes, coursesRes, usersRes] = await Promise.all([
        api.get('/enrollments'),
        api.get('/courses'),
        api.get('/users'),
      ]);
      setEnrollments(enrollRes.data);
      setCourses(coursesRes.data);
      setUsers(usersRes.data);
      setError('');
    } catch {
      setError('Failed to load enrollments. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCourseTitle = (courseId) => {
    const course = courses.find((c) => String(c.id) === String(courseId));
    return course ? course.title || course.name : `Course #${courseId}`;
  };

  const getUserName = (userId) => {
    const user = users.find((u) => String(u.id) === String(userId));
    return user ? user.name || user.username || user.email : `User #${userId}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/enrollments', form);
      setShowModal(false);
      setForm({ user_id: '', course_id: '' });
      fetchData();
    } catch {
      alert('Failed to enroll. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Enrollments</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Enroll Student
        </button>
      </div>

      {error && <div className="error-box">⚠️ {error}</div>}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner" />
          Loading enrollments…
        </div>
      ) : enrollments.length === 0 ? (
        <div className="empty-state">
          <h3>No enrollments yet</h3>
          <p>Enroll students in courses to get started.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Course</th>
                <th>Enrolled At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment, idx) => (
                <tr key={enrollment.id}>
                  <td>{idx + 1}</td>
                  <td><strong>{getUserName(enrollment.user_id)}</strong></td>
                  <td>
                    <span className="badge badge-blue">
                      {getCourseTitle(enrollment.course_id)}
                    </span>
                  </td>
                  <td>
                    {enrollment.enrolled_at || enrollment.created_at
                      ? new Date(enrollment.enrolled_at || enrollment.created_at).toLocaleDateString()
                      : '—'}
                  </td>
                  <td>
                    <span className="badge badge-green">
                      {enrollment.status || 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Enroll Student</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Student *</label>
                <select
                  value={form.user_id}
                  onChange={(e) => setForm({ ...form, user_id: e.target.value })}
                  required
                >
                  <option value="">Select a student</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name || u.username || u.email || `User #${u.id}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Course *</label>
                <select
                  value={form.course_id}
                  onChange={(e) => setForm({ ...form, course_id: e.target.value })}
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title || c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Enrolling…' : 'Enroll'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const EnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ studentName: '', email: '', courseId: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollRes, courseRes] = await Promise.all([
          api.get('/enrollments'),
          api.get('/courses'),
        ]);
        setEnrollments(enrollRes.data);
        setCourses(courseRes.data);
      } catch (err) {
        setError('Failed to load enrollments. Make sure the backend is running at http://localhost:5000.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentName || !form.email || !form.courseId) return;
    setSubmitting(true);
    try {
      const res = await api.post('/enrollments', form);
      setEnrollments((prev) => [...prev, res.data]);
      setSuccess(`✅ ${form.studentName} has been enrolled successfully!`);
      setForm({ studentName: '', email: '', courseId: '' });
      setShowModal(false);
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError('Failed to enroll student. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const statusBadge = (status) => {
    const map = { active: 'success', completed: 'info', pending: 'warning' };
    return <span className={`badge badge-${map[status] || 'secondary'}`}>{status}</span>;
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading enrollments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Connection Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👥 Enrollments</h1>
        <p>Manage student course enrollments</p>
      </div>

      {success && (
        <div className="success-banner">
          {success}
        </div>
      )}

      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <span className="badge badge-secondary">{enrollments.length} enrollments</span>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Enroll Student
        </button>
      </div>

      {enrollments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No enrollments yet. Enroll the first student!</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Email</th>
                <th>Course</th>
                <th>Enrolled</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{enrollment.id}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {enrollment.studentName || enrollment.name}
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{enrollment.email}</td>
                  <td>
                    {enrollment.courseName ? (
                      <span className="badge badge-primary">{enrollment.courseName}</span>
                    ) : '—'}
                  </td>
                  <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {enrollment.enrolledAt ? `📅 ${enrollment.enrolledAt}` : '—'}
                  </td>
                  <td>{statusBadge(enrollment.status || 'active')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2>Enroll New Student</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Student Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter student's full name"
                  value={form.studentName}
                  onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="student@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Select Course</label>
                <select
                  className="form-select"
                  value={form.courseId}
                  onChange={(e) => setForm({ ...form, courseId: e.target.value })}
                  required
                >
                  <option value="">Choose a course...</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Enrolling...' : 'Enroll Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentsPage;

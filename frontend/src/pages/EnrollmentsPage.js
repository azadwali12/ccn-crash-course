import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/enrollments`);
      setEnrollments(response.data);
    } catch (err) {
      setError('Failed to fetch enrollments. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (!status) return '';
    const s = status.toLowerCase();
    if (s === 'active') return 'status-badge status-active';
    if (s === 'inactive') return 'status-badge status-inactive';
    return 'status-badge status-pending';
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Student Enrollments</h2>
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading enrollments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h2>Student Enrollments</h2>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-text">{error}</p>
        </div>
      </div>
    );
  }

  if (enrollments.length === 0) {
    return (
      <div className="page">
        <h2>Student Enrollments</h2>
        <div className="empty-container">
          <div className="empty-icon">📭</div>
          <p className="empty-text">No enrollments found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Student Enrollments</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Course ID</th>
              <th>Enrollment Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.enrollment_id}>
                <td>{enrollment.enrollment_id}</td>
                <td>{enrollment.user_id}</td>
                <td>{enrollment.course_id}</td>
                <td>{enrollment.enrolled_at ? new Date(enrollment.enrolled_at).toLocaleDateString() : '—'}</td>
                <td>
                  <span className={getStatusClass(enrollment.status)}>
                    {enrollment.status || '—'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnrollmentsPage;

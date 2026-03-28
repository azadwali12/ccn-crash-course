import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api';

function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        setError('Failed to fetch course details. The course may not exist.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <button onClick={() => navigate('/courses')} className="btn-back">← Back to Courses</button>
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <button onClick={() => navigate('/courses')} className="btn-back">← Back to Courses</button>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-text">{error}</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="page">
        <button onClick={() => navigate('/courses')} className="btn-back">← Back to Courses</button>
        <div className="empty-container">
          <div className="empty-icon">🔍</div>
          <p className="empty-text">Course not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <button onClick={() => navigate('/courses')} className="btn-back">← Back to Courses</button>
      <div className="details-card">
        <h2>{course.course_name}</h2>
        <p className="details-subtitle">Course ID: {course.course_id}</p>
        <div className="details-grid">
          <div className="detail-item">
            <div className="label">Instructor</div>
            <div className="value">{course.instructor}</div>
          </div>
          <div className="detail-item">
            <div className="label">Description</div>
            <div className="value">{course.description}</div>
          </div>
          {course.created_at && (
            <div className="detail-item">
              <div className="label">Created At</div>
              <div className="value">{new Date(course.created_at).toLocaleDateString()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lessons`);
      setLessons(response.data);
    } catch (err) {
      setError('Failed to fetch lessons. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>All Lessons</h2>
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading lessons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h2>All Lessons</h2>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-text">{error}</p>
        </div>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="page">
        <h2>All Lessons</h2>
        <div className="empty-container">
          <div className="empty-icon">📭</div>
          <p className="empty-text">No lessons found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>All Lessons</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Duration (mins)</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.lesson_id}>
                <td>{lesson.lesson_id}</td>
                <td>{lesson.course_id}</td>
                <td>{lesson.title}</td>
                <td>{lesson.content ? `${lesson.content.substring(0, 80)}...` : '—'}</td>
                <td>{lesson.duration_minutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LessonsPage;

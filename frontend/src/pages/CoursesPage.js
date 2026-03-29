import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data);
        setFiltered(res.data);
      } catch (err) {
        setError('Failed to load courses. Make sure the backend is running at http://localhost:5000.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          (c.level && c.level.toLowerCase().includes(q))
      )
    );
  }, [search, courses]);

  const levelClass = (level) => {
    const map = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' };
    return `badge badge-${map[level] || 'secondary'}`;
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading courses...</p>
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
        <h1>📚 All Courses</h1>
        <p>Browse our comprehensive collection of computer networking courses</p>
      </div>

      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search courses, instructors, levels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="badge badge-secondary">{filtered.length} courses</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No courses found matching "{search}"</p>
        </div>
      ) : (
        <div className="card-grid">
          {filtered.map((course) => (
            <div key={course.id} className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">{course.title}</div>
                  <div className="card-subtitle">👤 {course.instructor}</div>
                </div>
                <div className="card-icon">📡</div>
              </div>
              <div className="card-body">{course.description}</div>
              <div className="card-footer">
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className={levelClass(course.level)}>{course.level}</span>
                  {course.duration && (
                    <span className="badge badge-info">⏱ {course.duration}</span>
                  )}
                </div>
                <Link to={`/courses/${course.id}`} className="btn btn-primary btn-sm">
                  View →
                </Link>
              </div>
              {course.students !== undefined && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  👥 {course.students} students enrolled
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;

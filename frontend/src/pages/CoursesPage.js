import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const COURSE_COLORS = [
  'linear-gradient(135deg, #6c63ff 0%, #3ecfdc 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
];

const COURSE_ICONS = ['📡', '🔒', '🔀', '📶', '☁️', '🔧'];

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All');

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
      courses.filter((c) => {
        const matchSearch =
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          (c.level && c.level.toLowerCase().includes(q));
        const matchLevel = level === 'All' || c.level === level;
        return matchSearch && matchLevel;
      })
    );
  }, [search, level, courses]);

  const levelClass = (lv) => {
    const map = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' };
    return `badge badge-${map[lv] || 'secondary'}`;
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

      <div className="filter-bar">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search courses, instructors, levels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="level-filters">
          {LEVELS.map((lv) => (
            <button
              key={lv}
              className={`level-filter-btn ${level === lv ? 'active' : ''}`}
              onClick={() => setLevel(lv)}
            >
              {lv}
            </button>
          ))}
        </div>
        <span className="badge badge-secondary">{filtered.length} courses</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No courses found matching your filters</p>
        </div>
      ) : (
        <div className="card-grid">
          {filtered.map((course, idx) => (
            <div key={course.id} className="card course-card">
              <div
                className="course-card-banner"
                style={{ background: COURSE_COLORS[idx % COURSE_COLORS.length] }}
              >
                <span className="course-card-icon">{COURSE_ICONS[idx % COURSE_ICONS.length]}</span>
                <span className={levelClass(course.level)}>{course.level}</span>
              </div>
              <div className="card-body-pad">
                <div className="card-title">{course.title}</div>
                <div className="card-subtitle">👤 {course.instructor}</div>
                <div className="card-body" style={{ marginTop: '0.5rem' }}>{course.description}</div>
              </div>
              <div className="card-footer">
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {course.duration && (
                    <span className="badge badge-info">⏱ {course.duration}</span>
                  )}
                  {course.students !== undefined && (
                    <span className="badge badge-secondary">👥 {course.students}</span>
                  )}
                </div>
                <Link to={`/courses/${course.id}`} className="btn btn-primary btn-sm">
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;

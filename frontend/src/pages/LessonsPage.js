import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const LessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await api.get('/lessons');
        setLessons(res.data);
        setFiltered(res.data);
      } catch (err) {
        setError('Failed to load lessons. Make sure the backend is running at http://localhost:5000.');
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      lessons.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          (l.courseName && l.courseName.toLowerCase().includes(q))
      )
    );
  }, [search, lessons]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading lessons...</p>
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
        <h1>🎓 Lessons</h1>
        <p>Browse all available lessons across every course</p>
      </div>

      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search lessons or courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="badge badge-secondary">{filtered.length} lessons</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No lessons found</p>
        </div>
      ) : (
        <div className="card-grid">
          {filtered.map((lesson, index) => (
            <div key={lesson.id} className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">{lesson.title}</div>
                  {lesson.courseName && (
                    <div className="card-subtitle">📚 {lesson.courseName}</div>
                  )}
                </div>
                <div
                  style={{
                    minWidth: '40px',
                    height: '40px',
                    background: 'var(--gradient-primary)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'white',
                    flexShrink: 0,
                  }}
                >
                  {lesson.order || index + 1}
                </div>
              </div>
              {lesson.content && (
                <div className="card-body">{lesson.content}</div>
              )}
              <div className="card-footer">
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {lesson.duration && (
                    <span className="badge badge-info">⏱ {lesson.duration}</span>
                  )}
                </div>
                {lesson.courseId && (
                  <Link to={`/courses/${lesson.courseId}`} className="btn btn-outline btn-sm">
                    View Course
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonsPage;

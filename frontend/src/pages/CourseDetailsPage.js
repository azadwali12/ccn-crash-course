import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        setError('Course not found or server is unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="page-container">
        <Link to="/courses" className="back-btn">← Back to Courses</Link>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Course Not Found</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const levelClass = (level) => {
    const map = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' };
    return `badge badge-${map[level] || 'secondary'}`;
  };

  return (
    <div className="page-container">
      <Link to="/courses" className="back-btn">← Back to Courses</Link>

      <div className="course-detail-hero">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="card-icon" style={{ width: '56px', height: '56px', fontSize: '1.5rem' }}>📡</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {course.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1rem' }}>
              {course.description}
            </p>
            <div className="course-meta">
              <span className="meta-item">👤 {course.instructor}</span>
              {course.duration && <span className="meta-item">⏱ {course.duration}</span>}
              {course.level && <span className={levelClass(course.level)}>{course.level}</span>}
              {course.students !== undefined && (
                <span className="meta-item">👥 {course.students} students</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        <div className="section">
          <div className="section-header">
            <h2>🎓 Lessons</h2>
            <span className="badge badge-primary">{course.lessons ? course.lessons.length : 0}</span>
          </div>
          {!course.lessons || course.lessons.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>No lessons available yet</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {course.lessons.map((lesson, index) => (
                <div key={lesson.id} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      minWidth: '32px',
                      height: '32px',
                      background: 'var(--gradient-primary)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'white',
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                        {lesson.title}
                      </div>
                      {lesson.content && (
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                          {lesson.content}
                        </div>
                      )}
                      {lesson.duration && (
                        <span className="badge badge-info" style={{ marginTop: '0.5rem' }}>
                          ⏱ {lesson.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="section">
          <div className="section-header">
            <h2>📝 Assignments</h2>
            <span className="badge badge-primary">{course.assignments ? course.assignments.length : 0}</span>
          </div>
          {!course.assignments || course.assignments.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>No assignments available yet</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {course.assignments.map((assignment) => (
                <div key={assignment.id} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    {assignment.title}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                    {assignment.description}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {assignment.dueDate && (
                      <span className="badge badge-warning">📅 {assignment.dueDate}</span>
                    )}
                    {assignment.points && (
                      <span className="badge badge-success">🏆 {assignment.points} pts</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;

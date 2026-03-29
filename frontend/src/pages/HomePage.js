import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const HomePage = () => {
  const [stats, setStats] = useState({ courses: 0, lessons: 0, assignments: 0, enrollments: 0 });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, lessonsRes, assignmentsRes, enrollmentsRes] = await Promise.all([
          api.get('/courses'),
          api.get('/lessons'),
          api.get('/assignments'),
          api.get('/enrollments'),
        ]);
        setStats({
          courses: coursesRes.data.length,
          lessons: lessonsRes.data.length,
          assignments: assignmentsRes.data.length,
          enrollments: enrollmentsRes.data.length,
        });
        setRecentCourses(coursesRes.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const features = [
    '🖥️ Interactive Labs',
    '📡 Network Simulations',
    '🎥 Video Tutorials',
    '🏆 Certifications',
    '📊 Progress Tracking',
    '🤝 Community Forum',
  ];

  const levelClass = (level) => {
    if (!level) return '';
    const map = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' };
    return `badge badge-${map[level] || 'secondary'}`;
  };

  return (
    <div className="page-container">
      <div className="hero">
        <h1>Welcome to CCN Crash Course</h1>
        <p>
          Master computer networking from fundamentals to advanced concepts with our
          expertly crafted curriculum, hands-on labs, and real-world simulations.
        </p>
        <div className="hero-features">
          {features.map((f) => (
            <span key={f} className="feature-chip">{f}</span>
          ))}
        </div>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/courses" className="btn btn-primary">Explore Courses →</Link>
          <Link to="/enrollments" className="btn btn-outline">Enroll Now</Link>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-value">{stats.courses}</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎓</div>
              <div className="stat-value">{stats.lessons}</div>
              <div className="stat-label">Lessons</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-value">{stats.assignments}</div>
              <div className="stat-label">Assignments</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">{stats.enrollments}</div>
              <div className="stat-label">Enrollments</div>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <h2>🔥 Featured Courses</h2>
              <Link to="/courses" className="btn btn-outline btn-sm">View All</Link>
            </div>
            <div className="card-grid">
              {recentCourses.map((course) => (
                <div key={course.id} className="card">
                  <div className="card-header">
                    <div>
                      <div className="card-title">{course.title}</div>
                      <div className="card-subtitle">by {course.instructor}</div>
                    </div>
                    <div className="card-icon">📡</div>
                  </div>
                  <div className="card-body">{course.description}</div>
                  <div className="card-footer">
                    <span className={levelClass(course.level)}>{course.level}</span>
                    <Link to={`/courses/${course.id}`} className="btn btn-primary btn-sm">
                      View Course
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const COURSE_COLORS = [
  'linear-gradient(135deg, #6c63ff 0%, #3ecfdc 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
];

const COURSE_ICONS = ['📡', '🔒', '🔀', '📶', '☁️', '🔧'];

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(value / 30);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{display}</span>;
}

const HomePage = () => {
  const { user } = useAuth();
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
    { icon: '🖥️', label: 'Interactive Labs' },
    { icon: '📡', label: 'Network Simulations' },
    { icon: '🎥', label: 'Video Tutorials' },
    { icon: '🏆', label: 'Certifications' },
    { icon: '📊', label: 'Progress Tracking' },
    { icon: '🤝', label: 'Community Forum' },
  ];

  const statCards = [
    { icon: '📚', value: stats.courses, label: 'Courses', color: '#6c63ff', bg: 'rgba(108,99,255,0.1)' },
    { icon: '🎓', value: stats.lessons, label: 'Lessons', color: '#00d2ff', bg: 'rgba(0,210,255,0.1)' },
    { icon: '📝', value: stats.assignments, label: 'Assignments', color: '#ff6584', bg: 'rgba(255,101,132,0.1)' },
    { icon: '👥', value: stats.enrollments, label: 'Enrollments', color: '#43e97b', bg: 'rgba(67,233,123,0.1)' },
  ];

  const levelClass = (level) => {
    if (!level) return '';
    const map = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' };
    return `badge badge-${map[level] || 'secondary'}`;
  };

  return (
    <div className="page-container">
      <div className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          👋 Welcome back, {user?.name || 'Learner'}
        </div>
        <h1>Master <span className="gradient-text">Computer<br />Networking</span></h1>
        <p>
          From fundamentals to advanced concepts — expertly crafted curriculum,
          hands-on labs, and real-world simulations to accelerate your career.
        </p>
        <div className="hero-features">
          {features.map((f) => (
            <span key={f.label} className="feature-chip">
              {f.icon} {f.label}
            </span>
          ))}
        </div>
        <div className="hero-actions">
          <Link to="/courses" className="btn btn-primary btn-lg">Explore Courses →</Link>
          <Link to="/enrollments" className="btn btn-outline btn-lg">Enroll Now</Link>
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
            {statCards.map((s) => (
              <div
                key={s.label}
                className="stat-card"
                style={{ '--stat-color': s.color, '--stat-bg': s.bg }}
              >
                <div className="stat-icon-wrap" style={{ background: s.bg }}>
                  <span className="stat-icon">{s.icon}</span>
                </div>
                <div className="stat-value" style={{ color: s.color }}>
                  <AnimatedNumber value={s.value} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="section">
            <div className="section-header">
              <h2>🔥 Featured Courses</h2>
              <Link to="/courses" className="btn btn-outline btn-sm">View All →</Link>
            </div>
            <div className="card-grid">
              {recentCourses.map((course, idx) => (
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
          </div>

          <div className="quick-actions">
            <h2>⚡ Quick Actions</h2>
            <div className="quick-actions-grid">
              <Link to="/courses" className="quick-action-card">
                <span className="quick-icon">📚</span>
                <div className="quick-label">Browse Courses</div>
              </Link>
              <Link to="/lessons" className="quick-action-card">
                <span className="quick-icon">🎓</span>
                <div className="quick-label">View Lessons</div>
              </Link>
              <Link to="/assignments" className="quick-action-card">
                <span className="quick-icon">📝</span>
                <div className="quick-label">Assignments</div>
              </Link>
              <Link to="/enrollments" className="quick-action-card">
                <span className="quick-icon">👥</span>
                <div className="quick-label">Enrollments</div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import './Home.css';

const statCards = [
  { key: 'courses', label: 'Courses', icon: '🎓', path: '/courses', color: '#2563eb' },
  { key: 'lessons', label: 'Lessons', icon: '📖', path: '/lessons', color: '#7c3aed' },
  { key: 'assignments', label: 'Assignments', icon: '📝', path: '/assignments', color: '#d97706' },
  { key: 'enrollments', label: 'Enrollments', icon: '👥', path: '/enrollments', color: '#059669' },
];

export default function Home() {
  const [counts, setCounts] = useState({ courses: '-', lessons: '-', assignments: '-', enrollments: '-' });
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
        setCounts({
          courses: coursesRes.data.length,
          lessons: lessonsRes.data.length,
          assignments: assignmentsRes.data.length,
          enrollments: enrollmentsRes.data.length,
        });
        setRecentCourses(coursesRes.data.slice(0, 3));
      } catch {
        // API may not be running; just show dashes
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="home-hero">
        <h1>Welcome to CCN Crash Course</h1>
        <p>Manage your courses, lessons, assignments, and student enrollments from one place.</p>
        <Link to="/courses" className="btn btn-primary hero-btn">Browse Courses</Link>
      </div>

      <div className="stats-grid">
        {statCards.map(({ key, label, icon, path, color }) => (
          <Link key={key} to={path} className="stat-card" style={{ '--accent': color }}>
            <span className="stat-icon">{icon}</span>
            <div>
              <div className="stat-count">{loading ? '…' : counts[key]}</div>
              <div className="stat-label">{label}</div>
            </div>
          </Link>
        ))}
      </div>

      {recentCourses.length > 0 && (
        <div className="home-section">
          <div className="section-header">
            <h2>Recent Courses</h2>
            <Link to="/courses" className="btn btn-secondary">View All</Link>
          </div>
          <div className="cards-grid">
            {recentCourses.map((course) => (
              <div key={course.id} className="card">
                <h3>{course.title || course.name}</h3>
                <p>{course.description || 'No description available.'}</p>
                <div className="card-footer">
                  <Link to={`/courses/${course.id}`} className="btn btn-primary">View Course</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import LessonsPage from './pages/LessonsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import EnrollmentsPage from './pages/EnrollmentsPage';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const stored =
      localStorage.getItem('ccn_user') || sessionStorage.getItem('ccn_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('ccn_user');
        sessionStorage.removeItem('ccn_user');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('ccn_user');
    sessionStorage.removeItem('ccn_user');
    setUser(null);
    setUserMenuOpen(false);
    setMenuOpen(false);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-brand">
            <div className="navbar-logo">CCN</div>
            <span className="navbar-title">Crash Course</span>
          </div>
          <button
            className="navbar-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <li>
              <NavLink to="/" end onClick={() => setMenuOpen(false)}>
                🏠 Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses" onClick={() => setMenuOpen(false)}>
                📚 Courses
              </NavLink>
            </li>
            <li>
              <NavLink to="/lessons" onClick={() => setMenuOpen(false)}>
                🎓 Lessons
              </NavLink>
            </li>
            <li>
              <NavLink to="/assignments" onClick={() => setMenuOpen(false)}>
                📝 Assignments
              </NavLink>
            </li>
            <li>
              <NavLink to="/enrollments" onClick={() => setMenuOpen(false)}>
                👥 Enrollments
              </NavLink>
            </li>
          </ul>
          <div className="navbar-user">
            <button
              className="navbar-user-btn"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-label="User menu"
            >
              <div className="navbar-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="navbar-user-name">{user.name || 'User'}</span>
              <span className="navbar-user-caret">{userMenuOpen ? '▴' : '▾'}</span>
            </button>
            {userMenuOpen && (
              <div className="navbar-user-menu">
                <div className="navbar-user-info">
                  <div className="navbar-user-info-name">{user.name || 'User'}</div>
                  <div className="navbar-user-info-email">{user.email}</div>
                  <span className="navbar-user-role">{user.role || 'student'}</span>
                </div>
                <div className="navbar-user-menu-divider"></div>
                <button className="navbar-user-menu-item navbar-logout" onClick={handleLogout}>
                  🚪 Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailsPage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/enrollments" element={<EnrollmentsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025 CCN Crash Course — Computer Networking Learning Platform</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

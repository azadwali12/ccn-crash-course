import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import LessonsPage from './pages/LessonsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import EnrollmentsPage from './pages/EnrollmentsPage';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  if (!user) return null;

  return (
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
      <div className="navbar-user" ref={dropdownRef}>
        <button
          className="user-avatar-btn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-label="User menu"
        >
          <div className="user-avatar">{user.avatar}</div>
          <span className="user-name-text">{user.name}</span>
          <span className="dropdown-arrow">{dropdownOpen ? '▲' : '▼'}</span>
        </button>
        {dropdownOpen && (
          <div className="user-dropdown">
            <div className="dropdown-header">
              <div className="dropdown-avatar">{user.avatar}</div>
              <div>
                <div className="dropdown-name">{user.name}</div>
                <div className="dropdown-email">{user.email}</div>
                <span className="badge badge-primary dropdown-role">{user.role}</span>
              </div>
            </div>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
              🚪 Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="app">
      <Navbar />
      <main className={`main-content ${user ? '' : 'no-nav'}`}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
          <Route path="/courses/:id" element={<ProtectedRoute><CourseDetailsPage /></ProtectedRoute>} />
          <Route path="/lessons" element={<ProtectedRoute><LessonsPage /></ProtectedRoute>} />
          <Route path="/assignments" element={<ProtectedRoute><AssignmentsPage /></ProtectedRoute>} />
          <Route path="/enrollments" element={<ProtectedRoute><EnrollmentsPage /></ProtectedRoute>} />
        </Routes>
      </main>
      {user && (
        <footer className="footer">
          <p>© 2025 CCN Crash Course — Computer Networking Learning Platform</p>
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;

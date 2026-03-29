import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import LessonsPage from './pages/LessonsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import EnrollmentsPage from './pages/EnrollmentsPage';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailsPage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/enrollments" element={<EnrollmentsPage />} />
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

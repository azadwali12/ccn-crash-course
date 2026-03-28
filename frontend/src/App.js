import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import LessonsPage from './pages/LessonsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import EnrollmentsPage from './pages/EnrollmentsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1 className="navbar-brand">CCN Crash Course</h1>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/lessons">Lessons</Link></li>
            <li><Link to="/assignments">Assignments</Link></li>
            <li><Link to="/enrollments">Enrollments</Link></li>
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
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="page">
      <div className="welcome-banner">
        <h2>Welcome to CCN Crash Course</h2>
        <p>Computer Communication and Networking Learning Platform</p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="icon">📚</div>
          <h3>Courses</h3>
          <p>Browse all available courses and view details</p>
          <br />
          <Link to="/courses" className="btn-link">View Courses</Link>
        </div>
        <div className="feature-card">
          <div className="icon">📖</div>
          <h3>Lessons</h3>
          <p>Explore lessons across all courses</p>
          <br />
          <Link to="/lessons" className="btn-link">View Lessons</Link>
        </div>
        <div className="feature-card">
          <div className="icon">📝</div>
          <h3>Assignments</h3>
          <p>Check assignments and due dates</p>
          <br />
          <Link to="/assignments" className="btn-link">View Assignments</Link>
        </div>
        <div className="feature-card">
          <div className="icon">🎓</div>
          <h3>Enrollments</h3>
          <p>Manage your student enrollments</p>
          <br />
          <Link to="/enrollments" className="btn-link">View Enrollments</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

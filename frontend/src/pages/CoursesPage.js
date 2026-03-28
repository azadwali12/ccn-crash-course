import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses`);
      setCourses(response.data);
    } catch (err) {
      setError('Failed to fetch courses. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>All Courses</h2>
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h2>All Courses</h2>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-text">{error}</p>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="page">
        <h2>All Courses</h2>
        <div className="empty-container">
          <div className="empty-icon">📭</div>
          <p className="empty-text">No courses found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>All Courses</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.course_id}>
                <td>{course.course_id}</td>
                <td>{course.course_name}</td>
                <td>{course.instructor}</td>
                <td>{course.description}</td>
                <td>
                  <Link to={`/courses/${course.course_id}`} className="btn-link">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoursesPage;

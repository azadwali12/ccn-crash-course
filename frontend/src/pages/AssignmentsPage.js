import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/assignments`);
      setAssignments(response.data);
    } catch (err) {
      setError('Failed to fetch assignments. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>All Assignments</h2>
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading assignments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h2>All Assignments</h2>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-text">{error}</p>
        </div>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="page">
        <h2>All Assignments</h2>
        <div className="empty-container">
          <div className="empty-icon">📭</div>
          <p className="empty-text">No assignments found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>All Assignments</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course ID</th>
              <th>Title</th>
              <th>Due Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.assignment_id}>
                <td>{assignment.assignment_id}</td>
                <td>{assignment.course_id}</td>
                <td>{assignment.title}</td>
                <td>{assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : '—'}</td>
                <td>{assignment.description ? `${assignment.description.substring(0, 80)}...` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignmentsPage;

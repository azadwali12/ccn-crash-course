import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get('/assignments');
        setAssignments(res.data);
        setFiltered(res.data);
      } catch (err) {
        setError('Failed to load assignments. Make sure the backend is running at http://localhost:5000.');
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      assignments.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.courseName && a.courseName.toLowerCase().includes(q))
      )
    );
  }, [search, assignments]);

  const getDueBadge = (dueDate) => {
    if (!dueDate) return null;
    const due = new Date(dueDate);
    const now = new Date();
    const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    if (diff < 0) return <span className="badge badge-danger">Overdue</span>;
    if (diff <= 7) return <span className="badge badge-warning">Due soon</span>;
    return <span className="badge badge-success">Upcoming</span>;
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading assignments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Connection Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📝 Assignments</h1>
        <p>Track and manage all course assignments</p>
      </div>

      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search assignments or courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="badge badge-secondary">{filtered.length} assignments</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No assignments found</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Course</th>
                <th>Due Date</th>
                <th>Points</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((assignment) => (
                <tr key={assignment.id}>
                  <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{assignment.id}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{assignment.title}</div>
                    {assignment.description && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {assignment.description}
                      </div>
                    )}
                  </td>
                  <td>
                    {assignment.courseName ? (
                      <span className="badge badge-primary">{assignment.courseName}</span>
                    ) : (
                      <span className="badge badge-secondary">—</span>
                    )}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {assignment.dueDate ? (
                      <span style={{ color: 'var(--text-secondary)' }}>📅 {assignment.dueDate}</span>
                    ) : '—'}
                  </td>
                  <td>
                    {assignment.points ? (
                      <span className="badge badge-success">🏆 {assignment.points}</span>
                    ) : '—'}
                  </td>
                  <td>{getDueBadge(assignment.dueDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;

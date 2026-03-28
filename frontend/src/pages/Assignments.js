import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { truncateText } from '../utils/text';

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', due_date: '', course_id: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [assignRes, coursesRes] = await Promise.all([
        api.get('/assignments'),
        api.get('/courses'),
      ]);
      setAssignments(assignRes.data);
      setCourses(coursesRes.data);
      setError('');
    } catch {
      setError('Failed to load assignments. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCourseTitle = (courseId) => {
    const course = courses.find((c) => String(c.id) === String(courseId));
    return course ? course.title || course.name : `Course #${courseId}`;
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/assignments', form);
      setShowModal(false);
      setForm({ title: '', description: '', due_date: '', course_id: '' });
      fetchData();
    } catch {
      alert('Failed to create assignment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Assignments</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + New Assignment
        </button>
      </div>

      {error && <div className="error-box">⚠️ {error}</div>}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner" />
          Loading assignments…
        </div>
      ) : assignments.length === 0 ? (
        <div className="empty-state">
          <h3>No assignments found</h3>
          <p>Create assignments for your courses to get started.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Course</th>
                <th>Description</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, idx) => (
                <tr key={assignment.id}>
                  <td>{idx + 1}</td>
                  <td><strong>{assignment.title}</strong></td>
                  <td>
                    <span className="badge badge-blue">
                      {assignment.course_id ? getCourseTitle(assignment.course_id) : '—'}
                    </span>
                  </td>
                  <td>{truncateText(assignment.description) || '—'}</td>
                  <td>
                    {assignment.due_date ? (
                      <span className={`badge ${isOverdue(assignment.due_date) ? 'badge-yellow' : 'badge-green'}`}>
                        {new Date(assignment.due_date).toLocaleDateString()}
                      </span>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Assignment</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="Enter assignment title"
                />
              </div>
              <div className="form-group">
                <label>Course</label>
                <select
                  value={form.course_id}
                  onChange={(e) => setForm({ ...form, course_id: e.target.value })}
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title || c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the assignment"
                />
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={form.due_date}
                  onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Creating…' : 'Create Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

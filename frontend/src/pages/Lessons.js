import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { truncateText } from '../utils/text';

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', course_id: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [lessonsRes, coursesRes] = await Promise.all([
        api.get('/lessons'),
        api.get('/courses'),
      ]);
      setLessons(lessonsRes.data);
      setCourses(coursesRes.data);
      setError('');
    } catch {
      setError('Failed to load lessons. Make sure the backend server is running.');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/lessons', form);
      setShowModal(false);
      setForm({ title: '', content: '', course_id: '' });
      fetchData();
    } catch {
      alert('Failed to create lesson. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Lessons</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + New Lesson
        </button>
      </div>

      {error && <div className="error-box">⚠️ {error}</div>}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner" />
          Loading lessons…
        </div>
      ) : lessons.length === 0 ? (
        <div className="empty-state">
          <h3>No lessons found</h3>
          <p>Add lessons to your courses to get started.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Course</th>
                <th>Content Preview</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson, idx) => (
                <tr key={lesson.id}>
                  <td>{idx + 1}</td>
                  <td><strong>{lesson.title}</strong></td>
                  <td>
                    <span className="badge badge-blue">
                      {lesson.course_id ? getCourseTitle(lesson.course_id) : '—'}
                    </span>
                  </td>
                  <td>{truncateText(lesson.content) || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Lesson</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="Enter lesson title"
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
                <label>Content</label>
                <textarea
                  rows="4"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Enter lesson content"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Creating…' : 'Create Lesson'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

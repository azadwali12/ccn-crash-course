import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { truncateText } from '../utils/text';
import './CourseDetails.css';

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [courseRes, lessonsRes, assignmentsRes] = await Promise.all([
          api.get(`/courses/${id}`),
          api.get('/lessons'),
          api.get('/assignments'),
        ]);
        setCourse(courseRes.data);
        setLessons(
          lessonsRes.data.filter(
            (l) => String(l.course_id) === String(id)
          )
        );
        setAssignments(
          assignmentsRes.data.filter(
            (a) => String(a.course_id) === String(id)
          )
        );
        setError('');
      } catch {
        setError('Failed to load course details. Make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner" />
        Loading course…
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="error-box">⚠️ {error}</div>
        <Link to="/courses" className="btn btn-secondary">← Back to Courses</Link>
      </div>
    );
  }

  if (!course) {
    return (
      <div>
        <div className="error-box">⚠️ Course not found.</div>
        <Link to="/courses" className="btn btn-secondary">← Back to Courses</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="course-details-header">
        <Link to="/courses" className="back-link">← Courses</Link>
        <h1>{course.title || course.name}</h1>
        {course.description && <p className="course-desc">{course.description}</p>}
        {course.created_at && (
          <p className="course-meta">Created: {new Date(course.created_at).toLocaleDateString()}</p>
        )}
      </div>

      <div className="details-sections">
        <section className="details-section">
          <h2>Lessons ({lessons.length})</h2>
          {lessons.length === 0 ? (
            <p className="no-items">No lessons found for this course.</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Content</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((lesson, idx) => (
                    <tr key={lesson.id}>
                      <td>{idx + 1}</td>
                      <td>{lesson.title}</td>
                      <td>{truncateText(lesson.content) || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="details-section">
          <h2>Assignments ({assignments.length})</h2>
          {assignments.length === 0 ? (
            <p className="no-items">No assignments found for this course.</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment, idx) => (
                    <tr key={assignment.id}>
                      <td>{idx + 1}</td>
                      <td>{assignment.title}</td>
                      <td>{assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

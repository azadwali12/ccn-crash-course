import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid credentials. Please try again.');
      } else {
        if (form.remember) {
          localStorage.setItem('ccn_user', JSON.stringify(data.user));
        } else {
          sessionStorage.setItem('ccn_user', JSON.stringify(data.user));
        }
        onLogin(data.user);
      }
    } catch {
      setError('Cannot connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-orb login-orb-1"></div>
        <div className="login-orb login-orb-2"></div>
        <div className="login-orb login-orb-3"></div>
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-logo">
            <div className="login-logo-icon">CCN</div>
            <span className="login-logo-text">Crash Course</span>
          </div>

          <div className="login-header">
            <h1>Welcome back</h1>
            <p>Sign in to continue your learning journey</p>
          </div>

          {error && (
            <div className="login-error">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="login-field">
              <label htmlFor="email">Email Address</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">✉️</span>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@ccn.edu"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <div className="login-field-row">
                <label htmlFor="password">Password</label>
                <button
                  type="button"
                  className="login-forgot"
                  onClick={() => setError('Password reset coming soon!')}
                >
                  Forgot password?
                </button>
              </div>
              <div className="login-input-wrap">
                <span className="login-input-icon">🔒</span>
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="login-eye"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="login-remember">
              <label className="login-checkbox">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                />
                <span className="login-checkmark"></span>
                Remember me
              </label>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="login-btn-arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="login-divider">
            <span>Demo Credentials</span>
          </div>

          <div className="login-demo">
            <div className="demo-cred" onClick={() => setForm({ ...form, email: 'admin@ccn.edu', password: 'admin123' })}>
              <span className="demo-role">Admin</span>
              <span className="demo-info">admin@ccn.edu · admin123</span>
            </div>
            <div className="demo-cred" onClick={() => setForm({ ...form, email: 'student@ccn.edu', password: 'student123' })}>
              <span className="demo-role">Student</span>
              <span className="demo-info">student@ccn.edu · student123</span>
            </div>
          </div>

          <p className="login-signup">
            Don't have an account?{' '}
            <button
              type="button"
              className="login-forgot"
              onClick={() => setError('Sign up coming soon! Use demo credentials above.')}
            >
              Sign up
            </button>
          </p>
        </div>

        <div className="login-info">
          <div className="login-info-content">
            <h2>Master Computer Networking</h2>
            <p>
              Join thousands of students learning networking fundamentals, security,
              cloud architecture, and more through hands-on labs and expert-led courses.
            </p>
            <div className="login-features">
              {[
                { icon: '📡', text: 'Network Simulations' },
                { icon: '🔒', text: 'Security Labs' },
                { icon: '☁️', text: 'Cloud Networking' },
                { icon: '🏆', text: 'Certifications' },
                { icon: '📊', text: 'Progress Tracking' },
                { icon: '🤝', text: 'Expert Instructors' },
              ].map((f) => (
                <div key={f.text} className="login-feature-chip">
                  <span>{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
            <div className="login-stats">
              {[
                { value: '6+', label: 'Courses' },
                { value: '10+', label: 'Lessons' },
                { value: '8+', label: 'Assignments' },
                { value: '100+', label: 'Students' },
              ].map((s) => (
                <div key={s.label} className="login-stat">
                  <div className="login-stat-value">{s.value}</div>
                  <div className="login-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

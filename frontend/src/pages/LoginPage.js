import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(form.email, form.password, form.remember);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-orb login-orb-1"></div>
        <div className="login-orb login-orb-2"></div>
        <div className="login-orb login-orb-3"></div>
      </div>

      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">CCN</div>
          <h1 className="login-title">CCN Crash Course</h1>
          <p className="login-subtitle">Computer Networking Learning Platform</p>
        </div>

        <div className="login-divider">
          <span>Sign in to your account</span>
        </div>

        {error && (
          <div className="login-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <span className="input-icon">✉️</span>
              <input
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                autoFocus
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label className="form-label">Password</label>
              <button type="button" className="forgot-link">Forgot password?</button>
            </div>
            <div className="input-with-icon">
              <span className="input-icon">🔒</span>
              <input
                className="form-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
              />
              <span className="checkbox-custom"></span>
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className={`btn btn-primary login-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="btn-spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In →'
            )}
          </button>
        </form>

        <div className="login-demo">
          <p>Demo credentials:</p>
          <div className="demo-creds">
            <button
              type="button"
              className="demo-btn"
              onClick={() => setForm({ email: 'admin@ccn.edu', password: 'admin123', remember: false })}
            >
              <span className="demo-badge">Admin</span>
              admin@ccn.edu
            </button>
            <button
              type="button"
              className="demo-btn"
              onClick={() => setForm({ email: 'student@ccn.edu', password: 'student123', remember: false })}
            >
              <span className="demo-badge demo-badge-blue">Student</span>
              student@ccn.edu
            </button>
          </div>
        </div>
      </div>

      <p className="login-footer">© 2025 CCN Crash Course — Computer Networking Learning Platform</p>
    </div>
  );
};

export default LoginPage;

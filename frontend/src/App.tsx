import React, { useState } from 'react';
import './index.css';

function App() {
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email.includes('@') && loginForm.password.length > 3) {
      setIsLoggedIn(true);
    }
  };

  const simulateNetworkRequest = () => {
    setIsLoading(true);
    setDataLoaded(false);
    setTimeout(() => {
      setIsLoading(false);
      setDataLoaded(true);
    }, 2000);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Playwright Learning Sandbox</h1>
        <p>A beautifully simple sandbox designed for practicing browser automation.</p>
      </header>

      <main className="content-grid">
        {/* Challenge 1: Login Form */}
        <section className="card" id="login-section">
          <h2>1. Authentication Form</h2>
          <p className="hint">Practice typing into inputs, checking boxes, and form submission.</p>

          {!isLoggedIn ? (
            <form onSubmit={handleLoginSubmit} className="form-layout" id="login-form">
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="tester@example.com"
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Enter password"
                />
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={loginForm.remember}
                  onChange={(e) => setLoginForm({ ...loginForm, remember: e.target.checked })}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <button type="submit" className="button primary-btn" id="login-btn">Log In</button>
            </form>
          ) : (
            <div className="success-banner" id="welcome-message">
              <h3>Welcome back!</h3>
              <p>You have successfully logged in.</p>
              <button className="button secondary-btn" onClick={() => setIsLoggedIn(false)} id="logout-btn">Log Out</button>
            </div>
          )}
        </section>

        {/* Challenge 2: Dynamic Element (Auto-waiting) */}
        <section className="card" id="dynamic-section">
          <h2>2. Dynamic Elements</h2>
          <p className="hint">Practice waiting for elements that load asynchronously.</p>

          <button
            className={`button ${isLoading ? 'loading-btn' : 'tertiary-btn'}`}
            id="load-data-btn"
            onClick={simulateNetworkRequest}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Fetch Data'}
          </button>

          {isLoading && <div className="spinner" id="loading-spinner"></div>}

          {dataLoaded && !isLoading && (
            <div className="data-box" id="data-result">
              <p>✅ Data successfully loaded from server.</p>
            </div>
          )}
        </section>

        {/* Challenge 3: Counter */}
        <section className="card" id="counter-section">
          <h2>3. State Verification</h2>
          <p className="hint">Practice clicking and asserting textual values.</p>

          <div className="counter-display">
            <span id="counter-value">{counter}</span>
          </div>
          <div className="button-group">
            <button className="button danger-btn" id="decrement-btn" onClick={() => setCounter(c => c - 1)}>- Decrease</button>
            <button className="button primary-btn" id="increment-btn" onClick={() => setCounter(c => c + 1)}>+ Increase</button>
            <button className="button secondary-btn" id="reset-btn" onClick={() => setCounter(0)}>Reset</button>
          </div>
        </section>

        {/* Challenge 4: Hover Menu */}
        <section className="card" id="hover-section">
          <h2>4. Hover Interactions</h2>
          <p className="hint">Practice mouse hover events to reveal hidden elements.</p>

          <div className="dropdown hover-target" id="hover-dropdown">
            <button className="button secondary-btn dropdown-trigger">Hover target ▾</button>
            <div className="dropdown-menu" id="dropdown-content">
              <a href="#" className="dropdown-item" id="menu-action-1">Profile Settings</a>
              <a href="#" className="dropdown-item" id="menu-action-2">Account Billing</a>
              <a href="#" className="dropdown-item" id="menu-action-3">System Logout</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

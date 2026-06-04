import React, { useState } from 'react';
import './index.css';

function App() {
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dialogResult, setDialogResult] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [dropSuccess, setDropSuccess] = useState(false);
  const [apiUser, setApiUser] = useState('');

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

        {/* Challenge 5: Browser Dialogs */}
        <section className="card" id="dialog-section">
          <h2>5. Native Dialogs</h2>
          <p className="hint">Practice handling window.confirm or window.alert events.</p>

          <button
            className="button danger-btn"
            id="trigger-confirm-btn"
            onClick={() => {
              const res = window.confirm('Are you sure you want to delete this?');
              setDialogResult(res ? 'Confirmed' : 'Cancelled');
            }}
          >
            Trigger Confirm
          </button>

          <div className="data-box" style={{ marginTop: '1rem' }} id="dialog-result">
            <p>Result: <strong id="dialog-status">{dialogResult || 'None'}</strong></p>
          </div>
        </section>

        {/* Challenge 6: Select Dropdown */}
        <section className="card" id="select-section">
          <h2>6. Select Dropdowns</h2>
          <p className="hint">Practice using locator.selectOption() to choose from a list.</p>

          <div className="input-group">
            <label htmlFor="color-select">Favorite Color</label>
            <select
              id="color-select"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              style={{
                width: '100%',
                padding: '0.625rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-dark)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="">-- Please choose an option --</option>
              <option value="red" id="option-red">Red</option>
              <option value="blue" id="option-blue">Blue</option>
              <option value="green" id="option-green">Green</option>
            </select>
          </div>

          <div className="data-box" style={{ marginTop: '1rem' }}>
            <p>Selected: <strong id="select-result">{selectedOption || 'None'}</strong></p>
          </div>
        </section>

        {/* Challenge 7: File Upload */}
        <section className="card" id="upload-section">
          <h2>7. File Upload</h2>
          <p className="hint">Practice using locator.setInputFiles() to attach a file.</p>
          <div className="input-group">
            <label htmlFor="file-upload">Upload a File</label>
            <input 
              type="file" 
              id="file-upload" 
              onChange={(e) => setUploadedFileName(e.target.files?.[0]?.name || '')}
              style={{ padding: '0.5rem 0', color: 'var(--text-primary)' }}
            />
          </div>
          <div className="data-box" style={{ marginTop: '1rem', display: uploadedFileName ? 'block' : 'none' }}>
            <p>Uploaded: <strong id="upload-result">{uploadedFileName}</strong></p>
          </div>
        </section>

        {/* Challenge 8: Drag and Drop */}
        <section className="card" id="dnd-section">
          <h2>8. Drag and Drop</h2>
          <p className="hint">Practice moving elements using locator.dragTo().</p>
          <div className="dnd-container" style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
            <div 
              id="drag-source"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', 'dragged-item')}
              style={{
                width: '100px', height: '100px', background: 'var(--accent-primary)',
                borderRadius: '0.5rem', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'grab', color: 'white', fontWeight: 600
              }}
            >
              Drag Me
            </div>
            <div 
              id="drop-target"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.getData('text/plain') === 'dragged-item') {
                  setDropSuccess(true);
                }
              }}
              style={{
                width: '150px', height: '100px', border: '2px dashed var(--border-color)',
                borderRadius: '0.5rem', display: 'flex', alignItems: 'center',
                justifyContent: 'center', background: dropSuccess ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                borderColor: dropSuccess ? 'var(--success)' : 'var(--border-color)',
                transition: 'all 0.3s ease'
              }}
            >
              {dropSuccess ? 'Dropped!' : 'Drop Here'}
            </div>
          </div>
        </section>

        {/* Challenge 9: API Mocking */}
        <section className="card" id="api-mock-section">
          <h2>9. API Mocking</h2>
          <p className="hint">Intercept network requests and mock responses.</p>
          <button 
            className="button tertiary-btn" 
            id="fetch-users-btn"
            onClick={async () => {
              try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
                const data = await res.json();
                setApiUser(data.name);
              } catch (e) {
                setApiUser('Error loading user');
              }
            }}
          >
            Fetch Real User
          </button>
          <div className="data-box" style={{ marginTop: '1rem' }}>
            <p>User: <strong id="api-user-result">{apiUser || 'None'}</strong></p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { getApiUrl } from '../services/api';

function Home() {
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const url = getApiUrl('/api/');
        console.log('[Home] Checking API at:', url);
        const response = await fetch(url);
        setApiStatus(response.ok ? 'connected' : 'disconnected');
        console.log('[Home] API status:', response.ok ? 'CONNECTED ✓' : 'DISCONNECTED ✗');
      } catch (err) {
        setApiStatus('error');
        console.error('[Home] API check error:', err);
      }
    };

    checkAPI();
  }, []);

  const getStatusClass = () => {
    switch (apiStatus) {
      case 'connected':
        return 'alert-success';
      case 'error':
      case 'disconnected':
        return 'alert-danger';
      default:
        return 'alert-info';
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'connected':
        return '✓ Backend API Connected';
      case 'error':
      case 'disconnected':
        return '✗ Backend API Disconnected';
      default:
        return 'Checking API Connection...';
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8">
          <h1 className="mb-3">Welcome to OctoFit Tracker 🐙</h1>
          <p className="lead">
            A real-time fitness tracking application built with React and Django REST Framework.
          </p>
          
          <div className={`alert ${getStatusClass()}`} role="alert">
            <h4 className="alert-heading">API Connection</h4>
            <p className="mb-0">{getStatusText()}</p>
            {apiStatus === 'connected' && (
              <small className="d-block mt-2">Codespace: {process.env.REACT_APP_CODESPACE_NAME || 'Not detected (using localhost)'}</small>
            )}
          </div>

          <h3 className="mt-5">Features</h3>
          <ul>
            <li>📊 Track activities across teams</li>
            <li>👥 Manage teams and members</li>
            <li>🏆 View leaderboards and rankings</li>
            <li>💪 Access personalized workout suggestions</li>
            <li>📈 Monitor fitness progress in real-time</li>
          </ul>

          <h3 className="mt-5">Getting Started</h3>
          <p>Use the navigation menu above to explore different sections:</p>
          <ul>
            <li><strong>Activities:</strong> View member activities</li>
            <li><strong>Teams:</strong> Manage team information</li>
            <li><strong>Users:</strong> See all registered users</li>
            <li><strong>Leaderboard:</strong> Check rankings</li>
            <li><strong>Workouts:</strong> Browse workout suggestions</li>
          </ul>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">API Information</h5>
              <p className="card-text">
                <small>
                  <strong>Backend:</strong> Django REST Framework
                  <br />
                  <strong>Frontend:</strong> React with React Router
                  <br />
                  <strong>Styling:</strong> Bootstrap 5
                </small>
              </p>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Console Logs</h5>
              <p className="card-text">
                <small>
                  Open the browser developer console (F12) to see detailed API logs for each component.
                  All API calls are logged with [Component] prefix for debugging.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

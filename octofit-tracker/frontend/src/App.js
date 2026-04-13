import { useState, useEffect } from 'react';
import './App.css';
import api from './services/api';
import AppNavbar from './components/AppNavbar';
import ConfirmModal from './components/ConfirmModal';
import DataTableCard from './components/DataTableCard';
import WorkoutFormCard from './components/WorkoutFormCard';

function App() {
  const [showResetModal, setShowResetModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const [teams, setTeams] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const isHealthy = await api.checkHealth();
      setApiAvailable(isHealthy);

      if (isHealthy) {
        const [activitiesData, teamsData, leaderboardData, workoutsData] = await Promise.all([
          api.fetchActivities(),
          api.fetchTeams(),
          api.fetchLeaderboard(),
          api.fetchWorkouts(),
        ]);
        setActivities(activitiesData);
        setTeams(teamsData);
        setLeaderboard(leaderboardData);
        setWorkouts(workoutsData);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowResetModal(true);
  };

  return (
    <div className="app-shell" id="top">
      <AppNavbar />

      <main className="container py-4 py-lg-5">
        {isLoading && (
          <div className="alert alert-info" role="alert">
            <strong>Loading...</strong> Fetching data from backend API.
          </div>
        )}
        {!apiAvailable && !isLoading && (
          <div className="alert alert-warning" role="alert">
            <strong>Warning:</strong> Backend API unavailable. Showing fallback data.
            <br />
            Make sure Django server is running on <code>http://localhost:8000</code> or set <code>REACT_APP_API_URL</code> env variable.
          </div>
        )}
        <div className="row mb-4 align-items-end g-3">
          <div className="col-lg-8">
            <h1 className="display-5 fw-bold text-body-emphasis mb-2">OctoFit Team Dashboard</h1>
            <p className="lead text-secondary mb-0">
              Real-time data from Django backend API. {apiAvailable ? '✓ API Connected' : '✗ API Disconnected'}
            </p>
          </div>
          <div className="col-lg-4 d-flex justify-content-lg-end">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setShowResetModal(true)}
            >
              Open Reset Modal
            </button>
          </div>
        </div>

        <div className="row g-4">
          <DataTableCard
            id="activities"
            title="Recent Activities"
            subtitle="Consistent table layout with striped rows."
            linkLabel="View Activity API"
            linkHref="/api/activities/"
            columns={['User', 'Activity', 'Duration', 'Date']}
            rows={activities}
            actionLabel="Export Activities"
          />

          <DataTableCard
            id="teams"
            title="Teams"
            subtitle="Unified data grid with matching spacing and typography."
            linkLabel="View Teams API"
            linkHref="/api/teams/"
            columns={['Team', 'Description']}
            rows={teams}
            actionLabel="Manage Teams"
          />

          <DataTableCard
            id="leaderboard"
            title="Leaderboard"
            subtitle="Same table styling used across all data components."
            linkLabel="View Leaderboard API"
            linkHref="/api/leaderboard/"
            columns={['Rank', 'Member', 'Points']}
            rows={leaderboard}
            actionLabel="Refresh Rankings"
          />

          <DataTableCard
            id="workouts"
            title="Workouts"
            subtitle="Personalized workout suggestions by team."
            linkLabel="View Workouts API"
            linkHref="/api/workouts/"
            columns={['Workout', 'Description', 'Suggested For']}
            rows={workouts}
            actionLabel="Add Workout"
          />

          <WorkoutFormCard onSubmit={handleFormSubmit} />
        </div>
      </main>

      <ConfirmModal open={showResetModal} onClose={() => setShowResetModal(false)} />
    </div>
  );
}

export default App;

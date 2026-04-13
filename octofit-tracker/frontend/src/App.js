import { useState } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ConfirmModal from './components/ConfirmModal';
import DataTableCard from './components/DataTableCard';
import WorkoutFormCard from './components/WorkoutFormCard';

function App() {
  const [showResetModal, setShowResetModal] = useState(false);

  const activities = [
    ['Iron Man', 'Run', '30 min', 'Marvel'],
    ['Captain America', 'Cycle', '45 min', 'Marvel'],
    ['Batman', 'Swim', '25 min', 'DC'],
    ['Superman', 'Walk', '60 min', 'DC'],
  ];

  const teams = [
    ['Marvel', '2', 'Beginner + Intermediate'],
    ['DC', '2', 'Intermediate + Advanced'],
  ];

  const leaderboard = [
    ['1', 'Iron Man', '120', '+10'],
    ['2', 'Captain America', '110', '+6'],
    ['3', 'Batman', '100', '+4'],
    ['4', 'Superman', '90', '+3'],
  ];

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowResetModal(true);
  };

  return (
    <div className="app-shell" id="top">
      <AppNavbar />

      <main className="container py-4 py-lg-5">
        <div className="row mb-4 align-items-end g-3">
          <div className="col-lg-8">
            <h1 className="display-5 fw-bold text-body-emphasis mb-2">OctoFit Team Dashboard</h1>
            <p className="lead text-secondary mb-0">
              Bootstrap-first layout for activities, teams, leaderboard, forms, cards, links, buttons, and modal actions.
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
            columns={['Member', 'Activity', 'Duration', 'Team']}
            rows={activities}
            actionLabel="Export Activities"
          />

          <DataTableCard
            id="teams"
            title="Teams"
            subtitle="Unified data grid with matching spacing and typography."
            linkLabel="View Teams API"
            linkHref="/api/teams/"
            columns={['Team', 'Members', 'Level Mix']}
            rows={teams}
            actionLabel="Manage Teams"
          />

          <DataTableCard
            id="leaderboard"
            title="Leaderboard"
            subtitle="Same table styling used across all data components."
            linkLabel="View Leaderboard API"
            linkHref="/api/leaderboard/"
            columns={['Rank', 'Member', 'Points', 'Delta']}
            rows={leaderboard}
            actionLabel="Refresh Rankings"
          />

          <WorkoutFormCard onSubmit={handleFormSubmit} />
        </div>
      </main>

      <ConfirmModal open={showResetModal} onClose={() => setShowResetModal(false)} />
    </div>
  );
}

export default App;

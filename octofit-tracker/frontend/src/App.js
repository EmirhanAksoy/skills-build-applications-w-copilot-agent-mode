import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Users from './components/Users';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import Home from './components/Home';

function App() {
  console.log('App component mounted');
  console.log('Codespace:', process.env.REACT_APP_CODESPACE_NAME);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navigation />

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

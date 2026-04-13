import { useState, useEffect } from 'react';
import { getApiUrl } from '../services/api';

/**
 * Workouts Component
 * Displays workouts fetched from backend API
 * Codespace URL format: https://{codespace}-8000.app.github.dev/api/workouts
 */
function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const url = getApiUrl('/api/workouts/');
        console.log('[Workouts] Fetching from:', url);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        console.log('[Workouts] Raw data:', data);
        
        // Handle both paginated and plain array responses
        const results = data.results || data;
        const workoutsArray = Array.isArray(results) ? results : [];
        setWorkouts(workoutsArray);
        console.log('[Workouts] Processed data:', workoutsArray);
      } catch (err) {
        console.error('[Workouts] Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">💪 Workouts</h1>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Workout Name</th>
                <th>Description</th>
                <th>Suggested For</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={idx}>
                  <td>{workout.name}</td>
                  <td>{workout.description}</td>
                  <td>{workout.suggested_for}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Workouts;

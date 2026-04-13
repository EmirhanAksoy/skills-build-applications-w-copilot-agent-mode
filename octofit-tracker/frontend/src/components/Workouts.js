import { useState, useEffect } from 'react';

/**
 * Workouts Component
 * Displays workouts fetched from backend API
 */
function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const apiUrl = getApiUrl('/api/workouts/');
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        console.log('Workouts API response:', data);
        
        // Handle both paginated and plain array responses
        const results = data.results || data;
        setWorkouts(Array.isArray(results) ? results : []);
        console.log('Workouts state updated:', Array.isArray(results) ? results : []);
      } catch (err) {
        console.error('Error fetching workouts:', err);
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
      <h1 className="mb-4">Workouts</h1>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
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

/**
 * Helper function to get API URL with Codespace support
 */
function getApiUrl(endpoint) {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev${endpoint}`;
  }
  return `http://localhost:8000${endpoint}`;
}

export default Workouts;

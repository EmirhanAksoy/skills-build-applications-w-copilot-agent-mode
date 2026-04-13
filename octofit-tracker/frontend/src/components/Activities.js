import { useState, useEffect } from 'react';
import { getApiUrl } from '../services/api';

/**
 * Activities Component
 * Displays activities fetched from backend API
 * Codespace URL format: https://{codespace}-8000.app.github.dev/api/activities
 */
function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const url = getApiUrl('/api/activities/');
        console.log('[Activities] Fetching from:', url);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        console.log('[Activities] Raw data:', data);
        
        // Handle both paginated and plain array responses
        const results = data.results || data;
        const activitiesArray = Array.isArray(results) ? results : [];
        console.log('[Activities] Processed data:', activitiesArray);
        setActivities(activitiesArray);
      } catch (err) {
        console.error('[Activities] Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">📊 Activities</h1>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>User Email</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={idx}>
                  <td>{activity.user_email || 'N/A'}</td>
                  <td>{activity.type || 'N/A'}</td>
                  <td>{activity.duration || 'N/A'}</td>
                  <td>{activity.date || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;

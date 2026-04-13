import { useState, useEffect } from 'react';

/**
 * Leaderboard Component
 * Displays leaderboard fetched from backend API
 */
function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const apiUrl = getApiUrl('/api/leaderboard/');
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        console.log('Leaderboard API response:', data);
        
        // Handle both paginated and plain array responses
        const results = data.results || data;
        setLeaderboard(Array.isArray(results) ? results : []);
        console.log('Leaderboard state updated:', Array.isArray(results) ? results : []);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Leaderboard</h1>
      {leaderboard.length === 0 ? (
        <p>No leaderboard data available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User Email</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.rank || idx + 1}</td>
                  <td>{entry.user_email}</td>
                  <td>{entry.points}</td>
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

export default Leaderboard;

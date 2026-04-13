import { useState, useEffect } from 'react';
import { getApiUrl } from '../services/api';

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
        const url = getApiUrl('/api/leaderboard/');
        console.log('[Leaderboard] Fetching from:', url);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        console.log('[Leaderboard] Raw data:', data);
        
        // Handle both paginated and plain array responses
        const results = data.results || data;
        const leaderboardArray = Array.isArray(results) ? results : [];
        setLeaderboard(leaderboardArray);
        console.log('[Leaderboard] Processed data:', leaderboardArray);
      } catch (err) {
        console.error('[Leaderboard] Error:', err);
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
      <h1 className="mb-4">🏆 Leaderboard</h1>
      {leaderboard.length === 0 ? (
        <p>No leaderboard data available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
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

export default Leaderboard;

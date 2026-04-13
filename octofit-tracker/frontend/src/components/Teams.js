import { useState, useEffect } from 'react';
import { getApiUrl } from '../services/api';

/**
 * Teams Component
 * Displays teams fetched from backend API
 * Codespace URL format: https://{codespace}-8000.app.github.dev/api/teams
 */
function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const url = getApiUrl('/api/teams/');
        console.log('[Teams] Fetching from:', url);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        console.log('[Teams] Raw data:', data);
        
        // Handle both paginated and plain array responses
        const results = data.results || data;
        const teamsArray = Array.isArray(results) ? results : [];
        setTeams(teamsArray);
        console.log('[Teams] Processed data:', teamsArray);
      } catch (err) {
        console.error('[Teams] Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">👥 Teams</h1>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Team Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={idx}>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Teams;

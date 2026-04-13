import { useState, useEffect } from 'react';

/**
 * Teams Component
 * Displays teams fetched from backend API
 */
function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const apiUrl = getApiUrl('/api/teams/');
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        console.log('Teams API response:', data);
        
        // Handle both paginated and plain array responses
        const results = data.results || data;
        setTeams(Array.isArray(results) ? results : []);
        console.log('Teams state updated:', Array.isArray(results) ? results : []);
      } catch (err) {
        console.error('Error fetching teams:', err);
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
      <h1 className="mb-4">Teams</h1>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
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

export default Teams;

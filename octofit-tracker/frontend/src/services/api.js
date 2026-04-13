/**
 * API Service for OctoFit Tracker
 * Handles all backend API calls with Codespace support
 */

/**
 * Get the API URL based on environment
 * Supports both localhost and Codespace URLs
 */
export function getApiUrl(path = '') {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  let baseUrl;

  if (codespace) {
    // Use Codespace URL with https
    baseUrl = `https://${codespace}-8000.app.github.dev`;
    console.log(`[API] Using Codespace URL: ${baseUrl}`);
  } else {
    // Use localhost for development
    baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    console.log(`[API] Using localhost URL: ${baseUrl}`);
  }

  const fullUrl = `${baseUrl}${path}`;
  console.log(`[API] Full URL: ${fullUrl}`);
  return fullUrl;
}

const api = {
  /**
   * Fetch activities from backend
   * @returns {Promise<Array>} Raw activities data
   */
  async fetchActivities() {
    try {
      const url = getApiUrl('/api/activities/');
      console.log('[Activities] Fetching from:', url);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log('[Activities] Raw response:', data);
      
      // Handle both paginated and plain array responses
      const activities = data.results || data;
      console.log('[Activities] Processed data:', activities);
      return Array.isArray(activities) ? activities : [];
    } catch (error) {
      console.error('[Activities] Error:', error);
      return [];
    }
  },

  /**
   * Fetch teams from backend
   * @returns {Promise<Array>} Raw teams data
   */
  async fetchTeams() {
    try {
      const url = getApiUrl('/api/teams/');
      console.log('[Teams] Fetching from:', url);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log('[Teams] Raw response:', data);
      
      // Handle both paginated and plain array responses
      const teams = data.results || data;
      console.log('[Teams] Processed data:', teams);
      return Array.isArray(teams) ? teams : [];
    } catch (error) {
      console.error('[Teams] Error:', error);
      return [];
    }
  },

  /**
   * Fetch users from backend
   * @returns {Promise<Array>} Raw users data
   */
  async fetchUsers() {
    try {
      const url = getApiUrl('/api/users/');
      console.log('[Users] Fetching from:', url);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log('[Users] Raw response:', data);
      
      // Handle both paginated and plain array responses
      const users = data.results || data;
      console.log('[Users] Processed data:', users);
      return Array.isArray(users) ? users : [];
    } catch (error) {
      console.error('[Users] Error:', error);
      return [];
    }
  },

  /**
   * Fetch leaderboard data from backend  
   * @returns {Promise<Array>} Raw leaderboard data
   */
  async fetchLeaderboard() {
    try {
      const url = getApiUrl('/api/leaderboard/');
      console.log('[Leaderboard] Fetching from:', url);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log('[Leaderboard] Raw response:', data);
      
      // Handle both paginated and plain array responses
      const leaderboard = data.results || data;
      console.log('[Leaderboard] Processed data:', leaderboard);
      return Array.isArray(leaderboard) ? leaderboard : [];
    } catch (error) {
      console.error('[Leaderboard] Error:', error);
      return [];
    }
  },

  /**
   * Fetch workouts from backend
   * @returns {Promise<Array>} Raw workouts data
   */
  async fetchWorkouts() {
    try {
      const url = getApiUrl('/api/workouts/');
      console.log('[Workouts] Fetching from:', url);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log('[Workouts] Raw response:', data);
      
      // Handle both paginated and plain array responses
      const workouts = data.results || data;
      console.log('[Workouts] Processed data:', workouts);
      return Array.isArray(workouts) ? workouts : [];
    } catch (error) {
      console.error('[Workouts] Error:', error);
      return [];
    }
  },

  /**
   * Get API health status
   * @returns {Promise<boolean>} True if API is reachable
   */
  async checkHealth() {
    try {
      const url = getApiUrl('/api/');
      console.log('[Health] Checking API health at:', url);
      const response = await fetch(url);
      console.log('[Health] API is', response.ok ? 'UP ✓' : 'DOWN ✗');
      return response.ok;
    } catch (error) {
      console.error('[Health] API health check failed:', error);
      return false;
    }
  },
};

export default api;

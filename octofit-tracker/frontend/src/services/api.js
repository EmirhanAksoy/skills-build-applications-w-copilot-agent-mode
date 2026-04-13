/**
 * API Service for OctoFit Tracker
 * Handles all backend API calls and data transformation
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = {
  /**
   * Fetch activities from backend
   * @returns {Promise<Array>} Transformed activities data
   */
  async fetchActivities() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/activities/`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      return data.map((item) => [
        item.user_email || 'Unknown',
        item.type || 'N/A',
        item.duration ? `${item.duration} min` : 'N/A',
        item.date || 'N/A',
      ]);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      return [];
    }
  },

  /**
   * Fetch teams from backend
   * @returns {Promise<Array>} Transformed teams data
   */
  async fetchTeams() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/teams/`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      return data.map((item) => [
        item.name || 'Unknown',
        item.description || 'N/A',
      ]);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
      return [];
    }
  },

  /**
   * Fetch users from backend
   * @returns {Promise<Array>} Transformed users data
   */
  async fetchUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      return data.map((item) => [
        item.name || 'Unknown',
        item.email || 'N/A',
        item.team_name || 'N/A',
      ]);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  },

  /**
   * Fetch leaderboard data from backend
   * @returns {Promise<Array>} Transformed leaderboard data
   */
  async fetchLeaderboard() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leaderboard/`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      return data.map((item) => [
        item.rank || 'N/A',
        item.user_email || 'Unknown',
        item.points || 0,
      ]);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      return [];
    }
  },

  /**
   * Fetch workouts from backend
   * @returns {Promise<Array>} Transformed workouts data
   */
  async fetchWorkouts() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workouts/`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      return data.map((item) => [
        item.name || 'Unknown',
        item.description || 'N/A',
        item.suggested_for || 'All',
      ]);
    } catch (error) {
      console.error('Failed to fetch workouts:', error);
      return [];
    }
  },

  /**
   * Get API health status
   * @returns {Promise<boolean>} True if API is reachable
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/`);
      return response.ok;
    } catch (error) {
      console.warn('API health check failed:', error);
      return false;
    }
  },
};

export default api;

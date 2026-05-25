// Utility functions for the application

/**
 * Generate a random team code
 * @returns {string} Random team code
 */
export const generateTeamCode = () => {
  return 'TEAM' + Math.random().toString(36).substring(2, 7).toUpperCase();
};

/**
 * Format date to Turkish locale
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate team code format
 * @param {string} code - Team code to validate
 * @returns {boolean} Is valid code
 */
export const isValidTeamCode = (code) => {
  return code && code.length >= 4 && code.length <= 10;
};

/**
 * Get initials from email
 * @param {string} email - User email
 * @returns {string} Initials
 */
export const getInitials = (email) => {
  return email
    .split('@')[0]
    .split('')
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

/**
 * Sort teams by trophies (descending)
 * @param {Array} teams - Array of teams
 * @returns {Array} Sorted teams
 */
export const sortTeamsByTrophies = (teams) => {
  return [...teams].sort((a, b) => b.trophies - a.trophies);
};

/**
 * Filter teams by name
 * @param {Array} teams - Array of teams
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered teams
 */
export const filterTeamsByName = (teams, searchTerm) => {
  return teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Calculate team level based on trophies
 * @param {number} trophies - Team trophies
 * @returns {string} Team level
 */
export const getTeamLevel = (trophies) => {
  if (trophies < 100) return 'Başlangıç';
  if (trophies < 500) return 'Gelişen';
  if (trophies < 1000) return 'Deneyimli';
  if (trophies < 2000) return 'İleri';
  return 'Profesyonel';
};

/**
 * Get full image URL from a path
 * @param {string} path - The relative path or full URL
 * @returns {string} - The resolved full image URL
 */
const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;

  let baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  // Remove trailing slash from baseUrl if present
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }

  // Ensure path starts with a single slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
};

export default getImageUrl;

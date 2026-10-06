
/**
 * Function to get absolute image URL
 * @param {string} url - The relative or absolute image URL
 * @returns {string} - The absolute image URL
 */
const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;

  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  // Ensure we don't have double slashes if url starts with /
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${baseUrl}${cleanUrl}`;
};

export default getImageUrl;

/**
 * Unified navigation helper that prevents flashing during route changes
 * 
 * Uses smooth transitions and consistent routing for all navigation actions
 */

export function navigate(path: string) {
  // Normalize path - remove leading slash if present
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // For root path, just clear the hash
  if (normalizedPath === '' || normalizedPath === '/') {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
    return;
  }
  
  // For hash-based routes (like #kviz, #objednavka)
  if (normalizedPath.startsWith('#')) {
    window.history.pushState({}, '', normalizedPath);
    window.dispatchEvent(new Event('popstate'));
    return;
  }
  
  // For path-based routes (like /kviz, /objednavka)
  // Convert to path if it doesn't start with /
  const finalPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
  window.history.pushState({}, '', finalPath);
  window.dispatchEvent(new Event('popstate'));
}

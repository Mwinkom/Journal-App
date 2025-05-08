const STORAGE_KEY = 'journalEntries';

/**
 * Save journal entries to localStorage
 * @param {Array} entries
 */
export function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Load journal entries from localStorage
 * @returns {Array}
 */
export function getEntries() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

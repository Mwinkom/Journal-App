/**
 * @jest-environment jsdom
 */
import { saveEntries, getEntries } from '../js/storage.js';

describe('LocalStorage Persistence', () => {
  const STORAGE_KEY = 'journalEntries';
  const mockEntries = [
    {
      mood: '😊',
      title: 'My Happy Day',
      date: '2025-05-15',
      content: 'This is a test entry'
    }
  ];

  beforeEach(() => {
    localStorage.clear(); 
  }); // Clear localStorage before each test

  it('saves entries to localStorage', () => {
    saveEntries(mockEntries);

    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).not.toBeNull();

    const parsed = JSON.parse(stored);
    expect(parsed).toEqual(mockEntries);
  });

  it('retrieves entries from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEntries));

    const result = getEntries();
    expect(result).toEqual(mockEntries);
  });

  it('returns empty array if no data in localStorage', () => {
    const result = getEntries();
    expect(result).toEqual([]);
  });
});
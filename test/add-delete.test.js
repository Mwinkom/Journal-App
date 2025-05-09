/**
 * @jest-environment jsdom
 */
import { addEntry, deleteEntry } from '../js/add-delete.js';

describe('Add & Delete Logic', () => {
  let journalEntries;
  let mockEntry;

  beforeEach(() => {
    journalEntries = [];
    mockEntry = {
      mood: '😄',
      title: 'Test Entry',
      date: '2025-05-15',
      content: 'This is a test'
    };
  });

  test('adds an entry to the list', () => {
    addEntry(mockEntry, journalEntries);
    expect(journalEntries.length).toBe(1);
    expect(journalEntries[0].title).toBe('Test Entry');
  });

  test('deletes an entry from the list', () => {
    addEntry(mockEntry, journalEntries);
    deleteEntry(mockEntry, journalEntries);
    expect(journalEntries.length).toBe(0);
  });

  test('does nothing if entry is not found', () => {
    const otherEntry = { ...mockEntry, title: 'Other' };
    deleteEntry(otherEntry, journalEntries);
    expect(journalEntries.length).toBe(0);
  });
});

import { addEntryCard, refreshEntriesUI } from '../js/ui.js';

describe('UI DOM Interactions', () => {
  const mockEntries = [
    { mood: '😄', title: 'Smile', date: '2025-05-10', content: 'Fun day' },
    { mood: '😔', title: 'Tough', date: '2025-05-11', content: 'Long day' }
  ];

  beforeEach(() => {
    document.body.innerHTML = `
        <input type="date" id="entry-date" />
        <div class="entries"></div>
        <div id="toast"></div>
    `;
    });

  it('adds a single entry card to the DOM', () => {
    addEntryCard(mockEntries[0], () => {}, () => {});

    const cards = document.querySelectorAll('.entry-card');
    expect(cards.length).toBe(1);
    expect(cards[0].querySelector('h3').textContent).toContain('Smile');
  });

  it('refreshEntriesUI replaces all entry cards', () => {
    refreshEntriesUI(mockEntries, () => {}, () => {});
    const cards = document.querySelectorAll('.entry-card');

    expect(cards.length).toBe(2);
    expect(cards[1].textContent).toContain('Tough');
  });
});

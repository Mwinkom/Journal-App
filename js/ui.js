// Import journalEntries to use inside refreshEntriesUI
import { journalEntries } from './journal.js';

// Add entry card to the journal
// This function creates a new card and returns it
export function addEntryCard(journalEntry, onEdit, onDelete) {
    const entriesContainer = document.querySelector('.entries');
    const entryCard = document.createElement('div');
    entryCard.classList.add('entry-card');

    entryCard.innerHTML = `
        <h3>${journalEntry.mood} ${journalEntry.title}</h3>
        <div class="entry-date">${journalEntry.date}</div>
        <p>${journalEntry.content}</p>
        <div class="entry-actions">
            <button title="Edit" class="edit"><i class="fas fa-edit"></i></button>
            <button title="Delete" class="delete"><i class="fas fa-trash"></i></button>
        </div>
    `;

    // Shorten content text if needed
    const subText = entryCard.querySelector('p');
    if (journalEntry.content.length > 100) {
        subText.textContent = subText.textContent.substring(0, 99) + " . . .";
    }

    // Return the card for event attachment
    return entryCard;
}

// Handle the card buttons (edit and delete)
// Called after creating a card
export function handleCardButtons(entryCard, journalEntry, onEdit, onDelete) {
    entryCard.addEventListener('click', (event) => {
        const target = event.target;
        const button = target.closest('button');

        if (!button) return;

        if (button.classList.contains('delete')) {
            onDelete(journalEntry); // Trigger delete callback
        }

        if (button.classList.contains('edit')) {
            onEdit(journalEntry); // Trigger edit callback
        }
    });

    // Append the card to the DOM
    const entriesContainer = document.querySelector('.entries');
    entriesContainer.appendChild(entryCard);
}

// Refresh the entire journal UI
// Called after edits or deletes
export function refreshEntriesUI(entries, onEdit, onDelete) {
    const entriesContainer = document.querySelector('.entries');
    entriesContainer.innerHTML = ''; // Clear all cards

    entries.forEach(entry => {
        const card = addEntryCard(entry, onEdit, onDelete);
        handleCardButtons(card, entry, onEdit, onDelete);
    });
}

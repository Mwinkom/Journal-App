// Import journalEntries to use inside refreshEntriesUI
import { journalEntries, onEditCallback, onDeleteCallback} from './journal.js';

const entriesContainer = document.querySelector('.entries');
// Add entry card to the journal
// This function creates a new card and returns it
export function addEntryCard(journalEntry, onEdit, onDelete) {
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

    // Attach button event handlers
    handleCardButtons(entryCard, journalEntry, onEdit, onDelete);

    entriesContainer.appendChild(entryCard);

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
            document.getElementById('save-error').textContent = '';
            onEdit(journalEntry); // Trigger edit callback
        }
    });
}

// Refresh the entire journal UI
// Called after edits or deletes
export function refreshEntriesUI(entries, onEdit, onDelete) {
    const entriesContainer = document.querySelector('.entries');
    entriesContainer.innerHTML = ''; // Clear all cards

    entries.forEach(entry => {
        addEntryCard(entry, onEdit, onDelete);
    });
}


// Show a toast message for 3 seconds
export function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
  
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
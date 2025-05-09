import { addEntryCard, handleCardButtons, refreshEntriesUI, showToast } from "./ui.js";
import { saveEntries, getEntries } from "./storage.js";
import { filterEntries } from "./filter.js";

let isEditing = false; // Flag to check if we are in edit mode
let editIndex = null;  // Index of the entry being edited
const saveBtn = document.querySelector('.btn-primary');

const dateInput = document.getElementById('entry-date');
const today = new Date().toISOString().split('T')[0]; // Format date to YYYY-MM-DD
dateInput.value = today;

// Apply filters to the journal entries
// Filter by mood and search term
const searchBar = document.querySelector('.search-bar');

searchBar.addEventListener('input', applyFilters);  // Handles typing in input
searchBar.addEventListener('change', applyFilters); // Handles mood change

function applyFilters() {
  const searchTerm = document.getElementById('search-input').value;
  const selectedMood = document.getElementById('mood-filter').value;

  const filtered = filterEntries(journalEntries, selectedMood, searchTerm);
  refreshEntriesUI(filtered, onEditCallback, onDeleteCallback);
}


// Define the JournalEntry class
class JournalEntry {
    constructor(mood, title, date, content) {
        this.mood = mood;
        this.title = title;
        this.date = date;
        this.content = content;
    }
}

// Create an array to hold journal entries in memory
export const journalEntries = getEntries(); // Load saved entries on page load

saveBtn.addEventListener('click', () => {
    const mood = document.getElementById('mood');
    const title = document.getElementById('title');
    const date = document.getElementById('entry-date');
    const content = document.getElementById('entry');

    // Validate form input
    if (mood.value == "" || title.value.trim() == "" || date.value == "" || content.value.trim() == "") {
        document.getElementById('save-error').innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Please fill in all fields!`;
        return;
    }

    document.getElementById('save-error').textContent = '';

    if (isEditing && editIndex !== null) {
        showToast("Your entry was updated successfully!");

        // Update the existing journal entry
        journalEntries[editIndex].mood = mood.value;
        journalEntries[editIndex].title = title.value;
        journalEntries[editIndex].date = date.value;
        journalEntries[editIndex].content = content.value;

        // Reset edit mode
        isEditing = false;
        editIndex = null;
        saveBtn.textContent = "Save Entry";
        saveEntries(journalEntries); // Save to localStorage
        // Re-render all entries with updates
        refreshEntriesUI(journalEntries, onEditCallback, onDeleteCallback);
        applyFilters();
        

    } else {
        // Add a new journal entry
        const newEntry = new JournalEntry(mood.value, title.value, date.value, content.value);
        journalEntries.push(newEntry);
        saveEntries(journalEntries); // Save to localStorage

        showToast("Your entry was saved successfully!");

        addEntryCard(newEntry, onEditCallback, onDeleteCallback);
        applyFilters();
    }

    // Reset form fields
    mood.value = "";
    title.value = "";
    date.value = today;
    content.value = "";
});

console.log(journalEntries);

// Callback for Edit button
export function onEditCallback(entry) {
    editIndex = journalEntries.indexOf(entry);
    isEditing = true;

    document.getElementById('mood').value = entry.mood;
    document.getElementById('title').value = entry.title;
    document.getElementById('entry-date').value = entry.date;
    document.getElementById('entry').value = entry.content;

    // Scroll to the form section smoothly
    document.querySelector('.section-wrapper').scrollIntoView({ behavior: 'smooth' });

    saveBtn.textContent = "Save Updates";
}

// Callback for Delete button
export function onDeleteCallback(entry) {
    const confirmDelete = confirm("Are you sure you want to delete this journal entry?");
    if (!confirmDelete) return;

    const index = journalEntries.indexOf(entry);
    if (index !== -1) {
        journalEntries.splice(index, 1); 
        refreshEntriesUI(journalEntries, onEditCallback, onDeleteCallback);
    }
}

refreshEntriesUI(journalEntries, onEditCallback, onDeleteCallback);

export function addEntryCard (journalEntry){
    const entriesContainer = document.querySelector('.entries');
    const entryCard = document.createElement('div');
    entryCard.classList.add('entry-card');

    entryCard.innerHTML = `
        <h3>${journalEntry.mood} ${journalEntry.title}</h3>
        <div class="entry-date">${journalEntry.date}</div>
        <p>${journalEntry.content}</p>
        <div class="entry-actions">
            <button title="Edit"><i class="fas fa-edit"></i></button>
            <button title="Delete"><i class="fas fa-trash red"></i></button>
        </div>
    `  
    const subText = entryCard.querySelector('p');
    if (journalEntry.content.length > 100){
        subText.textContent = subText.textContent.substring(0,99) + " ...";
    }

    entriesContainer.appendChild(entryCard);
};













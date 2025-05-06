import { addEntryCard } from "./ui.js";

const saveBtn = document.querySelector('.btn-primary');

//Define the JournalEntry class
class JournalEntry{
    constructor(mood,title,date,content){
        this.mood = mood;
        this.title = title;
        this.date = date;
        this.content = content;
    }
}

//Create an array to hold journal entries
//This will be used to store the journal entries in memory
const journalEntries = [];


saveBtn.addEventListener('click', () => {
    const mood = document.getElementById('mood');
    const title = document.getElementById('title');
    const date = document.getElementById('entry-date');
    const content = document.getElementById('entry');

    //Push the new journal entry to the array
    //Check if the fields are empty before pushing to the array
    if(mood.value == "" || title.value.trim() == "" || date.value == "" || content.value.trim() == ""){
        document.getElementById('save-error').innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>
                                                            Please fill in all fields!`
    }
    else{
        document.getElementById('save-error').textContent = ''

        const newEntry = new JournalEntry(mood.value, title.value, date.value, content.value);

        journalEntries.push(newEntry);

        mood.value = "";
        title.value = "";
        date.value = "";
        content.value = "";

        //Call the addEntryCard function to add the new entry to the UI
        addEntryCard(newEntry);
    }
})

console.log(journalEntries)
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
        document.getElementById('save-error').textContent = 'Please fill in all fields first!'
    }
    else{
        document.getElementById('save-error').textContent = ''
        journalEntries.push(
            new JournalEntry(mood.value, title.value, date.value, content.value)
        );

        mood.value = "";
        title.value = "";
        date.value = "";
        content.value = "";
    }
})

console.log(journalEntries)
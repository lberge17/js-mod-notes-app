const app = document.getElementById("app")

document.addEventListener("DOMContentLoaded",  handleEvents)
    // all functions he

    function handleEvents(){
        getNotes()
    }

    let notes

    async function getNotes(){
        fetch('http://localhost:3000/notes')
            .then(resp => resp.json())
            .then(data => {
                displayNotes(data)
            })
    }

function displayNotes(notes){
    
    notes.forEach((note) => {
        let note_div = document.createElement('div')
        note_div.innerHTML = note.title
        app.appendChild(note_div)
    }) 
}
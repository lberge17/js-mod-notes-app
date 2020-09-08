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
        note_div.setAttribute("data-id",note.id)

        let delete_button = document.createElement('button')
        delete_button.innerHTML = "Delete Note"
        delete_button.setAttribute('delete-id',note.id)

        delete_button.addEventListener('click',function(e){
            confirm("Are you sure you want to delete the note?")

            deleteNote(e.target.getAttribute("delete-id"))

            e.preventDefault()
        })

        note_div.append(delete_button)

        app.appendChild(note_div)
    }) 
}

function deleteNote(note_id){
    configObj ={
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(`http://localhost:3000/notes/${note_id}`,configObj)
        .then(resp => resp.json())
        .then(function(obj){
            let note = app.querySelector(`[data-id='${obj.id}']`)
            note.parentNode.removeChild(note)
        })
}
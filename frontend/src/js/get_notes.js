
import { createNote } from "./createNote"
export const get_notes = async ()=>{
    let notes_wrapper = document.getElementById('notes-wrapper')
    try{
        let response = await fetch('http://127.0.0.1:8000/tasks')
            if(!response.ok){
                throw new Error('Error al obtener las task')
            }
        const notes = await response.json()
        for(const n of notes){
            let div_note = createNote(n)
            notes_wrapper.append(div_note)
            }
      }
  catch (error){
    console.error(error)
  }
}
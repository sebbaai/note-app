import { get_notes } from "./get_notes"
import { postNote } from "./post_note"
let btn_get_notes= document.getElementById('button_notelist')
let form = document.getElementById('form')
let btn_put = document.getElementById('btn_id')

form.addEventListener('submit', ()=>{
  postNote()
})
btn_get_notes.addEventListener('click',()=>{
  get_notes()
})

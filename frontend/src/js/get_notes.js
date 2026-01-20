import { putNote } from "./put_note"
export const get_notes = async ()=>{
    let notes_wrapper = document.getElementById('notes-wrapper')
    try{
        let response = await fetch('http://127.0.0.1:8000/tasks')
            if(!response.ok){
                throw new Error('Error al obtener las task')
            }
        const notes = await response.json()
        for(const n of notes){
            let div = document.createElement('div')
            let h2 = document.createElement('h2')
            let p1 = document.createElement('p')
            let p2 = document.createElement('p')
            let btn_checked = document.createElement('button')
            let btn_update = document.createElement('button')
            let btn_delete = document.createElement('button')
            let input_h2 = document.createElement('input')
            let input_p1 = document.createElement('input')
            let input_p2 = document.createElement('input')
            h2.textContent = n.name
            p1.textContent = n.description
            p2.textContent = n.date

            div.classList.add('div_notes')
            btn_checked.classList.add('btn_checked')
            btn_update.classList.add('btn_update')
            btn_delete.classList.add('btn_delete')

            btn_update.addEventListener('click', async ()=>{
                h2.replaceWith(input_h2)
                input_h2.placeholder = h2.textContent
                input_h2.value = h2.textContent
                p1.replaceWith(input_p1)
                input_p1.placeholder = p1.textContent
                input_p1.value = p1.textContent 
                p2.replaceWith(input_p2)
                input_p2.placeholder = p2.textContent
                input_p2.value = p2.textContent
                let button_update = document.createElement('button')
                button_update.textContent = 'ACTUALiZAR'
                div.appendChild(button_update)
                let response = await fetch('http://127.0.0.1:8000/tasks')
                if(!response.ok){
                    throw new Error('Ha ocurrido un error mientras se solicitaban los datos al servidor.')
                }else{
                    let tasks = await response.json()
                    for(let task of tasks){
                        if(task.name == h2.textContent){
                            button_update.addEventListener('click', ()=>{
                            putNote(task.id, input_h2.value, input_p1.value, input_p2.value, task.state, task.created_at, task.update_at)
                            })
                        }
                        

                    }
                }
            })
            btn_delete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f5f1e1"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>'
            btn_update.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f5f1e1"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>'
            btn_checked.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#252525"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>'
            div.append(h2,p1,p2, btn_checked, btn_update, btn_delete)
      notes_wrapper.append(div)
      }
  }
  catch (error){
    console.error(error)
  }
}
import { createElement } from "./create_element"
import { putNote } from "./put_note"
import { deleteNote } from "./delete_note"
export const createNote = (n)=>{
    let function_state = true
    let div_state = false
    /* Creacion del elemento Note con sus respectivos subelementos y clases.*/
    let div_note = createElement('div', ['div_notes', 'flex', 'column', 'aicenter'])
    let title_note = createElement('h2', ['title_note'])
    let subtitle_note = createElement('h3', ['subtitle_note'])
    let description_note = createElement('p', ['description_note'])
    let checkbox_remember = createElement('input', ['input_note'])
    let remember_text = createElement('p', ['remember_text'])
    let div_buttons = createElement('div', ['div_buttons'])
    let button_note_menu = createElement('button', ['div_buttons_div'])
    let btn_checked = createElement('button', ['div_notes_button', 'btn_checked'])
    let btn_update = createElement('button', ['div_notes_button', 'btn_update'])
    let btn_delete = createElement('button', ['div_notes_button', 'btn_delete'])
    let input_title = createElement('input', [])
    let input_description = createElement('input', [])
    /* Asignacion de atributos */
    title_note.textContent = n.name
    subtitle_note.textContent = 'Haga click para mas informacion.'
    description_note.textContent = n.description
    checkbox_remember.type = 'checkbox'
        if(n.remember == true){
            remember_text.textContent = 'Será recordado.'
        }else{
            remember_text.textContent = 'No está configurado para ser recordado.'
        }
        button_note_menu.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e3e3e3"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>'
        btn_delete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f5f1e1"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>'
        btn_update.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f5f1e1"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>'
        btn_checked.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#252525"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>'
        /* Agrupacion*/ 
            div_buttons.append(btn_checked, btn_update, btn_delete)
            div_note.append(title_note, description_note, subtitle_note, checkbox_remember, remember_text, button_note_menu, div_buttons)
        /* Eventos */
        /* Despliegue de nota */
        div_note.addEventListener('dblclick', ()=>{
                div_note.classList.toggle('closed')
                subtitle_note.classList.toggle('transparent')
                remember_text.classList.toggle('rt_left')
                description_note.classList.toggle('appear')
            })
        /* Despliegue de botones */
             button_note_menu.addEventListener('click', ()=>{
                if(div_buttons.style.display != 'none'){
                    div_buttons.style.display = 'none'
                }else if(div_buttons.style.display == 'none'){
                    if(div_note.offsetHeight <= 150){
                        div_note.style.height = '180px'
                        div_buttons.style.display = 'flex'
                    }

                }
            })
        /* Eliminacion de nota */
            btn_delete.addEventListener('click', async ()=>{
                deleteNote(n.id)
                })
        /* Actualizacion de nota */
            let button_update = document.createElement('button')
            btn_update.addEventListener('click', async ()=>{
                    if(function_state == true){
                        console.log(function_state)
                        btn_update.style.backgroundColor = '#1750e4'
                        function_state = false
                        input_title.placeholder = title_note.textContent
                        input_title.value = title_note.textContent
                        input_description.placeholder = description_note.textContent
                        input_description.value = description_note.textContent
                        button_update.textContent = 'ACTUALIZAR'
                        button_update.style.display = 'flex'

                        title_note.replaceWith(input_title)
                        description_note.replaceWith(input_description)
                        div_note.appendChild(button_update)

                        let response = await fetch('http://127.0.0.1:8000/tasks')
                        if(!response.ok){
                            throw new Error('Ha ocurrido un error mientras se solicitaban los datos al servidor.')
                        }else{
                            let tasks = await response.json()
                            for(let task of tasks){
                                if(task.name == title_note.textContent){
                                    button_update.addEventListener('click', ()=>{
                                    putNote(n.id, input_title.value, input_description.value)
                                    function_state = false

                                    title_note.textContent = input_title.value
                                    description_note.textContent = input_description.value

                                    title_note.replaceWith(input_title)
                                    description_note.replaceWith(input_description)

                                    })
                                }
                            }
                        }
                    }else if(function_state == false){
                        console.log(function_state)
                                btn_update.style.backgroundColor = '#3b82f6'
                                function_state = true
                                title_note.textContent = input_title.value
                                description_note.textContent = input_description.value


                                input_title.replaceWith(title_note)
                                input_description.replaceWith(description_note)


                                button_update.style.display = "none"
                            }
                        })
        return div_note
    }

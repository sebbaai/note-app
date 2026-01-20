import { comprobar_estado } from "./comprobar_estado"
export const postNote = async ()=>{
    let task_name = document.getElementById('input_task_name')
    let task_description = document.getElementById('input_task_description')
    let task_date = document.getElementById('input_task_date')
    let task_checkbox = document.getElementById('input_checkbox')
    const task = {
        'id':  0,    
        'name': task_name.value.trim(),
        'description': task_description.value.trim(),
        'date': task_date.value,
        'state': task_checkbox.checked,
        'created_at': 'null',
        'update_at': 'null'
    }
    try{
      let response = await fetch('http://127.0.0.1:8000/tasks',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
      }
      )
      document.body.appendChild(comprobar_estado(response))
        task_name.value = null
        task_description.value = null
        task_date.value = null
        task_checkbox.checked = false
    }
    catch (error){
      console.error(error)
    }
}
     



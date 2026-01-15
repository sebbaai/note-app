let form = document.getElementById('form')
let button_post = document.getElementById('button_post_note')
document.addEventListener('DOMContentLoaded', ()=>{
  form.addEventListener('submit', async ()=>{
      let task_name = document.getElementById('input_task_name')
      let task_description = document.getElementById('input_task_description')
      let task_date = document.getElementById('input_task_date')
      let task_checkbox = document.getElementById('input_checkbox')

      const task = {
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
      if(!response.ok){
        throw new Error('Error HTTP')
      }else{
        alert('Mensaje enviado!')
        task_name.value = null
        task_description.value = null
        task_date.value = null
        task_checkbox.checked = false
      }
    }
    catch (error){
      console.error(error)
    }
})
  })


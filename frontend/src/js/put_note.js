
export const putNote = async (id, name, description, date, state, created_at, update_at)=>{
    const task = {
        'id': id,
        'name': name,
        'description': description,
        'date': date,
        'state': state,
        'created_at': created_at,
        'update_at': update_at
    }
    let response = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    })
    if(!response.ok){
        throw new Error('Error al actualizar. Intentelo otra vez porfavor')
    }else{
        console.log('Todo bien capo')
    }
}

export const putNote = async (id, name, description, date, remember, created_at, update_at)=>{
    const task = {
        'name': name,
        'description': description,
        'remember': remember,
    }
    let response = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    })
    if(!response.ok){
        throw new Error('Error al actualizar. Intentelo otra vez porfavor')
    }else{
        console.log('Todo bien capo')
    }
}
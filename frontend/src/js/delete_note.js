export const deleteNote = (id)=>{
    let response = fetch(`http://127.0.0.1:8000/tasks/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok){
        throw new Error('Algo ha salido mal al intentar eliminar la nota.')
    }else{
        console.log('Todo bien')
    }
}
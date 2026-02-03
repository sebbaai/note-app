export const deleteNote = async (id)=>{
    let response = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok){
        throw new Error('Algo ha salido mal al intentar eliminar la nota.')
        return false
    }else{
        console.log('Todo bien')
        return true
    }
}
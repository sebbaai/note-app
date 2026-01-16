export const comprobar_estado = (response)=>{
    let modal = document.createElement('div')
    let p = document.createElement('p')
    modal.appendChild(p)
    if(!response.ok){
        modal.classList.add('modal_negative')
        p.textContent = 'Ha ocurrido un error, intentelo de nuevo porfavor.'
    }else{
        modal.classList.add('modal_positive')
        p.textContent = 'Anotado!'
    }
     setTimeout(()=>{
        modal.remove()
    }, 3000)
    return modal
}
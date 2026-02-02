export const createElement = (type, classes = [])=>{
    try{
        let element = document.createElement(type)
        if(classes.length){
            element.classList.add(...classes)
        }
        return element
    }
    catch{
        console.error('Ha ocurrido un error al crear el elemento.')
    }
}
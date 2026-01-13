let boton = document.getElementById('button');
let input_name = document.getElementById('input_name');
let input_surname = document.getElementById('input_surname');
let input_age = document.getElementById('input_age');
boton.addEventListener('click', async (e)=>{
  e.preventDefault()
  const user = {
    name: input_name.value.trim(),
    surname: input_surname.value.trim(),
    age: Number(input_age.value.trim())
  }
  try{
  const response = await fetch('http://127.0.0.1:8000/users', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  })
  if(!response.ok){
    throw new Error(response.status)
  }
  const data = await response.json()
  console.log('Informacion:' + data)
}
  catch (error){
    console.error(error)
  }
})

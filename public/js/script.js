const form = document.getElementById('form')// SELECTIONNER L'ELEMTENT FORM
const input = document.getElementById('input') // SLECTIONNER LE INPOUT
const todosUL = document.getElementById('todos') // SELECTIONNER LES TODOS
let User =JSON.parse(localStorage.getItem('LoggedUser'))
let Users = JSON.parse(localStorage.getItem("Users"))
let UsrIndex = localStorage.getItem("UserIndex");
let saveBtn = document.querySelector(".Btn");
let todos =[];

// if(todos) {
//     todos.forEach(todo => addTodo(todo))  // je vais parcourir le tableau todos et ajouter un todo
// }  


form.addEventListener('submit', (e) => { // ecoute un evenement soummettre formulaire
    e.preventDefault() //  evite que la page se recharge

    addTodo() // aappel de la fonction  qui permet d'ajouter apres soumission du formulaire
})

function addTodo(todo) {
    let todoText = input.value // recupere de la valeur  qui a ete soumis dans le inpout

    if(todo) {
        todoText = todo.text // recupere la valeur  text de todo
    }


    // ajouter des elements dans le DOM
    if(todoText) {
        const todoEl = document.createElement('li') // creation d'une li pour 
        if(todo && todo.completed) {  //  verification du statut accomplie d'une tache  
            todoEl.classList.add('completed')  // ajout de la classe CSS "compoleted"
        }

        todoEl.innerText = todoText // insertion de text dans la nouvelle li

        todoEl.addEventListener('click', () => { // ecoute de l'event de type click
            todoEl.classList.toggle('completed') // equivant  if(todoEl.classList.contains("completed")) {
            //     todoEl.removeClass("completed")
            // }else{
            //     todoEl.addClass('completed');
            // }
            
            updateLS()
        }) 

        
        todoEl.addEventListener('contextmenu', (e) => { //ajout d'un evenement click droit
            e.preventDefault() 

            todoEl.remove() // supprimer une todo 
            updateLS() //maj
        }) 

        todosUL.appendChild(todoEl)   // ajout de la DOM 

        input.value = '' // reintialisation du input

        updateLS() // maj
    }
}

function updateLS() {
    todosEl = document.querySelectorAll('li')

       todos = [];
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })
}

function save(){
    let NameTodo = prompt("enter the todolist's name")
    const todoSave = {
        todoname: NameTodo,
        todosElements: todos
    }
    User.todos.push(todoSave);
    Users[UsrIndex] =User;
     let NewArrayOfUsr = JSON.stringify(Users)
     localStorage.setItem("Users",NewArrayOfUsr)
     localStorage.setItem("LoggedUser",JSON.stringify(User));
     location.href="dashboard.html"

} 

saveBtn.addEventListener("click",() =>{
    save();
})
const navbarSecond = document.querySelector(".navbar__second");
const navbarItems= document.querySelector('.navbar__items');
const openNav =document.getElementById("openNav");
const closeNav = document.getElementById("closeNav");
let userName = document.getElementById('userName')
const createTodoBtn = document.querySelector(".createTD");
const LogOutBtn =document.getElementById('logOutBtn')
let User =JSON.parse(localStorage.getItem('LoggedUser'));
let ContainerTd = document.querySelector(".ContainerTd");
let UsrIndex = localStorage.getItem("UserIndex");
let Users = JSON.parse(localStorage.getItem("Users"))
userName.innerText = User.lname +" "+ User.fname ;
let todos = User.todos;




// DEFINTION OF BUILD
const   BuildSimpleTodo = (todoId,todoName,TodosElements) =>{
 

  var liElements = " " ;
  for ( let i=0; i< TodosElements.length ;i++ ){
    let icon ;
    let iconId;
    if(TodosElements[i].completed === true){
      icon="fas" + " " +"fa-check";
      iconId ="green"
  }else{
    icon ="fas" + " " + "fa-window-close";
  iconId ="red"
  }
  if(TodosElements[i].text !== undefined){
    liElements += `<li class="TodoItem">${TodosElements[i].text}<i id=${iconId} class="${icon}"></i></li>`
  }

  }
   return `<div id="${todoId}" class="Todo">
                <h1 class="todoTitle">${todoName}</h1>`+`
                <ul class="todoList">
                ${liElements}
                </ul>
                ` +
           `</div>`

}

if(todos.length !==0){
  for (let td of todos){ 
    ContainerTd.innerHTML +=  BuildSimpleTodo(todos.indexOf(td),td.todoname,td.todosElements);
    
  }
  
}

let TodosEl = document.querySelectorAll(".Todo");


TodosEl.forEach( elt =>{
  elt.addEventListener("click",() =>{
    location.href ="modifyTodo.html"
    localStorage.setItem("todoIndex",elt.id)
  })
  elt.addEventListener('contextmenu', (e) => { 
    e.preventDefault();
    
      todos.splice(elt.id,1);
      User.todos = todos;
      Users[UsrIndex] =User;
      let NewArrayOfUsr = JSON.stringify(Users)
      localStorage.setItem("Users",NewArrayOfUsr)
      localStorage.setItem("LoggedUser",JSON.stringify(User));
      location.href ="dashboard.html"
   
} )
})


navbarSecond.addEventListener("click",() => {
      if(navbarItems.style.display === "none"){
        navbarItems.style.display = "flex";
        openNav.style.display="none";
        closeNav.style.display="block";
      }else{
        navbarItems.style.display = "none";
        closeNav.style.display="none";
        openNav.style.display="block";
        
      }
})

LogOutBtn.addEventListener('click',()=>{
  
  LogOut();
})



userName.addEventListener("click",() =>{
  location.href ="user.html";
})



const LogOut = () => {

  //  delete user info
  localStorage.removeItem("LoggedUser");
  // redirect to homePage
location.href='index.html'

}
createTodoBtn.addEventListener("click",()=>{
  location.href ="list.html";
})


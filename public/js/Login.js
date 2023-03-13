
let Users = JSON.parse(localStorage.getItem("Users"))


let LoginEmail = document.getElementById('Email');
let PasswordEmail = document.getElementById('Password');
let LoginBtn = document.querySelector('#LoginBtn');
let ErrorMessage = document.querySelector('.ErrorMessage');



const Login =  (email,password) =>{
    // check index of the user
    let index;
    Users.forEach(usr => {
        if(usr.email === email){
          index = Users.indexOf(usr)
        }
    })
if(index){
  let UserToCheck = Users[index];
    if (UserToCheck.password === password) {
       // save info of login User
      localStorage.setItem("LoggedUser",JSON.stringify(UserToCheck))
      // save user index
      localStorage.setItem("UserIndex",index);
      // redirection
  location.href="dashboard.html"
      
    } else {
      throw new Error(" Password does not match")
    }
     
     }else{
         throw new Error("this email does not exist")
     }
 }


 LoginBtn.addEventListener("click",() =>{
   
    try{
       Login(LoginEmail.value,PasswordEmail.value);
    }catch(err){
       ErrorMessage.style.display="block";
       ErrorMessage.classList.add("ErrorDisplay");
       ErrorMessage.innerText = err.message;
       setTimeout(()=>{
           ErrorMessage.style.display="none";
           ErrorMessage.classList.remove("ErrorDisplay");
       },1500)
    }
    
})
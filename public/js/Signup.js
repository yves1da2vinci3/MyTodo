let individuX = {email:"oooo@gmail.com",
fname:"bon",lname:"wew",password:"ui"
};
let ArrayState = [];
ArrayState.push(individuX);
let initialState =JSON.stringify(ArrayState)

localStorage.setItem("Users",initialState)

let Users = JSON.parse(localStorage.getItem("Users")) ;

// recieve every value
let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let Email = document.getElementById('Email');
let pwd = document.getElementById('pwd');
let Cpwd = document.getElementById('Cpwd');
let SignupBtn = document.getElementById('SignupBtn');
let ErrorMessage = document.querySelector('.ErrorMessage');





// login function 


const SignUp  =  (email,fname,lname,password,confirmPassword)  =>{
     if(password !== confirmPassword){
       
       throw new Error(" Password does not match");
     }else{
        
         let user ={
             fname ,
             lname,email,password,todos : []}
             Users.push(user);
     alert('Singup successfully');
      let NewArrayOfUsr = JSON.stringify(Users)
     localStorage.setItem("Users",NewArrayOfUsr);
     location.href="login.html"
     }
     
}





//
SignupBtn.addEventListener("click",() =>{
    try {
        SignUp(Email.value,fname.value,lname.value,pwd.value,Cpwd.value);
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
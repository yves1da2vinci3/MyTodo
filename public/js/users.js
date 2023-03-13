  // descritpion of users 
let User = JSON.parse(localStorage.getItem("LoggedUser"));
let Users = JSON.parse(localStorage.getItem("Users"))
let UsrIndex = localStorage.getItem("UserIndex");
// slection all inputs
let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let Email = document.getElementById('Email');
let pwd = document.getElementById('pwd');
let UpdateBtn = document.getElementById('UpdateBtn');

// display information on the screen
fname.value = User.fname;
lname.value = User.lname;
Email.value = User.email;
pwd.value = User.password;



UpdateBtn.addEventListener("click",() =>{
    UpdateUserInfo(Email.value,fname.value,lname.value,pwd.value,UsrIndex);
   })
  // modify information

  const UpdateUserInfo = (email,fname,lname,password,index) =>{
    // find index of the user modify
     userToModify = Users[index];
     //asign new value
     userToModify.fname =fname;
     userToModify.lname =lname;
     userToModify.email =email;
     userToModify.password =password;
     // put into array
     Users[index] =userToModify;
     let NewArrayOfUsr = JSON.stringify(Users)
     localStorage.setItem("Users",NewArrayOfUsr)
     localStorage.setItem("LoggedUser",JSON.stringify(userToModify));
     alert("update succesfully");
     location.href="dashboard.html";
  }



 
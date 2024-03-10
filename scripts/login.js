// taking inputs from the log-in form
const user = document.getElementById("user");
const pass = document.getElementById("pass");
const login = document.getElementById("login");




// logging-in a user
login.addEventListener("click", function () {
  data = localStorage.getItem("user");
  if (data) {
    userArray = JSON.parse(data);
  }
  let loggedIn=false;
  for (let i = 0; i < userArray.length; i++) {
    if(user.value===userArray[i].name && pass.value===userArray[i].password){
        window.location.href = "./pages/transaction.html";
        localStorage.setItem("loggedUser",user.value);
        loggedIn=true;
    }
  }
  if(!loggedIn){
    alert("Wrong Input!!!");
  }

});

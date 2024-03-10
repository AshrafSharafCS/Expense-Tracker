let userArray = [];
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmpassword");
const signUpbtn = document.getElementById("sign-up");

// adding a user to the users array in the lcoal storage
signUpbtn.addEventListener("click", function () {
  let name = username.value;
  let pass = password.value;
  let confirmpass = confirmPassword.value;
  
  if (pass === confirmpass) {
    let user = {
      name: name,
      password: pass,
    };
    AddLocally(user);
  } else {
    alert("Wrong Input!!!");
  }
});

function AddLocally(user) {
  const data = localStorage.getItem("user");
  if (data) {
    userArray = JSON.parse(data);
  }
  userArray.push(user);
  localStorage.setItem("user", JSON.stringify(userArray));
}

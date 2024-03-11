const addTrans = document.getElementById("add-transaction");
const currency = document.getElementById("currency");
const transactionType = document.getElementById("transaction-type");
const displayUSer = document.getElementById("displayuser");
const dataname = localStorage.getItem("loggedUser");
const view = document.getElementById("transaction-output");
const filterbtn = document.getElementById("filter-btn");
const filter = document.getElementById("filter");

displayUSer.innerHTML = dataname + "  Account";

let transactionArray = [];
let transArray = [];

function LoadData() {
  const data = localStorage.getItem("transactions");
  if (data) {
    transArray = JSON.parse(data);
  }
  transactionArray = transArray;
}

LoadData();
CallCurrency();
Loadtrans(transactionArray);

// filtering the transactions
filterbtn.addEventListener("click", function () {
  let filterr = filter.value;
  let filteredArray = [];
  if (filterr == "all") {
    Loadtrans(transactionArray);
  } else {
    for (let i = 0; i < transactionArray.length; i++) {
      if (filterr == transactionArray[i].type) {
        filteredArray.push(transactionArray[i]);
      }
    }
    Loadtrans(filteredArray);
  }
});

// adding a transaction
addTrans.addEventListener("click", function () {
  const transactionType = document.getElementById("transaction-type").value;
  const amount = document.getElementById("amount").value;
  const currency = document.getElementById("currency").value;
  MakeTransaction(transactionType, amount, currency);
});

function MakeTransaction(type, amount, currency) {
  let transaction = {
    type: type,
    amount: amount,
    currency: currency,
  };
  transactionArray.push(transaction);
  savelocal(transactionArray);
  Loadtrans(transactionArray);
}

// load transactions
function Loadtrans(transArray) {
  view.innerHTML = "";
  for (let i = 0; i < transArray.length; i++) {
    let trans = `<div class="trans flex center space-around" >
      <div>
        <h4>${transArray[i].type}</h4>
      </div>
      <div>
        <h4>${transArray[i].amount}</h4>
      </div>
      <div>
        <h4>${transArray[i].currency}</h4>
      </div>

      <div>
        <button class="btns" onclick="deletetrans(${i})" >Delete</button>
      </div
    </div>`;

    view.innerHTML += trans;
  }
}

// saving to local storage
function savelocal(arr) {
  localStorage.setItem("transactions", JSON.stringify(arr));
}

// delete transaction
function deletetrans(index) {
  transactionArray.splice(index, 1);
  savelocal(transactionArray);
  Loadtrans(transactionArray);
}

// logout function
function logout() {
  window.location.href = "../index.html";
  localStorage.setItem("loggedUser", null);
}
// fetching the api to get the currencies.
function CallCurrency() {
  result = fetch(
    "https://dull-pink-sockeye-tie.cyclic.app/students/available",
    {
      method: "GET",
    }
  );
  result
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        addOption(data[i].code, data[i].code);
      }
    });

  // function to create an option from the results of the API
  function addOption(value, code) {
    let select = document.getElementById("currency");
    let option = document.createElement("option");
    option.value = value;
    option.text = code;
    select.appendChild(option);
  }
}

// convert api
// function Convert() {

//     const dataa = JSON.stringify({
//     from: 'EUR',
//     to: 'USD',
//     amount: 800,
//   });

//   const request = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: dataa,
//   };

//   return fetch(
//     "https://rich-erin-angler-hem.cyclic.app/students/convert",
//     request
//   )
//   .then((response) => {
//       return response.json();
//     })
//     .then((result) => {
//       return result;
//     });
// }

// Convert()
// .then((data)=>{
//   if(data){
//   console.log(data);}

// });

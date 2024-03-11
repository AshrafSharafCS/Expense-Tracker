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
  console.log(Balance());
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
  Balance();
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
function Convert(from, to, amount) {
  const dataa = JSON.stringify({
    from: from,
    to: to,
    amount: amount, // Use the 'amount' parameter here
  });

  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: dataa,
  };

  return fetch(
    "https://dull-pink-sockeye-tie.cyclic.app/students/convert",
    request
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      return result;
    });
}


//  calculate the balance function using the convert API
function Balance() {
  let balance = 0;
  for (let i = 0; i < transactionArray.length; i++) {
    // first condition 
    if (transactionArray[i].currency == "USD") {
      if (transactionArray[i].type == "income") {
        balance += parseFloat(transactionArray[i].amount);
      } else {
        balance -= parseFloat(transactionArray[i].amount);
      }

      // converting from EUR to USD
    } else if (transactionArray[i].currency == "EUR") {
      Convert("EUR", "USD", transactionArray[i].amount).then((data) => {
        if (transactionArray[i].type == "income") {
          balance += parseFloat(data);
        } else {
          balance -= parseFloat(data);
        }
      });

      // converting from AED to USD
    } else if (transactionArray[i].currency == "AED") {
      Convert("AED", "USD", transactionArray[i].amount).then((data) => {
        if (transactionArray[i].type == "income") {
          balance += parseFloat(data);
        } else {
          balance -= parseFloat(data);
        }
      });

       // converting from LBP to USD
    } else if (transactionArray[i].currency == "LBP") {
      Convert("LBP", "USD", transactionArray[i].amount).then((data) => {
        if (transactionArray[i].type == "income") {
          console.log(data);
          balance += parseFloat(data);
        } else {
          balance -= parseFloat(data);
        }
      });
    }
  }
  return balance;
}

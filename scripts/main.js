const addTrans = document.getElementById("add-transaction");
const currency = document.getElementById("currency");
const transactionType = document.getElementById("transaction-type");
const displayUSer=document.getElementById("displayuser");
const dataname = localStorage.getItem("loggedUser");
const view=document.getElementById("transaction-output");
displayUSer.innerHTML=dataname+"  Account";


let transArray=[];

CallCurrency();



// adding a transaction
  addTrans.addEventListener("click", function () {
  const transactionType = document.getElementById("transaction-type").value;
  const amount = document.getElementById("amount").value;
  const currency = document.getElementById("currency").value;
  MakeTransaction(transactionType,amount,currency);

});

function MakeTransaction(type,amount,currency){

  let transaction = {
    user: dataname,
    type: type,
    amount:amount,
    currency:currency
  };
  Addtrans(transaction);
  view.innerHTML+=Viewtrans(transaction);
} 

function Addtrans(transaction) {
const data = localStorage.getItem("transactions");
if (data) {
  transArray = JSON.parse(data);
}
transArray.push(transaction);
localStorage.setItem("transactions", JSON.stringify(transArray));
}

function Viewtrans(transaction) {
  view.innerHTML = "";
  return `        <div class="trans flex center space-around" >
  <div>
    <h4>${transaction.type}</h4>
  </div>
  <div>
    <h4>${transaction.amount}</h4>
  </div>
  <div>
    <h4>${transaction.currency}</h4>
  </div>
  <div>
    <button class="btns" id="" >Edit</button>
  </div>
  <div>
    <button class="btns" id="" >Delete</button>
  </div>
</div>`;
}

















// fetching the api to get the currencies.
function CallCurrency() {
  result = fetch(
    "https://rich-erin-angler-hem.cyclic.app/students/available",
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







function Convert() {
  const dataa = JSON.stringify({
    from: "EUR",
    to: "USD",
    amount: 1000,
  });

  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: dataa,
  };

  return fetch(
    "https://rich-erin-angler-hem.cyclic.app/students/convert",
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

// Convert()
// .then((data)=>{
//   console.log(data);

// }) .catch((error) => {
//   console.error("Error:", error);
// });;
// Convert()

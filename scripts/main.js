const addTrans = document.getElementById("add-transaction");
const currency = document.getElementById("currency");
const tranactionType = document.getElementById("transaction-type");
const displayUSer=document.getElementById("displayuser");
const dataname = localStorage.getItem("loggedUser");
displayUSer.innerHTML=dataname+"  Account";


let transArray=[];

CallCurrency();



// adding a tranaction
  addTrans.addEventListener("click", function () {
  const tranactionType = document.getElementById("transaction-type").value;
  const amount = document.getElementById("amount").value;
  const currency = document.getElementById("currency").value;
  MakeTransaction(tranactionType,amount,currency);

});

function MakeTransaction(type,amount,currency){

  let tranaction = {
    user: dataname,
    type: type,
    amount:amount,
    currency:currency
  };
  Addtrans(tranaction);
} 

function Addtrans(transaction) {
const data = localStorage.getItem("transactions");
if (data) {
  transArray = JSON.parse(data);
}
transArray.push(transaction);
localStorage.setItem("transactions", JSON.stringify(transArray));
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

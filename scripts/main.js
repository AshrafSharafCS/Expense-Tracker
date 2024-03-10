const tranactions = [];

const addTrans = document.getElementById("add-transaction");
const currency = document.getElementById("currency").value;
const tranactionType = document.getElementById("transaction-type").value;

addTrans.addEventListener("click", function () {
  let amount = document.getElementById("amount").value;
  console.log(currency);

  // alert(tranactionType+"  "+amount+"  "+currency);
});

// fetching the api to get the currencies.
result = fetch("https://ivory-ostrich-yoke.cyclic.app/students/available", {
  method: "GET",
});
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

// let userData = new FormData();

// userData.append("from", "EUR");
// userData.append("to", "USD");
// userData.append("amount", 1000);

// let ashraf=JSON.stringify({
//   "from": "EUR",
//   "to": "USD",
//   "amount": 232
// });

// const created = fetch(
//   "https://ivory-ostrich-yoke.cyclic.app/students/convert",
//   {
//     method: "POST",
//     mode: "no-cors",
//     body: ashraf
//   }
// );

// created
//   .then((response) => {
//     return response;
//   })
//   .then((data) => {
//     console.log(data);
//   });

function Convert(){
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

fetch("https://ivory-ostrich-yoke.cyclic.app/students/convert", request)
  .then((response) => {
    return response.text();
  })
  .then((result) => {
    return result;
  });
}
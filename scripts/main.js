const tranactions = [];
const users = [];

const test=[
  {"name":"ashraf","password":"1234"},
  {"name":"qwer","password":"qwer"}
];



const addTrans = document.getElementById("add-transaction");
const currency = document.getElementById("currency");
const tranactionType = document.getElementById("transaction-type");























// addTrans.addEventListener("click", function () {
//   let amount = document.getElementById("amount").value;
//   console.log(currency);

//   alert(tranactionType+"  "+amount+"  "+currency);
// });

// fetching the api to get the currencies.
function CallingCurrency() {
  result = fetch(
    "https://crowded-cyan-wildebeest.cyclic.app/students/available",
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
    "https://crowded-cyan-wildebeest.cyclic.app/students/convert",
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

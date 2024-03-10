const tranactions = [];

const add = document.getElementById("add-transaction");

const tranactionType = document.getElementById("transaction-type").value;

// add.addEventListener("click", function () {
//   let amount = document.getElementById("amount").value;
// });


// fetching the api to get the currencies.
// result = fetch("https://ivory-ostrich-yoke.cyclic.app/students/available", {
//   method: "GET",
// });
// result
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     for(let i=0;i<data.length;i++){
//       addOption(data[i].symbol);
//     }
//   });

// function to create an option from the results of the API
  // function addOption(value){
  //   let select=document.getElementById("currency");
  //   let option=document.createElement("option");
  //   option.value= value;
  //   option.text=value;
  //   select.appendChild(option);

  // }


// let userData ;

// userData.append("from", "EUR");
// userData.append("to", "USD");
// userData.append("amount", "1000");


// ash={
//   form: 'EUR',
//   to: 'USD',
//   amount:100
// };

// const created = fetch("https://ivory-ostrich-yoke.cyclic.app/students/convert", {
//   method: "POST",
//   body: JSON.stringify(ash)
// });

// created.then(response=>response.json())
// .then((data)=>{
//   console.log("wowww!!!");});

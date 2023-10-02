fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=3d0bd44ea8a349ce982ed9a9af87c7d3")
.then((result) =>{
    // console.log(result);
    let myData = result.json();
    // console.log(myData);
    return myData;
}).then((currency) =>{


    let phpPrice = document.querySelector(".php span");


    phpPrice.innerHTML = Math.round(currency.rates["PHP"]);


    // console.log(currency.rates);
    console.log(currency.rates["PHP"]);
});
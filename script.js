var in_currency = document.getElementById("in_currency");
var out_currency = document.getElementById("out_currency");
var url = "https://api.exchangerate.host/latest?";
var base = "RUB";
var symbols = "USD";
var index = 1;
var index2 = 1;
var first_currency = document.querySelector("#first_currency");
var second_currency = document.querySelector("#second_currency");
var last_change = 1;
document.querySelectorAll(".left .currency_select input").forEach((element) => {
  element.addEventListener("click", () => {
    base = element.value;
    document.querySelectorAll(".left .currency_select input").forEach((e) => {
      e.style.backgroundColor = "#fff";
      e.style.color = "#c6c6c6";
    });
    element.style.backgroundColor = "#833ae0";
    element.style.color = "#fff";
    if (last_change == 1) {
      start_fetch(url, base, symbols, last_change);
    } else {
      start_fetch(url, symbols, base, last_change);
    }
  });
});
document
  .querySelectorAll(".right .currency_select input")
  .forEach((element) => {
    element.addEventListener("click", () => {
      symbols = element.value;
      document
        .querySelectorAll(".right .currency_select input")
        .forEach((e) => {
          e.style.backgroundColor = "#fff";
          e.style.color = "#c6c6c6";
        });
      element.style.backgroundColor = "#833ae0";
      element.style.color = "#fff";
      if (last_change == 1) {
        start_fetch(url,base,symbols, last_change);
      } else {
        start_fetch(url,symbols, base, last_change);
      }
    });
  });
start_fetch(url, base, symbols,last_change);


function start_fetch(url, base, symbols, last_input = 1) {
  fetch(`${url}base=${base}&symbols=${symbols}`)
    .then((response) => response.json())
    .then((data) => {
      index = data.rates[symbols];
      first_currency.innerHTML = `1 ${base} = ${index} ${symbols}`;
      
      if (last_input == 1) {
        out_currency.value = in_currency.value * index;
      } else {
        in_currency.value = out_currency.value * index;
        first_currency.innerHTML = `1 ${symbols} = ${index2} ${base}`;
        second_currency.innerHTML = `1 ${base} = ${index} ${symbols}`;
      }
    })
    .catch(error=>{
      document.querySelector('.error_message').innerHTML = 'Gözlənilməyən xəta\nŞəbəkə əlaqəsini yoxlayın'
  });
    fetch(`${url}base=${symbols}&symbols=${base}`)
    .then((response) => response.json())
    .then((data) => {
      index2 = data.rates[base];
      second_currency.innerHTML = `1 ${symbols} = ${index2} ${base}`;
      if (last_input == 1) {
        out_currency.value = in_currency.value * index;
      } else {
        in_currency.value = out_currency.value * index;
        first_currency.innerHTML = `1 ${symbols} = ${index2} ${base}`;
        second_currency.innerHTML = `1 ${base} = ${index} ${symbols}`;
      }
    })
    .catch(error=>{
      document.querySelector('.error_message').innerHTML = 'Gözlənilməyən xəta\nŞəbəkə əlaqəsini yoxlayın'
  });
}
in_currency.addEventListener("input", () => {
  out_currency.value = in_currency.value * index;
  last_change = 1;
});
out_currency.addEventListener("input", () => {
  in_currency.value = out_currency.value * index2;
  last_change = 2;
});

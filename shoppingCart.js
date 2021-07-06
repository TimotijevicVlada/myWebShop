document.addEventListener("DOMContentLoaded", loading);

function loading() {
  const addButton = document.getElementsByClassName("shop-item-button");
  setTimeout(function () {   //Odlozili smo okidanje lisenera za 0.1 sekund da bi radili
    for (let item of addButton) {
      if(addButton) {   //Ako postoji addButton onda postavi lisener na njega, pre toga ne!
        item.addEventListener("click", addItem);
      }
    }
  }, 100);
  document.getElementsByClassName("order-btn")[0].addEventListener("click", orderProducts); //I ovaj lisener nije u redu
}
function orderProducts() {
  let kupi = document.getElementsByClassName("cart-items")[0];
  if (kupi.hasChildNodes()) {
    //Provera da li u korpi ima artikala
    document
      .getElementsByClassName("order-btn")[0]
      .addEventListener("click", (window.location = "form.html"));
  } else {
    alert("Niste odabrali artikle!"); //Ako nema artikala ispisi alert "Niste odabrali artikle!"
  }
  let cartItems = document.getElementsByClassName("cart-items")[0]; //Div koji je prazan i u koji treba da se ubace proizvodi
  while (cartItems.hasChildNodes()) {
    //Ako ovaj div ima childove...
    cartItems.removeChild(cartItems.firstChild);
  }
  updatePrice();
}

function addItem(event) {
  //Funkcija za dodavanje artikala u korpu
  let dugme = event.target; //Target isto kao opcija "this" samo sto sa target gadjamo bas taj element a sa this roditeljski
  let shopItem = dugme.parentElement.parentElement;
  let naslov = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  let cena = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  let slika = shopItem.getElementsByClassName("shop-item-image")[0].src;
  let naStanju = shopItem.getElementsByClassName("shop-item-naStanju")[0].innerText;
  let materijal = shopItem.getElementsByClassName("shop-item-material")[0].innerText;
  let guaranty = shopItem.getElementsByClassName("shop-item-guaranty")[0].innerText;
  let dostupno = shopItem.getElementsByClassName("shop-item-dostupno")[0].innerText;
  console.log(shopItem);
  addToCart(naslov, cena, slika, naStanju, materijal, guaranty, dostupno); //Ove parametre treba da prosledimo u korpu
  updatePrice();
}

function addToCart(naslov, cena, slika, naStanju, materijal, guaranty, dostupno) {
  let cartRow = document.createElement("div"); //cartRow Je red koji treba da se pojavi kada ubacimo u korpu (Za sada se on ne vidi)
  cartRow.classList.add("cart-row"); //Moramo da mu dodamo klasu kako bi ga formatirali
  let cartItems = document.querySelector(".cart-items"); //Dohvatamo cartItems
  let naslovProvera = cartItems.getElementsByClassName("cart-item-title"); //Provera sa IF da ne bi ubacivali dva puta isti element u korpu
  for (let i = 0; i < naslovProvera.length; i++) {
    if (naslovProvera[i].innerText == naslov) {
      //Ako je naslov jednako naslov onda ne ubacuj u korpu
      alert("Ovaj proizvod ste vec ubacili u korpu!");
      return; //Returnom izlazimo iz ove funkcije
    }
  }
  //Pravimo elemente koji ce da se ispisuju nakon klika na Dodaj u korpu
  let ispis = `<div class='cart-item cart-column' >     
                  <img class='cart-item-image' src="${slika}">
                  <span class="cart-item-title">${naslov}</span>
                 </div>
                  <span class="cart-price cart-column">${cena}</span>
                 <div class="cart-item-description">
                  <p><i class="fas fa-angle-right"></i> ${naStanju ? "Proizvod je dostupan" : "Proizvod nije dostupan"}</p>
                  <p><i class="fas fa-angle-right"></i> Materijal: <span class="boldovano">${materijal}</span></p>
                  <p><i class="fas fa-angle-right"></i> Garancija: <span class="boldovano">${guaranty}</span></p>
                  <p><i class="fas fa-angle-right"></i> Dostupno: <span class="boldovano">${dostupno}</span></p>
                 </div> 
                 <div class="cart-quantity  cart-column">
                    <input type="number" class="cart-quantity-input" value="1" max="10">
                    <button class="btn btn-remove" type="button"><i class="fas fa-trash"></i></button>
                 </div>                
              `;
  cartRow.innerHTML = ispis;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-remove")[0]
    .addEventListener("click", deleteItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", changeQuantity);
}

function deleteItem(event) {
  let dugme = event.target;
  dugme.parentElement.parentElement.parentElement.remove(); //Brisemo ceo red tako da moramo da se vratimo 3 koraka u nazad
  updatePrice();
}

function updatePrice() {
  let totalCount = document.getElementsByClassName("brojac-proizvoda")[0]; //Brojac proizvoda na korpi
  let cartItems = document.querySelector(".cart-items");
  let cartRows = cartItems.getElementsByClassName("cart-row");
  let suma = 0; //Treba nam brojac kako bi sabirali cenu
  for (let i = 0; i < cartRows.length; i++) {
    let cenaE = cartRows[i].querySelector(".cart-price").innerText;
    let kolicina = cartRows[i].querySelector(".cart-quantity-input").value;
    let cena = parseFloat(cenaE.replace(".", ""));  //Sklanjam tacku da bi sabrao realno sve cene
    suma = suma + cena * kolicina; //Funkcija za sabiranje cene i kolicine proizvoda
  }
  totalCount.innerText = cartRows.length; //Broj proizvoda je broj cartRows elemenata
  document.getElementsByClassName("cart-total-price")[0].innerText =
    suma.toFixed(2); //dobijena suma
}

function changeQuantity(event) {
  let input = event.target; //Razlika izmedju target i this je ta sto sa this gadjamo roditeljski element
  if (isNaN(input.value) || input.value <= 0) {
    //a sa targetom bas taj element koji je u dogadjaju!
    input.value = 1; //sve ovo moze da se resi i sa this opcijom
  }
  updatePrice();
}


//Funkcije za Details prozor
const bluredWindow = document.getElementsByClassName("blurred-div")[0];
const exitBlured = document.getElementsByClassName("cancel-blurred")[0];
const container = document.getElementsByClassName("details-inner")[0];

console.log(bluredWindow)
console.log(exitBlured)
if(bluredWindow) {
  exitBlured.onclick = () => {
  bluredWindow.style.marginLeft = "-100%";
  container.innerHTML = "";
  }
}
const detailsBtn = document.getElementsByClassName("details-btn");
console.log(detailsBtn)
setTimeout(() => {
for(let i in detailsBtn) {
  detailsBtn[i].addEventListener("click", showDetails);
}
}, 100)

function showDetails(items) {
  let btn = items.target;
  let productDiv = btn.parentElement.parentElement;
  let title = productDiv.getElementsByClassName("shop-item-title")[0].innerText;
  let price = productDiv.getElementsByClassName("shop-item-price")[0].innerText;
  let picture = productDiv.getElementsByClassName("shop-item-image")[0].src;
  let state = productDiv.getElementsByClassName("shop-item-naStanju")[0].innerText;
  let material = productDiv.getElementsByClassName("shop-item-material")[0].innerText;
  let guaranty = productDiv.getElementsByClassName("shop-item-guaranty")[0].innerText;
  let available = productDiv.getElementsByClassName("shop-item-dostupno")[0].innerText;

  let html = "";

  html = `
      <i class="fas fa-times cancel-blurred"></i>
      <h1>${title}</h1>
      <img src="${picture}">
      <p>${state}</p>
      <p>${material}</p>
      <p>${guaranty}</p>
      <p>${available}</p>
      <p>${price}</p>
  `;
  container.innerHTML = html;
  bluredWindow.style.marginLeft = "0%";
}


if (document.readyState == "loading") {
    //Sa ovime izbegavamo situaciju da nam pucaju liseneri a nije nam ucitan DOM
    document.addEventListener("DOMContentLoaded", ucitavanje);
  } else {
    ucitavanje(); //Inicijalizacija
  }

  function ucitavanje() {
    let dodajDugmici = document.getElementsByClassName("shop-item-button");
    //console.log(dodajDugmici)
    for (let i = 0; i < dodajDugmici.length; i++) {
    dodajDugmici[i].addEventListener("click", dodajArtikal);  //Da proverim zasto mi ovaj lisener ne reaguje nekada 
    }
    document.getElementsByClassName("order-btn")[0].addEventListener("click", naruci);  //I ovaj lisener nije u redu
  }
  
  function naruci() {
    let kupi = document.getElementsByClassName("cart-items")[0];
    if (kupi.hasChildNodes()) {
      //Provera da li u korpi ima artikala
      document.getElementsByClassName("order-btn")[0].addEventListener("click", (window.location = "form.html"));
    } else {
      alert("Niste odabrali artikle!"); //Ako nema artikala ispisi alert "Niste odabrali artikle!"
    }
    let cartItems = document.getElementsByClassName("cart-items")[0]; //Div koji je prazan i u koji treba da se ubace proizvodi
    while (cartItems.hasChildNodes()) {
      //Ako ovaj div ima childove...
      cartItems.removeChild(cartItems.firstChild);
    }
    azurirajCenu();
  }
  
  function dodajArtikal(event) {
    //Funkcija za dodavanje artikala u korpu
    let dugme = event.target; //Target isto kao opcija "this" samo sto sa target gadjamo bas taj element a sa this roditeljski
    let shopItem = dugme.parentElement;
    let naslov = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    let cena = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    let slika = shopItem.getElementsByClassName("shop-item-image")[0].src;
    dodajUKorpu(naslov, cena, slika); //Ove parametre treba da prosledimo u korpu
    azurirajCenu();
  }
  
  function dodajUKorpu(naslov, cena, slika) {
    //Opet navodimo parametre koje prosledjujemo u korpu
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
                 <div class="cart-quantity  cart-column">
                    <input type="number" class="cart-quantity-input" value="1" max="10">
                    <button class="btn btn-remove" type="button"><i class="fas fa-trash"></i></button>
                 </div>                 
              `;
    cartRow.innerHTML = ispis;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("btn-remove")[0].addEventListener("click", obrisiArtikal);
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", promeniKolicinu);
  }
  
  function obrisiArtikal(event) {
    let dugme = event.target;
    dugme.parentElement.parentElement.parentElement.remove(); //Brisemo ceo red tako da moramo da se vratimo 3 koraka u nazad
    azurirajCenu();
  }
  
  function azurirajCenu() {
    let cartItems = document.querySelector(".cart-items");
    let cartRows = cartItems.getElementsByClassName("cart-row");
    let suma = 0; //Treba nam brojac kako bi sabirali cenu
    for (let i = 0; i < cartRows.length; i++) {
      let cenaE = cartRows[i].querySelector(".cart-price").innerText;
      let kolicina = cartRows[i].querySelector(".cart-quantity-input").value;
      let cena = parseFloat(cenaE); //Posto je RSD zalepljeno za cenu moramo da izbrisemo kako bi mogli da radimo racunske operacije
      suma = suma + cena * kolicina; //Funkcija za sabiranje cene i kolicine proizvoda
    }
    document.getElementsByClassName("cart-total-price")[0].innerText =
      suma.toFixed(2); //Renderujemo RSD + dobijena suma
  }
  
  function promeniKolicinu(event) {
    let input = event.target; //Razlika izmedju target i this je ta sto sa this gadjamo roditeljski element
    if (isNaN(input.value) || input.value <= 0) {
      //a sa targetom bas taj element koji je u dogadjaju!
      input.value = 1; //Naravno sve ovo moze da se resi i sa this opcijom
    }
    azurirajCenu();
  }

  
  
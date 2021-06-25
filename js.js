
//Fetch-ovanje navBar-a 
fetch("json/navBar.json").then(function(response) {
    //console.log(response)
    return response.json();
}).then(function(object) {
    //console.log(object)
    let div = document.getElementsByClassName("menu-list")[0];
    let html = "";
        html = `
                <div class="icon cancel-btn">
                    <i class="fas fa-times"></i>
                </div>
            `;
    for(let i in object) {
        html += `
            <li><a class="menu-word" href="${object[i].href}">${object[i].name}</a></li>
            `;
        }
        div.innerHTML = html;
   
        //Funkcija za sopping cart  
        const cartsPage = document.getElementsByClassName("carts")[0];
        const cartsIcon = document.getElementsByClassName("fa-shopping-bag")[0];
        const cartsExit = document.getElementsByClassName("exit")[0];

        cartsIcon.addEventListener("click", function(e) {
        e.preventDefault();
        cartsPage.style.right = "0%";
        });
        cartsExit.addEventListener("click", function(e) {
        e.preventDefault();
        cartsPage.style.right = "-100%";
        });

        //Funkcija za responzivan navBar
        const body = document.querySelector("body");
        const navBar = document.querySelector(".navbar");
        const menuBtn = document.querySelector(".menu-btn");
        const cancelBtn = document.querySelector(".cancel-btn");
        const navBarWords = document.querySelector(".menu-word");

        menuBtn.addEventListener("click", function() {
            navBar.classList.add("show");
            menuBtn.classList.add("hide");
            body.classList.add("disabled");
        })

        cancelBtn.addEventListener("click", function() {
            body.classList.remove("disabled");
            navBar.classList.remove("show");
            menuBtn.classList.remove("hide");
        })

        //Scroll funkcija za navBar
        window.addEventListener("scroll", function() {
            if(this.scrollY > 20) {
                navBar.classList.add("sticky");
                navBarWords.classList.add("white");
            }else {
                navBar.classList.remove("sticky");
                navBarWords.classList.remove("white");
            }
        })

    }).catch(function(error) {
    console.log(error);
})

//Kontejneri gde ce biti ispisani proizvodi na svojim stranicama
const livingroomContainer = document.getElementsByClassName("products-inner-livingroom")[0];
const bedroomContainer = document.getElementsByClassName("products-inner-bedroom")[0];
const bathroomContainer = document.getElementsByClassName("products-inner-bathroom")[0];
const kitchenContainer = document.getElementsByClassName("products-inner-kitchen")[0];
const gardenContainer = document.getElementsByClassName("products-inner-garden")[0];
const workroomContainer = document.getElementsByClassName("products-inner-workroom")[0];

//Ako postoji ovaj kontejner onda fetch-uj proizvode
if(livingroomContainer){
    fetchJson("json/livingRoom.json", livingroomContainer);
}
if(bedroomContainer) {
    fetchJson("json/bedRoom.json", bedroomContainer);
}
if(bathroomContainer) {
   fetchJson("json/bathRoom.json", bathroomContainer); 
}
if(kitchenContainer) {
   fetchJson("json/kitchen.json", kitchenContainer); 
}
if(gardenContainer) {
   fetchJson("json/garden.json", gardenContainer); 
}
if(workroomContainer) {
   fetchJson("json/workRoom.json", workroomContainer); 
}

//Univerzalna funkcija za fetch-ovanje Json-a
function fetchJson(json, container) {
    fetch(json).then(function(response) {
        return response.json();
    }).then(function(object) {
    object = filterInStoreOnline(object);   //Objekat pretvaram u filtrirani objekat
    object = filterStanje(object);    //Objekat pretvaram u filtrirani objekat 
    object = sort(object);   //Object pretvaram u sortirani objekat 
    object = searchProducts(object);    //Objekat pretvaram u novi sortiran objekat
    let html = "";
    for(let i in object) {
        html += `
            <div class="shopping-card">
                <h3 class="shopping-card-title">${object[i].name}</h3>
                <img class="shopping-card-img ${object[i].imageSize}" src="${object[i].image}" alt="">
                <p>${printStars(object[i].stars)}</p>
                <p>${object[i].naStanju ? "Proizvod je dostupan" : "Proizvod nije dostupan"}</p>
                <p>Materijal: <span class="boldovano">${object[i].material}</span></p>
                <p>Garancija: <span class="boldovano">${object[i].guaranty}</span></p>
                <p>Dostupno: <span class="boldovano">${object[i].dostupno}</span></p>
                <p class="shopping-card-price">Cena: <span class="boldovano boldovanaCena">${object[i].price}<sup>${object[i].currency}</sup></span></p>
                <div class="btn btn-purchase">${object[i].btn}</div>
            </div>
        `;
    }
    container.innerHTML = html;
    
    }).catch(function(error) {
        console.log(error);
    })
}

//Funkcija za sortiranje proizvoda
function sort(data) {
    let sortTip = document.getElementById("sort").value;
    //console.log(sortTip)
    if(sortTip == "asc") {
        return data.sort((a, b) => parseInt(a.price) > parseInt(b.price) ? 1 : -1); 
    }else {
        return data.sort((a, b) => parseInt(a.price) < parseInt(b.price) ? 1 : -1);
    }
}

//Funkcija za pretragu proizvoda po naslovu
function searchProducts(data) {
    let value = document.getElementById("search").value.toLowerCase();
      //console.log(value);
      if (value) {
        return data.filter(function (el) {
          return el.name.toLowerCase().indexOf(value) !== -1;
        });
      }
      return data;
    }

//Funkcija za filtriranje da li je na stanju
function filterStanje(data) {
    const elem = document.querySelector("#stanje").value;
    if (elem == "available") {
      return data.filter((x) => x.naStanju);
    }
    if (elem == "notAvailable") {
      return data.filter((x) => !x.naStanju);
    }
    if(elem == "avaAndNotAva") {
        return data.filter((x) => x.naStanju + !x.naStanju)
    }
    return data;
  }

//Funkcija za filtriranje InStore or Online
function filterInStoreOnline(data) {
    let niz = [];
    const chek = document.querySelectorAll(".InStore-Online:checked");
    //console.log(chek)
    chek.forEach((element) => {
      niz.push(element.value);
    });
    if (niz.length > 0) {
      return data.filter((x) => niz.includes(x.dostupno));
    }
    return data;
  }

//Funkcija za ispisivanje broja zvezdica na proizvodima
function printStars(brojZvezdica) {
    //console.log(brojZvezdica)
    let html = "";
        if(brojZvezdica >= 0.8 && brojZvezdica <= 1.2) {
            html = `<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
        }else if(brojZvezdica >= 1.3 && brojZvezdica <= 1.7) {
            html = `<i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
        }else if(brojZvezdica >= 1.8 && brojZvezdica <= 2.2) {
            html = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
        }else if(brojZvezdica >= 2.3 && brojZvezdica <= 2.7) {
            html = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
        }else if(brojZvezdica >= 2.8 && brojZvezdica <= 3.2) { 
            html = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
        }else if(brojZvezdica >= 3.3 && brojZvezdica <= 3.7) {
            html = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i>`;
        }else if(brojZvezdica >= 3.8 && brojZvezdica <= 4.2) {
            html = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>`;
        }else if(brojZvezdica >= 4.3 && brojZvezdica <= 4.7) {
            html = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>`;
        }else {
            html = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`;
        }
    return html;
}

//Fetch-ovanje kategorija na pocetnoj strani
fetch("json/categories.json").then(function(response) {
    return response.json();
}).then(function(data) {
    //console.log(data);
    let container = document.getElementsByClassName("section-inner")[0];
    let html = "";
    for(let i in data) {
        html += `
                    <div class="${data[i].class}">
                        <p>${data[i].name}</p>
                        <a href="${data[i].href}">
                        <img src="${data[i].src}" alt="${data[i].alt}">
                        </a>
                    </div>
                `;
            }
    container.innerHTML = html;
}).catch(function(error) {
    console.log(error);
})

//Fetch-ovanje ikonica za drustvene mreze
fetch("json/socialNetwork.json").then(function(response) {
    return response.json();
}).then(function(data) {
    //console.log(data);
    let container = document.getElementsByClassName("social-network")[0];
    let html = "";
    for(let i in data) {
        html += `
            <i class="${data[i].icon}"></i>
        `;
    }
    container.innerHTML = html;
}).catch(function(error) {
    console.log(error);
})

//Fetchovanje kartica banaka za futer
fetch("json/bankCard.json").then(function(response) {
    return response.json();
}).then(function(data) {
    //console.log(data)
    let container = document.getElementsByClassName("footer-cards")[0];
    let html = "";
    for(let i in data) {
    html += `
        <img src="${data[i].src}" alt="${data[i].alt}" />
    `;
    }
    container.innerHTML = html;
}).catch(function(error) {
    console.log(error);
})

//Fetchovanje info bar-a na dnu stranice 
fetch("json/info.json").then(function(response) {
    return response.json();
}).then(function(data) {
    //console.log(data)
    let container = document.getElementsByClassName("info")[0];
    let html = "";
    for(let i in data) {
        html += `
            <div>
                <i class="${data[i].icon}"></i>
                <h3>${data[i].naslov}</h3>
                <p>${data[i].tekst}</p>
            </div>
        `;
    }
    container.innerHTML = html;
}).catch(function(error) {
    console.log(error);
})

//Liseneri za sortiranje i filtriranje proizvoda
const sortSelect = document.querySelector("#sort");
const searchInput = document.querySelector("#search");
const sortAvailable = document.querySelector("#stanje");
const filterDostupno = document.querySelector("#uRadnji-Online");

//Ponovno ispisivanje proizvoda prilikom svake aktivacije lisenera
function liseneri(lisenerName, eventName) {
    lisenerName.addEventListener(eventName, function() {
        fetchJson("json/livingRoom.json", livingroomContainer);
        fetchJson("json/bedRoom.json", bedroomContainer);
        fetchJson("json/bathRoom.json", bathroomContainer);
        fetchJson("json/kitchen.json", kitchenContainer);
        fetchJson("json/garden.json", gardenContainer);
        fetchJson("json/workRoom.json", workroomContainer);
    })
}

//Egzekucija funkcija lisenera 
liseneri(sortSelect, "change");
liseneri(searchInput, "keyup");
liseneri(sortAvailable, "change");
liseneri(filterDostupno, "change");

/************************************************************************/

//Pravimo ispis za dodavanje u korpu
if(document.readyState == "loading") {
//Sa ovime izbegavamo situaciju da nam pucaju liseneri a nije nam ucitan DOM
    document.addEventListener("DOMContentLoaded", ucitavanje);
}else {
    ucitavanje();  //inicijalizacija
}

//Stavljamo lisenere na "Add-to-cart" dugmice
function ucitavanje() {
let addToCartBtn = document.getElementsByClassName("btn-purchase");
for(let i = 0; i < addToCartBtn.length; i++) {
    addToCartBtn[i].addEventListener("click", dodajProizvod);
}
document.getElementsByClassName("order-btn")[0].addEventListener("click", naruci);
}

//Funkcija za naruci btn
function naruci() {
    let kupi = document.getElementsByClassName("carts-items")[0];
    if(kupi.hasChildNodes()) {
        document.getElementsByClassName("order-btn")[0].addEventListener("click", (window.location = "form.html"));
    }else {
        alert("Niste odabrali artikle!");
    }

    while(kupi.hasChildNodes()) {
        kupi.removeChild(kupi.firstChild);
    }
    azurirajCenu();
}

//Funkcija za uzimanje izabranog proizvoda
function dodajProizvod(button) {
    let dugme = button.target;  //Gadjamo bas taj element koji dodje u funkciju
    let shopItem = dugme.parentElement;
    let naslov = shopItem.getElementsByClassName("shopping-card-title")[0].innerText;
    let cena = shopItem.getElementsByClassName("shopping-card-price")[0].innerText;
    let slika = shopItem.getElementsByClassName("shopping-card-img")[0].src;
    dodajUKorpu(naslov, cena, slika);
    azurirajCenu();
}

//Funkcija za dodavanje proizvoda u korpu
function dodajUKorpu(naslov, cena, slika) {
    let cartRow = document.createElement("div");  //red u koji treba da smestimo proizvode
    cartRow.classList.add("cart-row"); //da napravim ovu klasu naknadno
    let cartItems = document.querySelector(".carts-items"); //div u koji smestamo proizvod
    let naslovProvera = cartItems.getElementsByClassName("shopping-card-title");
    for(let i = 0; i < naslovProvera.length; i++) {
        if(naslovProvera[i].innerText == naslov) {
            alert("Ovaj proizvod se vec nalazi u korpi!");
            return;
        }
    }
    let html = `<div class='cart-item cart-column' >     
                    <img class='cart-item-image' src="${slika}">
                    <span class="cart-item-title">${naslov}</span>
                </div>
                <span class="cart-price cart-column">${cena}</span>
                <div class="cart-quantity  cart-column">
                    <input type="number" class="cart-quantity-input" value="1" max="10">
                    <button class="btn btn-remove" type="button"><i class="fas fa-trash"></i></button>
                </div>                 
            `;
    cartRow.innerHTML = html;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("btn-remove")[0].addEventListener("click", deleteItem);
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", promeniKolicinu);
}

//Funkcija za brisanje artikla iz korpe 
function deleteItem(item) {
    let dugme = item.target;
    dugme.parentElement.parentElement.parentElement.remove();
    azurirajCenu();
}

//Funkcija za azuriranje cene prilikom dodavanja artikala
function azurirajCenu() {
    let cartItems = document.querySelector(".carts-items");
    let cartRows = cartItems.getElementsByClassName("cart-row");
    let suma = 0;  //Treba nam brojac kako bi sabrali cenu
    for(let i = 0; i < cartRows.length; i++) {
        let cenaE = cartRows[i].querySelector(".cart-price").innerText;
        let kolicina = cartRows[i].querySelector(".cart-quantity-input").value;
        let cena = parseFloat(cenaE);
        suma = suma + cena * kolicina;
    }
    document.getElementsByClassName("carts-total-price")[0].innerText = suma.toFixed(2);
}

//Funkcija za promenu kolicine istog proizvoda
function promeniKolicinu(item) {
    let input = item.target.value;
    if(isNaN(input) || input <= 0) {
        input = 1;
    }
    azurirajCenu();
}
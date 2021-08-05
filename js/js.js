//Ispisivanje current-user u navbaru
const get_korisnik2 = () => {
    return JSON.parse(localStorage.getItem("korisnik"));
  };

const ispisi_korisnika = () => {
    //alert("uspelo")
    let privremeno = get_korisnik2();
    //console.log(privremeno);
    let za_ispis = document.getElementById("current-user"); 
    if (privremeno != null) {
      za_ispis.innerText='User: ' + privremeno.ime;
    } else {
      za_ispis.innerText = "There is no logged user!";
    }
  };

//Shopping cart local storage
const get_user = () => {
    return JSON.parse(localStorage.getItem("korisnik"));
}
const set_user = (user) => {
    localStorage.setItem("korisnik", JSON.stringify(user));
  };
//console.log(get_user());
const set_products = (naslov, cena, slika, naStanju, materijal, guaranty, dostupno) => {
    let product = {
        title: naslov,
        price: cena,
        img: slika,
        state: naStanju,
        material: materijal,
        guaranty: guaranty,
        available: dostupno
    }
    
    let user = get_user();
    //console.log(user);
    let cart = user.korpa;
    cart.push(product);
    //console.log(korpa)
    set_user(user);
    //console.log(user);
}


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
        //Ispisivanje trenutnog korisnika
        ispisi_korisnika();
   
        //Funkcija za sopping cart  
        const cartsPage = document.getElementsByClassName("carts")[0];
        const cartsIcon = document.getElementsByClassName("fa-shopping-bag")[0];
        const cartsExit = document.getElementsByClassName("exit")[0];

        cartsIcon.addEventListener("click", function(e) {
        e.preventDefault();
        cartsPage.style.right = "0%";
        document.body.style.overflow = "hidden"; 
        });
        cartsExit.addEventListener("click", function(e) {
        e.preventDefault();
        cartsPage.style.right = "-100%";
        document.body.style.overflow = "auto"; 
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
            <div class="shopping-card shop-item">
                <h3 class="shop-item-title">${object[i].name}</h3>
                <img class="shop-item-image ${object[i].imageSize}" src="${object[i].image}" alt="">
                <p class="shop-item-stars">${printStars(object[i].stars)}</p>
                <p class="shop-item-naStanju">${object[i].naStanju ? "Proizvod je dostupan" : "Proizvod nije dostupan"}</p>
                <p>Materijal: <span class="boldovano shop-item-material">${object[i].material}</span></p>
                <p>Garancija: <span class="boldovano shop-item-guaranty">${object[i].guaranty}</span></p>
                <p>Dostupno: <span class="boldovano shop-item-dostupno">${object[i].dostupno}</span></p>
                <p>Cena: <span class="boldovano boldovanaCena shop-item-price">${object[i].price}<sup>${object[i].currency}</sup></span></p>
                <div class="products-buttons">
                    <div class="details-btn">Details</div>
                    <div class="btn btn-purchase shop-item-button">${object[i].btn}</div>
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
    
    //Liseneri za add to cart button
    let addButton = document.getElementsByClassName("shop-item-button");
    for (let item of addButton) {
        item.addEventListener("click", addToCart);
    }

    //Liseneri za show details button
    let detailsBtn = document.getElementsByClassName("details-btn");
    for(let i = 0; i < detailsBtn.length; i++) {
        detailsBtn[i].addEventListener("click", showDetails);
    }

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
const categoriesDiv = document.getElementsByClassName("section-inner")[0];
if(categoriesDiv) {
fetch("json/categories.json").then(function(response) {
    return response.json();
}).then(function(data) {
    //console.log(data);
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
    categoriesDiv.innerHTML = html;
}).catch(function(error) {
    console.log(error);
})
}

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

/*================================================================================================*/
//Funkcije za Details prozor
const bluredWindow = document.getElementsByClassName("blurred-div")[0];
const container = document.getElementsByClassName("details-inner")[0];

function exitDetails() {
    bluredWindow.style.marginLeft = "-100%";
    container.innerHTML = "";
    document.body.style.overflow = "auto";  //Vracam scroll bar za skrolovanje
}

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
  let stars = productDiv.getElementsByClassName("shop-item-stars")[0].innerHTML;

  let html = "";

  html = `
      <i class="fas fa-times cancel-blurred"></i>
      <div class="details-img">
        <img src="${picture}">
      </div>
      <div class="details-info">
        <h1 class="details-title">${title}</h1>
        <div class="details-middle-div">
          <p class="details-state">${state}</p>
          <p class="details-material"><span>Material:</span> ${material}</p>
          <p class="details-guaranty"><span>Guaranty:</span> ${guaranty}</p>
          <p class="details-available"><span>Available:</span> ${available}</p>
        </div>
        <p class="details-stars">${stars}</p>
        <p class="details-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat deserunt facere quisquam mollitia eaque blanditiis ducimus esse sequi ex. Libero dicta doloribus fuga nemo corrupti fugit eius officiis quasi ipsam.</p>
        <div class="details-price">
          <p>Price: <span>${price}</span></p>
        </div>
      </div>
  `;
  container.innerHTML = html;
  bluredWindow.style.marginLeft = "0%";
  
  //Sakrivam scroll bar kako bih onemogucio skrolovanje dok je prozor otvoren
  document.body.style.overflow = "hidden";  

  let exitBlured = document.getElementsByClassName("cancel-blurred")[0];
    exitBlured.addEventListener("click" , exitDetails);
}

/*===========================================================================================*/

//Funkcije za Add to Cart btn
document.getElementsByClassName("order-btn")[0].addEventListener("click", orderProducts); 

function orderProducts() {
  let kupi = document.getElementsByClassName("cart-items")[0];
  if (kupi.hasChildNodes()) {
    //Provera da li u korpi ima artikala
    document
      .getElementsByClassName("order-btn")[0]
      .addEventListener("click", (window.location.href = "form.html"));
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

//Funkcija za dodavanje artikala u korpu
function addToCart(item) {
  let dugme = item.target; //Target isto kao opcija "this" samo sto sa target gadjamo bas taj element a sa this roditeljski
  let shopItem = dugme.parentElement.parentElement;
  let naslov = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  let cena = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  let slika = shopItem.getElementsByClassName("shop-item-image")[0].src;
  let naStanju = shopItem.getElementsByClassName("shop-item-naStanju")[0].innerText;
  let materijal = shopItem.getElementsByClassName("shop-item-material")[0].innerText;
  let guaranty = shopItem.getElementsByClassName("shop-item-guaranty")[0].innerText;
  let dostupno = shopItem.getElementsByClassName("shop-item-dostupno")[0].innerText;


  //Ako je neko ulogovan dozvoljavamo stavljanje u korpu a ako nije onda ne dozvoljavamo!
  let current_user = document.getElementById("current-user");
  if(current_user.innerHTML == "There is no logged user!") {
      alert("Your are not logged!")
  }else {
      set_products(naslov, cena, slika, naStanju, materijal, guaranty, dostupno);
    }
    displayCart();
}

function displayCart() {
  let cartRow = document.createElement("div"); //cartRow Je red koji treba da se pojavi kada ubacimo u korpu (Za sada se on ne vidi)
  cartRow.classList.add("cart-row"); //Moramo da mu dodamo klasu kako bi ga formatirali
  let cartItems = document.querySelector(".cart-items"); //Dohvatamo cartItems
// let naslovProvera = cartItems.getElementsByClassName("cart-item-title"); //Provera sa IF da ne bi ubacivali dva puta isti element u korpu
//  for (let i = 0; i < naslovProvera.length; i++) {
//    if (naslovProvera[i].innerText == naslov) {
//      //Ako je naslov jednako naslov onda ne ubacuj u korpu
//      alert("Ovaj proizvod ste vec ubacili u korpu!");
//      return; //Returnom izlazimo iz ove funkcije
//    }
// }
  //Pravimo elemente koji ce da se ispisuju nakon klika na Dodaj u korpu

  let user = get_user();
  let cart = user.korpa;
  console.log(cart.length);
  let html = "";
  for(let i in cart) {
   console.log(cart[i].title);  //Ovde vidim proizvode ali ispod ne vidim
   html = `<div class='cart-item cart-column' >     
                  <img class='cart-item-image' src="${cart[i].img}">
                  <span class="cart-item-title">${cart[i].title}</span>
                 </div>
                  <span class="cart-price cart-column">${cart[i].price}</span>
                 <div class="cart-item-description">
                  <p><i class="fas fa-angle-right"></i> ${cart[i].state ? "Proizvod je dostupan" : "Proizvod nije dostupan"}</p>
                  <p><i class="fas fa-angle-right"></i> Materijal: <span class="boldovano">${cart[i].material}</span></p>
                  <p><i class="fas fa-angle-right"></i> Garancija: <span class="boldovano">${cart[i].guaranty}</span></p>
                  <p><i class="fas fa-angle-right"></i> Dostupno: <span class="boldovano">${cart[i].available}</span></p>
                 </div> 
                 <div class="cart-quantity  cart-column">
                    <input type="number" class="cart-quantity-input" value="1" max="10">
                    <button class="btn btn-remove" type="button"><i class="fas fa-trash"></i></button>
                 </div>                
              `;
  };            
  cartRow.innerHTML = html;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName("btn-remove")[0].addEventListener("click", deleteItem);
  cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", changeQuantity);
    
  updatePrice();
}


function deleteItem(item) {
  let dugme = item.target;
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

function changeQuantity(item) {
  let input = item.target; //Razlika izmedju target i this je ta sto sa this gadjamo roditeljski element
  if (isNaN(input.value) || input.value <= 0) {
    //a sa targetom bas taj element koji je u dogadjaju!
    input.value = 1; //sve ovo moze da se resi i sa this opcijom
  }
  updatePrice();
}

//Delete all btn u korpi
const cartContainer = document.getElementsByClassName("cart-items")[0];
const deleteAllBtn = document.getElementsByClassName("fa-trash-alt")[0];

deleteAllBtn.onclick = () => {
    cartContainer.innerHTML = "";
    updatePrice();
}



//Kod za ispisivanje svih registrovanih korisnika

const get_users = () => {
    return JSON.parse(localStorage.getItem("korisnici"));
  };

const display_all_users = () => {
  let all_users = get_users();
  console.log(all_users); //Dobijamo sve usere 
  const all_users_div = document.getElementById("all_users");   //Iznekog razloga mi ne vidi ovaj element
  console.log(all_users_div);

  let html = "";
  for(let i in all_users) {
      html += `<div>
            <p>${all_users[i].ime}</p>
            <p>${all_users[i].email}</p>
            <p>${all_users[i].password}</p>
      </div>`
  }
  
      all_users_div.innerHTML = html;
  
}

display_all_users();



//Funkcija za uzimanje pojedinacnog korisnika
const get_user = () => {
    return JSON.parse(localStorage.getItem("korisnik"));
}
//Funkcija za setovanje pojedinacnog korisnika
const set_user = (user) => {
    localStorage.setItem("korisnik", JSON.stringify(user));
  };

//Funkcija za uzimanje svih korisnika iz local storage
const get_users = () => {
    return JSON.parse(localStorage.getItem("korisnici"));
  };

//Funkcija koja setuje korisnike u local storage
const set_users = (users) => {
    localStorage.setItem("korisnici", JSON.stringify(users));
  };

//Funkcija za ispisivanje trenutnog korisnika u navbaru
const write_user_navbar = () => {
    let user = get_user();
    //console.log(privremeno);
    let current_user = document.getElementById("current-user"); 
    if (user != null) {
      current_user.innerText='User: ' + user.ime;
    } else {
      current_user.innerText = "There is no logged user!";
    }
  };

//Logout funkcija
const logout = () => {
    localStorage.removeItem("korisnik");
    location.reload();
}

//Funkcija za prikaz broja proizvoda u navbaru
const product_number = () =>{
    let user = get_user();
    if(user) {
        let product_num = user.korpa.length;
        let totalCount = document.getElementsByClassName("brojac-proizvoda")[0]; //Brojac proizvoda na korpi
        totalCount.innerHTML = product_num;
    }
}

//Funkcija za prikaz svih registrovanih korisnika na stranici "user.html"
const display_all_users = () => {
  let all_users = get_users();
  //console.log(all_users); //Dobijamo sve usere 
  let all_users_div = document.getElementById("all_users");  
  //console.log(all_users_div);

  let html = "";
      html += `<table class="users_table">
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>
  `;
  for(let i in all_users) {
      html += `<tr>
                    <td>${all_users[i].ime}</td>
                    <td>${all_users[i].email}</td>
                    <td>${all_users[i].password}</td>
                </tr>`
            }
      html += `</table>`;
      all_users_div.innerHTML = html;
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
                <li class="icon cancel-btn">
                    <i class="fas fa-times"></i>
                </li>
            `;
    for(let i in object) {
        html += `
            <li><a class="${object[i].class}" href="${object[i].href}">${object[i].name}</a></li>
            `;
        }
        div.innerHTML = html;
        product_number();

        const logoutBtn = document.getElementsByClassName("logout")[0];
        console.log(logoutBtn)
        logoutBtn.addEventListener("click", logout);
        
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
        product_number();    //Posle izlaska iz korpe zovem funkciju da ispise broj porizvoda
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

        //Ispisivanje trenutnog korisnika
        displayCart();
        write_user_navbar();
        display_all_users();

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
                <div>
                Cena: <span class="boldovano boldovanaCena shop-item-price">${object[i].price}</span><span><sup><small>RSD</small></sup></span>
                </div>
                <div class="products-buttons">
                    <div class="details-btn">Details</div>
                    <div class="btn btn-purchase shop-item-button">${object[i].btn}</div>
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
    product_number();
    
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

    displayCart();

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
          return el.name.toLowerCase().indexOf(value) != -1;
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
    <div class="slider">
      <div class="slider-items">
          <div class="item active">
             <img src="${picture}" />
             <div class="caption">
                Slide 1
             </div>
          </div>
          <div class="item">
             <img src="${picture}" />
             <div class="caption">
                Slide 2
             </div>
          </div>
          <div class="item">
             <img src="${picture}" />
             <div class="caption">
                Slide 3
             </div>
          </div>
      </div>
        <!-- slider controls -->
          <div class="left-slide"><i class="fas fa-chevron-circle-left"></i></div>
          <div class="right-slide"><i class="fas fa-chevron-circle-right"></i></div>
        <!-- slider controls -->
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
          <p>Price: <span>${price}</span><span><sup class="valute"><small>RSD</small></sup></span></p>
        </div>
      </div>
  `;
  container.innerHTML = html;

  //Postavljam div na centar ekrana 
  bluredWindow.style.marginLeft = "0%";
  
  //Sakrivam scroll bar kako bih onemogucio skrolovanje dok je prozor otvoren
  document.body.style.overflow = "hidden";  

  //Carousel
  let slides = document.querySelector('.slider-items').children;
  let nextSlide = document.querySelector(".right-slide");
  let prevSlide = document.querySelector(".left-slide");
  let totalSlides = slides.length;
  let index = 0;

  nextSlide.onclick = () => {
    next("next");
  }
  prevSlide.onclick = () => {
    next("prev");
  }
  const next = (direction) => {
    if (direction == "next") {
       index++;
        if (index == totalSlides) {
         index = 0;
        }
    } else {
        if (index == 0) {
             index = totalSlides - 1;
        } else {
             index--;
            }
     }
 
   for (i = 0; i < slides.length; i++) {
           slides[i].classList.remove("active");
   }
   slides[index].classList.add("active");     
 }

 //Postavljamo lisener na dugme za izlazak iz Details prozora
  let exitBlured = document.getElementsByClassName("cancel-blurred")[0];
    exitBlured.addEventListener("click" , exitDetails);
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

    let user = get_user();
    
    if(user == null) {
      alert("Your are not logged!");
      window.location.href = "form.html";
    } else {
    let cart = user.korpa;    
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].title == naslov) {
        alert("This product is already in cart!");
        return;
      }
    }
    set_products(naslov, cena, slika, naStanju, materijal, guaranty, dostupno); 
   } 
}

//Funkcija za setovanje proizvoda u korpu ulogovanog korisnika
const set_products = (naslov, cena, slika, naStanju, materijal, guaranty, dostupno) => {
    let product = {
        title: naslov,
        price: cena,
        img: slika,
        state: naStanju,
        material: materijal,
        guaranty: guaranty,
        available: dostupno,
        quantity: 1
    }
    
    let user = get_user();
    //console.log(user);
    let cart = user.korpa;
    cart.push(product);
    //console.log(korpa)
    set_user(user);
    //console.log(user);
    let users = get_users();
    //console.log(users)
    //console.log(user)
    for(let i = 0; i < users.length; i++) {
        if(users[i].email == user.email ) {
            users[i] = user;
            set_users(users);
        }
    }
    displayCart();  
    product_number();
}

//Funkcija za prikazivanje proizvoda u korpi
function displayCart() {
      //Pravimo elemente koji ce da se ispisuju nakon klika na Dodaj u korpu
      let user = get_user();
      //Ako imamo logovanog korisnika onda idi dalje
      if(user != null) {
      let cart = user.korpa;
      let cartItems = document.querySelector(".cart-items"); //Div u html u koji upisujemo sve
      let html = "";
      for(let i in cart) {
       html += `<div class="cart-row">
                     <div class='cart-item cart-column' >     
                      <img class='cart-item-image' src="${cart[i].img}">
                      <span class="cart-item-title">${cart[i].title}</span>
                     </div>
                     <div class="cart-price-div">
                      <span class="cart-price cart-column">${cart[i].price}</span><span class="currency">RSD</span>
                      </div>
                     <div class="cart-item-description">
                      <p><i class="fas fa-angle-right"></i> ${cart[i].state ? "Proizvod je dostupan" : "Proizvod nije dostupan"}</p>
                      <p><i class="fas fa-angle-right"></i> Materijal: <span class="boldovano">${cart[i].material}</span></p>
                      <p><i class="fas fa-angle-right"></i> Garancija: <span class="boldovano">${cart[i].guaranty}</span></p>
                      <p><i class="fas fa-angle-right"></i> Dostupno: <span class="boldovano">${cart[i].available}</span></p>
                     </div> 
                     <div class="cart-quantity  cart-column">
                        <input type="number" class="cart-quantity-input" value="${cart[i].quantity}" min="1" max="10">
                        <button class="btn btn-remove" type="button"><i class="fas fa-trash"></i></button>
                     </div>  
                </div>
                  `;
      };      
            cartItems.innerHTML = html;  
           
            //Liseneri za delete btn
            let removeBtn = document.getElementsByClassName("btn-remove");
                for (let btn of removeBtn) {
                    btn.addEventListener("click", deleteItem);
                }  
    
            //Liseneri za quantity btn
            let quantity = document.getElementsByClassName("cart-quantity-input");
                for(let btn of quantity) {
                    btn.addEventListener("change", changeQuantity);
                }

            //Lisener za purchase products btn
            let purchase = document.getElementsByClassName("order-btn")[0];
            purchase.addEventListener("click", orderProducts); 

            //Lisener za delete all dugme u korpi
            const deleteAllBtn = document.getElementsByClassName("deleteAll-btn")[0];
            deleteAllBtn.addEventListener("click", deleteAllProducts);
    
            updatePrice();
        }
    }

//Funkcija za purchase products
function orderProducts() {
  //Provera da li u korpi ima artikala
  let cartItems = document.getElementsByClassName("cart-items")[0];
  if (cartItems.hasChildNodes()) {
     alert("Thank you for shopping on our site!");
  } else {
     alert("You have not selected items!"); 
  }
}

//Funkcija za brisanje proizvoda iz korpe
function deleteItem(item) {
    let dugme = item.target;
    let parent = dugme.parentElement.parentElement.parentElement;
    let title = parent.getElementsByClassName("cart-item-title")[0].innerHTML;
    //console.log(title);
    let user = get_user();
    let cart = user.korpa;
    
    for(let i = 0; i < cart.length; i++) {
      if(cart[i].title == title) {
          cart.splice(i, 1);
          let updateUser = get_user();
          updateUser.korpa = cart;
          set_user(updateUser);
          displayCart();
          
          let users = get_users();
      for(let i = 0; i < users.length; i++) {
          if(users[i].email == updateUser.email ) {
              users[i] = updateUser;
              set_users(users);
          }
      }
          updatePrice();
      }
    }
  }

//Funkcija za promenu cene proizvoda
function updatePrice() {
    let user = get_user();
    let userKorpa = user.korpa;
    //console.log(userKorpa)
    let novaCena = 0;
    for(let i = 0; i < userKorpa.length; i++) {
        novaCena = novaCena + JSON.parse(userKorpa[i].price) * userKorpa[i].quantity;
    }
    document.getElementsByClassName("cart-total-price")[0].innerText =
        novaCena.toFixed(3); //dobijena suma
}

//Funkcija za promenu kolicine proizvoda
function changeQuantity(item) {
  let input = item.target;
  let quantity = parseInt(input.value); 
  let parent = input.parentElement.parentElement;
  let title = parent.getElementsByClassName("cart-item-title")[0].innerHTML;
  let user = get_user();
  let userCart = user.korpa;

  for(let i = 0; i < userCart.length; i++) {
    if(userCart[i].title == title) {
        userCart[i].quantity = quantity;
        set_user(user);
        let users = get_users();
        for(let i in users) {
            if(users[i].email == user.email) {
                users[i] = user;
                set_users(users);
            }
        }
    } 
  }

    updatePrice();
}

//Funkcija za "delete-all" dugme u korpi
function deleteAllProducts() {
    let user = get_user();
    let cart = user.korpa;
    if(cart.length != 0) {
        cart.splice(0, cart.length);
        set_user(user);
        displayCart();
        updatePrice();
    }else {
        alert("You already don't have products in cart!");
    }
}

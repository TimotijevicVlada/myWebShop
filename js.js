
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
            <div class="shopping-card shop-item">
                <h3 class="shop-item-title">${object[i].name}</h3>
                <img class="shop-item-image ${object[i].imageSize}" src="${object[i].image}" alt="">
                <p>${printStars(object[i].stars)}</p>
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


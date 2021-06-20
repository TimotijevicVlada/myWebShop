//FETCH NAVBAR 
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
   
        //CARTS FUNCTION  
        const cartsPage = document.getElementsByClassName("carts")[0];
        const cartsIcon = document.getElementsByClassName("fa-shopping-bag")[0];
        const cartsExit = document.getElementsByClassName("exit")[0];

        cartsIcon.addEventListener("click", function() {
        cartsPage.style.right = "0%";
        });
        cartsExit.addEventListener("click", function() {
        cartsPage.style.right = "-100%";
        });

        //RESPONSIVE NAVBAR 
        const body = document.querySelector("body");
        const navBar = document.querySelector(".navbar");
        const menuBtn = document.querySelector(".menu-btn");
        const cancelBtn = document.querySelector(".cancel-btn");

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

        //SCROLL FUNCTION
        window.addEventListener("scroll", function() {
            if(this.scrollY > 20) {
                navBar.classList.add("sticky");
                navBar.classList.add(".navbar .sticky a .white");
            }else {
                navBar.classList.remove("sticky");
                navBar.classList.remove(".navbar .sticky a .white");
            }
        })
        

    }).catch(function(error) {
    console.log(error);
})


//CONTAINER WHERE WILL BE DISPLAYED PRODUCTS
const livingroomContainer = document.getElementsByClassName("products-inner-livingroom")[0];
const bedroomContainer = document.getElementsByClassName("products-inner-bedroom")[0];
const bathroomContainer = document.getElementsByClassName("products-inner-bathroom")[0];
const kitchenContainer = document.getElementsByClassName("products-inner-kitchen")[0];
const gardenContainer = document.getElementsByClassName("products-inner-garden")[0];
const workroomContainer = document.getElementsByClassName("products-inner-workroom")[0];

//UNIVERSAL FUNCTION FOR PRODUCTS PRINTING
function printProducts(object, container) {
    sort(object);   //Zovemo zbog sortiranja 
    let html = "";
    for(let i in object) {
        html += `
            <div class="shopping-card">
                <h3>${object[i].name}</h3>
                <img class="${object[i].imageSize}" src="${object[i].image}" alt="">
                <p>${printStars(object[i].stars)}</p>
                <p>${object[i].description}</p>
                <p>Materijal: ${object[i].material}</p>
                <p>Garancija: ${object[i].guaranty}</p>
                <p>Cena: ${object[i].price}<sup>${object[i].currency}</sup></p>
                <div class="btn btn-purchase">${object[i].btn}</div>
            </div>
        `;
    }
    container.innerHTML = html;
}

//FUNCTION FOR SORTING PRODUCTS BY PRICE
//Moram da proverim zasto mi ne radi lisener change, ispisuje samo kada je ASC a kada je DESC onda nece!!!!!!!!!!!!!
document.getElementById("sort").addEventListener("change", sort);   //Ovo mi ne radi iz nekog razloga (Da proverim)!

function sort(data) {
    const sortTip = document.getElementById("sort").value;
    if(sortTip == "asc") {
        return data.sort((a, b) => parseInt(a.price) > parseInt(b.price) ? 1 : -1); 
    }else {
        return data.sort((a, b) => parseInt(a.price) < parseInt(b.price) ? 1 : -1);
    }
}


//FUNCTION FOR COUNTING STAR OF PRODUCT  (I NEED ONLY ONE CODE, JUST TO MAP OTHER FUNCTIONS)
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

//FETCH FROM LIVINGROOM JSON
fetch("json/livingRoom.json").then(function(response) {
    //console.log(response);
    return response.json();
}).then(function(object) {
    //console.log(object);
    printProducts(object, livingroomContainer);   //I am calling the function to display products

}).catch(function(error) {
    console.log(error);
})

//FETCH FROM BEDROOM JSON
fetch("json/bedRoom.json").then(function(response) {
    //console.log(response);
    return response.json();
}).then(function(object) {
    //console.log(object);
    printProducts(object, bedroomContainer);

}).catch(function(error) {
    console.log(error);
})

//FETCH FROM BATHROOM JSON
fetch("json/bathRoom.json").then(function(response) {
    //console.log(response);
    return response.json();
}).then(function(object) {
    //console.log(object);
    printProducts(object, bathroomContainer);

}).catch(function(error) {
    console.log(error);
})

//FETCH FROM KITCHEN JSON
fetch("json/kitchen.json").then(function(response) {
    //console.log(response);
    return response.json();
}).then(function(object) {
    //console.log(object);
    printProducts(object, kitchenContainer);

}).catch(function(error) {
    console.log(error);
})

//FETCH FROM GARDEN JSON
fetch("json/garden.json").then(function(response) {
    //console.log(response);
    return response.json();
}).then(function(object) {
    //console.log(object);
    printProducts(object, gardenContainer);

}).catch(function(error) {
    console.log(error);
})

//fETCH FROM WORKROOM JSON
fetch("json/workRoom.json").then(function(response) {
    //console.log(response);
    return response.json();
}).then(function(object) {
    //console.log(object);
    printProducts(object, workroomContainer);

}).catch(function(error) {
    console.log(error);
})

//FETCH CATEGORIES
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

//FETCH SOCIAL NETWORK ICONS
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

//FETCH BANK-CARDS FOR FOOTER
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

//FETCH INFO 
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

//CONTACT FORM STYLING
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

signupBtn.addEventListener("click", function() {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
})
loginBtn.addEventListener("click", function() {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
})
signupLink.addEventListener("click", function() {
    signupBtn.click();
    return false;
})

//CONTACT FORM REGEX 
    //LISTENER FOR LOGIN BTN 
    document.getElementById("loginBtn").addEventListener("click", function(e) {
    e.preventDefault();  //Da ponistimo default funkciju dugmeta submit

    let name = document.getElementById("nameInput");
    let email = document.getElementById("emailInput");
    let pass = document.getElementById("passInput");

    let nameRegex = /^[A-Z][a-z]{2,}/;
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    let nameTest = nameRegex.test(name.value);   
    let emailTest = emailRegex.test(email.value);
    let passTest = passRegex.test(pass.value);

    let nameTrue = document.getElementById("nameTrue");  
    let nameFalse = document.getElementById("nameFalse");
    let emailTrue = document.getElementById("emailTrue");
    let emailFalse = document.getElementById("emailFalse");
    let passTrue = document.getElementById("passTrue");
    let passFalse = document.getElementById("passFalse");

    if(nameTest) {
        nameTrue.style.display = "block";
        name.style.borderColor = "green";
        nameFalse.style.display = "none";
    }else {
        nameFalse.style.display = "block";
        name.style.borderColor = "red";
        nameTrue.style.display = "none";
    }

    if(emailTest) {
        emailTrue.style.display = "block";
        email.style.borderColor = "green";
        emailFalse.style.display = "none";
    }else {
        emailFalse.style.display = "block";
        email.style.borderColor = "red";
        emailTrue.style.display = "none";
    }

    if(passTest) {
        passTrue.style.display = "block";
        pass.style.borderColor = "green";
        passFalse.style.display = "none";
    }else {
        passFalse.style.display = "block";
        pass.style.borderColor = "red";
        passTrue.style.display = "none";
    }
})

//LISTENER FOR SIGN-UP BTN 
document.getElementById("signupBtn").addEventListener("click", function(e) {
    e.preventDefault();

    let name = document.getElementById("nameInputSignup");
    let email = document.getElementById("emailInputSignup");
    let pass = document.getElementById("passInputSignup");
    let passConfirm = document.getElementById("passConfirmInputSignup");

    let nameRegex = /^[A-Z][a-z]{2,}/;
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    let passConfirmRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    let nameTest = nameRegex.test(name.value);
    let emailTest = emailRegex.test(email.value);
    let passTest = passRegex.test(pass.value);
    let passConfirmTest = passConfirmRegex.test(passConfirm.value);

    let nameTrue = document.getElementById("nameTrueSignup");  
    let nameFalse = document.getElementById("nameFalseSignup");
    let emailTrue = document.getElementById("emailTrueSignup");
    let emailFalse = document.getElementById("emailFalseSignup");
    let passTrue = document.getElementById("passTrueSignup");
    let passFalse = document.getElementById("passFalseSignup");
    let passConfirmTrue = document.getElementById("passConfirmTrueSignup");
    let passConfirmFalse = document.getElementById("passConfirmFalseSignup");

    if(nameTest) {
        nameTrue.style.display = "block";
        name.style.borderColor = "green";
        nameFalse.style.display = "none";
    }else {
        nameFalse.style.display = "block";
        name.style.borderColor = "red";
        nameTrue.style.display = "none";
    }

    if(emailTest) {
        emailTrue.style.display = "block";
        email.style.borderColor = "green";
        emailFalse.style.display = "none";
    }else {
        emailFalse.style.display = "block";
        email.style.borderColor = "red";
        emailTrue.style.display = "none";
    }

    if(passTest) {
        passTrue.style.display = "block";
        pass.style.borderColor = "green";
        passFalse.style.display = "none";
    }else {
        passFalse.style.display = "block";
        pass.style.borderColor = "red";
        passTrue.style.display = "none";
    }

    if(passConfirmTest) {
        passConfirmTrue.style.display = "block";
        passConfirm.style.borderColor = "green";
        passConfirmFalse.style.display = "none";
    }else {
        passConfirmFalse.style.display = "block";
        passConfirm.style.borderColor = "red";
        passConfirmTrue.style.display = "none";
    }
})



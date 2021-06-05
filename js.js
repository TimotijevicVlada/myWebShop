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
    }else {
        navBar.classList.remove("sticky");
    }
})

//CONTACT FORM STYLING
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form.signup-link a");

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



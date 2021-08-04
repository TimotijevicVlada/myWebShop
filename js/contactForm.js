
//Style za kontakt formu
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

signupBtn.addEventListener("click", function () {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.addEventListener("click", function () {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.addEventListener("click", function () {
  signupBtn.click();
  return false;
});

//Eye view on the login password
const inputPass = document.querySelector("#passInput");
const showBtn = document.querySelector(".fa-eye");
const hideBtn = document.querySelector(".fa-eye-slash");
showBtn.onclick = () => {
  if (inputPass.type === "password") {
    inputPass.type = "text";
    showBtn.style.display = "none";
    hideBtn.style.display = "block";
  } else {
    inputPass.type = "password";
  }
};
hideBtn.onclick = () => {
  if (inputPass.type === "text") {
    inputPass.type = "password";
    hideBtn.style.display = "none";
    showBtn.style.display = "block";
  } else {
    inputPass.type = "text";
  }
};
//Eye view on the signup password
const inputSignupPass = document.querySelector("#passInputSignup");
const showBtn1 = document.querySelector(".eye-second");
const hideBtn1 = document.querySelector(".eye-second-slash");
showBtn1.onclick = () => {
  if (inputSignupPass.type === "password") {
    inputSignupPass.type = "text";
    showBtn1.style.display = "none";
    hideBtn1.style.display = "block";
  } else {
    inputSignupPass.type = "password";
  }
};
hideBtn1.onclick = () => {
  if (inputSignupPass.type === "text") {
    inputSignupPass.type = "password";
    hideBtn1.style.display = "none";
    showBtn1.style.display = "block";
  } else {
    inputSignupPass.type = "text";
  }
};
//Eye view on the signup password confirm
const inputConfirmSign = document.querySelector("#passConfirmInputSignup");
const showBtn2 = document.querySelector(".eye-third");
const hideBtn2 = document.querySelector(".eye-third-slash");
showBtn2.onclick = () => {
  if (inputConfirmSign.type === "password") {
    inputConfirmSign.type = "text";
    showBtn2.style.display = "none";
    hideBtn2.style.display = "block";
  } else {
    inputConfirmSign.type = "password";
  }
};
hideBtn2.onclick = () => {
  if (inputConfirmSign.type === "text") {
    inputConfirmSign.type = "password";
    hideBtn2.style.display = "none";
    showBtn2.style.display = "block";
  } else {
    inputConfirmSign.type = "text";
  }
};
//Pasword on focus display require message
const requireLoginMsg = document.getElementsByClassName("require-msg")[0];
inputPass.onfocus = () => {
  requireLoginMsg.style.display = "block";
};
const requireSignupMsg =
  document.getElementsByClassName("require-msg-signup")[0];
inputSignupPass.onfocus = () => {
  requireSignupMsg.style.display = "block";
};
inputConfirmSign.onfocus = () => {
  requireSignupMsg.style.display = "block";
};


//Local storage za kontakt formu
  const get_korisnici = () => {
    return JSON.parse(localStorage.getItem("korisnici"));
  };
  
  const set_korisnici = (korisnici) => {
    localStorage.setItem("korisnici", JSON.stringify(korisnici));
  };
  
  var korisnici_svi = get_korisnici();
  if (korisnici_svi == null) {
    korisnici_svi = [
      new Korisnik("Pera", "pera@gmail.com", "Password123", "Password123"),
    ];
    set_korisnici(korisnici_svi);
    console.log(korisnici_svi);
  }
  
  const get_korisnik = () => {
    return JSON.parse(localStorage.getItem("korisnik"));
  };
  
  const set_korisnik = (korisnik) => {
    localStorage.setItem("korisnik", JSON.stringify(korisnik));
  };
  
  function Korisnik(ime, email, password, confirm_password) {
    this.ime = ime;
    this.email = email;
    this.password = password;
    this.confirm_password = confirm_password;
    this.korpa = [];
  }

//Regexi za kontakt formu
//Lisener za signup dugme
const registruj = document.getElementById("signupBtn");
  registruj.addEventListener("click", function (e) {
    e.preventDefault();

    let ime = document.getElementById("nameInputSignup");
    let email = document.getElementById("emailInputSignup");
    let password = document.getElementById("passInputSignup");
    let confirm_password = document.getElementById("passConfirmInputSignup");

    let nameRegex = /^[A-Z][a-z]{2,}/;
    let emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    let passConfirmRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    let nameTest = nameRegex.test(ime.value);
    let emailTest = emailRegex.test(email.value);
    let passTest = passRegex.test(password.value);
    let passConfirmTest = passConfirmRegex.test(confirm_password.value);

    let nameTrue = document.getElementById("nameTrueSignup");
    let nameFalse = document.getElementById("nameFalseSignup");
    let emailTrue = document.getElementById("emailTrueSignup");
    let emailFalse = document.getElementById("emailFalseSignup");
    let passTrue = document.getElementById("passTrueSignup");
    let passFalse = document.getElementById("passFalseSignup");
    let passConfirmTrue = document.getElementById("passConfirmTrueSignup");
    let passConfirmFalse = document.getElementById("passConfirmFalseSignup");

    if (nameTest) {
      nameTrue.style.display = "block";
      ime.style.borderColor = "green";
      nameFalse.style.display = "none";
    } else {
      nameFalse.style.display = "block";
      ime.style.borderColor = "red";
      nameTrue.style.display = "none";
    }

    if (emailTest) {
      emailTrue.style.display = "block";
      email.style.borderColor = "green";
      emailFalse.style.display = "none";
    } else {
      emailFalse.style.display = "block";
      email.style.borderColor = "red";
      emailTrue.style.display = "none";
    }

    if (passTest) {
      passTrue.style.display = "block";
      password.style.borderColor = "green";
      passFalse.style.display = "none";
    } else {
      passFalse.style.display = "block";
      password.style.borderColor = "red";
      passTrue.style.display = "none";
    }

    if (passConfirmTest) {
      passConfirmTrue.style.display = "block";
      confirm_password.style.borderColor = "green";
      passConfirmFalse.style.display = "none";
    } else {
      passConfirmFalse.style.display = "block";
      confirm_password.style.borderColor = "red";
      passConfirmTrue.style.display = "none";
    }

    /*SIGNUP FORME*/
    if (nameTest && emailTest && passTest && passConfirmTest) {
      let k = new Korisnik(
        ime.value,
        email.value,
        password.value,
        confirm_password.value
      );
      let svi_korisnici = get_korisnici();
      svi_korisnici.push(k);
      //console.log(k);
      set_korisnici(svi_korisnici);
      alert("registracija uspesna");
    }
  });


//Lisener za login dugme
const login = document.getElementById("loginBtn");
login.addEventListener("click", function (e) {
  e.preventDefault(); //Da ponistimo default funkciju dugmeta submit

  let name = document.getElementById("nameInput");
  let email = document.getElementById("emailInput");
  let pass = document.getElementById("passInput");

  let nameRegex = /^[A-Z][a-z]{2,}/;
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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

  if (nameTest) {
    nameTrue.style.display = "block";
    name.style.borderColor = "green";
    nameFalse.style.display = "none";
  } else {
    nameFalse.style.display = "block";
    name.style.borderColor = "red";
    nameTrue.style.display = "none";
  }

  if (emailTest) {
    emailTrue.style.display = "block";
    email.style.borderColor = "green";
    emailFalse.style.display = "none";
  } else {
    emailFalse.style.display = "block";
    email.style.borderColor = "red";
    emailTrue.style.display = "none";
  }

  if (passTest) {
    passTrue.style.display = "block";
    pass.style.borderColor = "green";
    passFalse.style.display = "none";
  } else {
    passFalse.style.display = "block";
    pass.style.borderColor = "red";
    passTrue.style.display = "none";
  }


  if (nameTest && emailTest && passTest) {
    let user = document.getElementsByClassName("user")[0];
    console.log(user);
    let svi_korisnici = get_korisnici();
    //console.log(svi_korisnici.length);
    for (let j = 0; j < svi_korisnici.length; j++) {
      let k = svi_korisnici[j];
      if (name.value == k.ime && email.value == k.email && pass.value == k.password) {
        alert("uspesno logovanje");
        //treba da znam ako je korisnik ulogovan
        //npr: korisnik dodje na stranicu za logovanje i uloguje se
        //zatim ode da stavi proizvod u korpu
        //moram da znam da li je korisnik ulogovan
        //to radim tako sto proverim da li u localstorage postoji kljuc korisnik
        set_korisnik(k);
        ispisi_korisnika();
        //document.location.href="index.html";
       // let current_user = get_korisnik();
        // user.innerHTML = "Ulogovani korisnik: " + current_user.ime;
        // console.log(current_user);
        return;
      }
    }
    alert("pogresni podaci");
    //ispisi_korisnika();
  }
});

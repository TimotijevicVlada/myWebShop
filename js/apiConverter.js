const select = document.querySelectorAll(".select-converter");
const input = document.querySelectorAll(".input-converter");
//Jedan kljuc mi je istekao posle mesec dana pa sam morao da aktiviram novi sa drugog naloga
//const api_url = "http://data.fixer.io/api/latest?access_key=98c72d6c665fedb7535325f9fbd68de1";
const api_url = "http://data.fixer.io/api/latest?access_key=d28883bcfebcc7c0604f4a89a6476491";
let html = "";

async function currency() {
    const res = await fetch(api_url); 
    //console.log(res);
    const data = await res.json();  //Dobijamo objekat sa informacijama i rates-ovima
    //console.log(data);
    const arrKeys = Object.keys(data.rates);   //Dobijamo niz rates-ova
    const rates = data.rates;  //Dobijamo rates za svaku valutu 
    //console.log(rates);
    //console.log(arrKeys);
    //Postavljamo svaki poseban rate u "option" drop listu
    arrKeys.map(item => {
        return html += `<option value="${item}">${item}</option>`;
    });
    //console.log(html);
    for(let i = 0; i < select.length; i++) {
        select[i].innerHTML = html;
    }
 
    function convert(i, j) {
     input[i].value = input[j].value * rates[select[i].value] / rates[select[j].value];
    }
    
    input[0].addEventListener("keyup", () => convert(1, 0));  //Konvertovanje u jednom smeru
    input[1].addEventListener("keyup", () => convert(0, 1));  //Konvertovanje u drugom smeru
    select[0].addEventListener("change", () => convert(1, 0));  //Isto i za select
    select[1].addEventListener("change", () => convert(0, 1));
 };
 
 currency();
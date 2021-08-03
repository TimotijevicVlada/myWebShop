if(korpa!=null){
  
    console.log(trenutni_korisnik);
    
  
  //   for(var i=0;i<proizvodi.length;i++){
  //     var li = document.createElement("li");
  //     li.setAttribute("class","list-group-item");
  //     li.innerHTML="naziv: "+proizvodi[i].title+", broj stavki: "+proizvodi[i].broj;
  
  //     var btn = document.createElement("button");
  //     btn.innerHTML="+";
  //     btn.value = proizvodi[i].id;
  //     btn.addEventListener("click",(e)=>{
  //       e.preventDefault();
  //       var id = e.target.value;
  
  //       var proizvodi = trenutni_korisnik.korpa;
  //       for(var i=0;i<proizvodi.length;i++){
  //         if(proizvodi[i].id==id){
  //           proizvodi[i].broj++;
  //           break;
  //         }
  //       }
        
  //       trenutni_korisnik.korpa = proizvodi;
  //       set_korisnik(trenutni_korisnik);
  //       document.location.reload();
  //     });
  //     li.appendChild(btn);
  
  //     var btn2 = document.createElement("button");
  //     btn2.innerHTML="-";
  //     btn2.value = proizvodi[i].id;
  //     btn2.addEventListener("click",(e)=>{
  //       e.preventDefault();
  //       var id = e.target.value;
  
  //       var proizvodi = trenutni_korisnik.korpa;
  //       for(var i=0;i<proizvodi.length;i++){
  //         if(proizvodi[i].id==id){
  //           proizvodi[i].broj--
  //           if(proizvodi[i].broj<=0){
  //             proizvodi.splice(i,1);
  //           }
  //           break;
  //         }
  //       }
        
  //       trenutni_korisnik.korpa = proizvodi;
  //       set_korisnik(trenutni_korisnik);
  //       document.location.reload();
  //     });
  //     li.appendChild(btn2);
  
  //     korpa.appendChild(li);
  //   }
  
  for(var i=0;i<proizvodi.length;i++){
    console.log(proizvodi[i]);
    var li = document.createElement("li");
    li.setAttribute("class","list-group-item");
  
    var row = document.createElement("div");
    row.setAttribute("class","row");
  
    var div1 = document.createElement("div");
    div1.setAttribute("class","col-4");
    //div1.innerHTML = "asd";
    var img = document.createElement("img");
    img.setAttribute("src",proizvodi[i].img_src);
    img.style.width="50px";
    img.style.height="50px";
    div1.appendChild(img);
    row.appendChild(div1);
  
    var div2 = document.createElement("div");
    div2.setAttribute("class","col-4");
    div2.innerHTML = "naziv: "+proizvodi[i].title+", broj stavki: "+proizvodi[i].broj;
    row.appendChild(div2);
  
    var div3 = document.createElement("div");
    div3.setAttribute("class","col-4");
    
    var btn = document.createElement("button");
    btn.innerHTML="+";
    btn.value = proizvodi[i].id;
    btn.classList.add("btn");
    btn.classList.add("btn-success");
    btn.classList.add("m-3");
    btn.addEventListener("click",(e)=>{
      e.preventDefault();
      var id = e.target.value;
  
      var proizvodi = trenutni_korisnik.korpa;
      for(var i=0;i<proizvodi.length;i++){
        if(proizvodi[i].id==id){
          proizvodi[i].broj++;
          break;
        }
      }
      
      trenutni_korisnik.korpa = proizvodi;
      set_korisnik(trenutni_korisnik);
      document.location.reload();
    });
    div3.appendChild(btn);
  
    var btn2 = document.createElement("button");
    btn2.innerHTML="-";
    btn2.value = proizvodi[i].id;
    btn2.classList.add("btn");
    btn2.classList.add("btn-danger");
    btn2.classList.add("m-3");
    btn2.addEventListener("click",(e)=>{
      e.preventDefault();
      var id = e.target.value;
  
      var proizvodi = trenutni_korisnik.korpa;
      for(var i=0;i<proizvodi.length;i++){
        if(proizvodi[i].id==id){
          proizvodi[i].broj--
          if(proizvodi[i].broj<=0){
            proizvodi.splice(i,1);
          }
          break;
        }
      }
      
      trenutni_korisnik.korpa = proizvodi;
      set_korisnik(trenutni_korisnik);
      document.location.reload();
    });
    div3.appendChild(btn2);
  
    row.appendChild(div3);
  
    li.appendChild(row);
    korpa.appendChild(li);
  }
  
  
  }
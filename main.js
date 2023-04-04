//crear panel de tareas con nombre columnas

const numColumnas = prompt("Ingresa el numero de columnas que queres que tenga tu lista de tareas");
const grilla = document.querySelector(".grilla");
let categorias = []

function clasificacion(){
    for (x=1; x<=numColumnas;x++) {
       
        const columna = document.createElement("div");
        const nombreCol = document.createElement("h1");
        nombreCol.innerText = prompt("Nombre de la columna");
        columna.id = nombreCol.innerText

        grilla.appendChild(columna);
        columna.appendChild(nombreCol);

        categorias.push (nombreCol.textContent)        
    }   
}


clasificacion();

//armar el select de cada tarea con nombres idem columnas

function clasificador(){
   const elegir= document.createElement("select");
   const clasifica = document.createElement("option")
   clasifica.innerText = "clasifica"
   elegir.appendChild(clasifica);

   for (x=0; x<numColumnas;x++) {
    const opcion = document.createElement("option")
    opcion.innerText = categorias[x]
    opcion.value = categorias[x]
    elegir.appendChild(opcion);
   }

   elegir.addEventListener("change", (e) => {
    const mover = e.target.parentElement;
    const aca = e.target.value;
    const donde = document.getElementById(aca)
    donde.appendChild(mover)
    
   });

  

   return elegir; 
}

//crear la tarea con tuti

const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");
const divHistorial = document.querySelector(".historial")

let historial= new Array()




addBtn.addEventListener("click",(e)=>{
    e.preventDefault();

    const text = input.value;

    if(text !== ""){
  
        const li = document.createElement("li");  
        li.style.backgroundColor= "#ffffff";
        li.style.borderColor= "#cecece";

        const p = document.createElement("p");
        p.textContent = text;
         
        
        let paleta = document.createElement("input");
        paleta.type= "color";
        paleta.value="#cecece";
        paleta.addEventListener("input", event => {
            li.style.borderColor=paleta.value ;
            li.style.backgroundColor=paleta.value +"50";
            
            
        });
        
        li.appendChild(p);
        li.appendChild(addDeleteBtn());
        li.appendChild(paleta);
        li.appendChild(clasificador());
        ul.appendChild(li);
        
        historial.unshift(input.value)
        if(historial.length=30){
            historial.pop()
            console.log(historial)
        }
        
        input.value = "";
        empty.style.display = "none";
      
    }
     
});


function addDeleteBtn() {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";    

    deleteBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        
        const li = e.target.parentElement.remove();

        var hayLi = document.querySelector("li");

        if (hayLi){
            empty.style.display = "none";
        }
        else{
            empty.style.display = "inline";
        }
        
    })
    return deleteBtn 

}

//historial-autocompletar

    function autocomplete(inp, arr) {
        var currentFocus;
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
              if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
              
              currentFocus++;
              
              addActive(x);
            } else if (e.keyCode == 38) { 
              currentFocus--;
              
              addActive(x);
            } else if (e.keyCode == 13) {
              
              e.preventDefault();
              if (currentFocus > -1) {
                
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          if (!x) return false;
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          
          x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }
        function closeAllLists(elmnt) {
          
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      
      document.addEventListener("click", function (e) {
          closeAllLists(e.target);
      });
      }
      
      autocomplete(input, historial);
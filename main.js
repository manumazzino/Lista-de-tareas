const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

addBtn.addEventListener("click",(e)=>{
    e.preventDefault();

    const text = input.value;

    if(text !== ""){
        const li = document.createElement("li");
        const p = document.createElement("p");

        
        p.textContent = text;
        li.appendChild(p);
        li.appendChild(addDeleteBtn());
        ul.appendChild(li);
        
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

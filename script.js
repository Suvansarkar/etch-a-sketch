const grid = document.getElementById("grid");
const gridSize = 16;
const pixelSize = grid.clientHeight/gridSize;
let color = "#808080";
let flag = false;

// #808080

function clear(){
    const div = document.querySelectorAll(".pixel");
    // console.log(div);
    div.forEach((item)=> {
        item.style.backgroundColor = "#FFFFFF";
    });
}



document.getElementById("clear").addEventListener("click", clear);

for (let i = 0; i < gridSize*gridSize; i++) {
    console.log(pixelSize);
    const div = document.createElement("div");
    div.style.width = pixelSize + "px";
    div.style.height = pixelSize + "px";
    div.classList.add("pixel");
    div.setAttribute("draggable", false);
    div.addEventListener("mousedown", () => {
        div.style.backgroundColor = color;
    });
    grid.appendChild(div);
}

document.addEventListener("mousedown", ()=>{
    flag=true;
});

document.addEventListener("mouseup", ()=>{
    flag=false;
});

document.querySelectorAll(".pixel").forEach((item)=>{
    item.addEventListener("mouseover", ()=>{
        if(flag===true){
            item.style.backgroundColor = color;
        }
    });
});

// document.addEventListener("mouseup", ()=>{
//     document.querySelectorAll(".pixel").forEach((item)=>{
//         item.removeEventListener("mouseover", ()=>{item.style.backgroundColor = "#FFFFFF";});
//     });
// });
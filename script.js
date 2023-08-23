const grid = document.getElementById("grid");
let gridSize = 16;
let pixelSize = grid.clientHeight/gridSize;
let color = "#ff0000";
let flag = false;

// #808080

function clear(){
    const div = document.querySelectorAll(".pixel");
    div.forEach((item)=> {
        item.style.backgroundColor = "#FFFFFF";
    });
}

function updateColor(value){
    color = value;
}

function updateCanvas(value){
    gridSize = value;
    pixelSize = grid.clientHeight/gridSize;
    console.log(value);
    makeCanvas();
}

makeCanvas();

document.getElementById("clear").addEventListener("click", clear);

function makeCanvas(){
    document.querySelectorAll(".pixel").forEach((item)=>{item.remove()});
    for (let i = 0; i < gridSize*gridSize; i++) {
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
    document.querySelectorAll(".pixel").forEach((item)=>{
        item.addEventListener("mouseover", ()=>{
            if(flag===true){
                item.style.backgroundColor = color;
            }
        });
    });
}

document.addEventListener("mousedown", ()=>{
    flag=true;
});

document.addEventListener("mouseup", ()=>{
    flag=false;
});


// document.addEventListener("mouseup", ()=>{
//     document.querySelectorAll(".pixel").forEach((item)=>{
//         item.removeEventListener("mouseover", ()=>{item.style.backgroundColor = "#FFFFFF";});
//     });
// });
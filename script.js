
const grid = document.getElementById("grid");
let gridSize = 16;
let pixelSize = grid.clientHeight/gridSize;
let color = "#ff0000";
let flag = false;
let random = false;
let darken = false;
let rclick = "#FFFFFF";
let right = false;
// #808080

function clear(){
    const div = document.querySelectorAll(".pixel");
    div.forEach((item)=> {
        item.style.backgroundColor = "#FFFFFF";
    });
}

function LightenDarkenColor(col,amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;
    
    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

function convertRgb(rgb) {
    // This will choose the correct separator, if there is a "," in your value it will use a comma, otherwise, a separator will not be used.
    var separator = rgb.indexOf(",") > -1 ? "," : " ";
  
  
    // This will convert "rgb(r,g,b)" into [r,g,b] so we can use the "+" to convert them back to numbers before using toString 
    rgb = rgb.substr(4).split(")")[0].split(separator);
  
    // Here we will convert the decimal values to hexadecimal using toString(16)
    var r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    // The return value is a concatenation of "#" plus the rgb values which will give you your hex
    return "#" + r + g + b;
  }

function updateColor(value){
    color = value;
}

function updateCanvas(value){
    gridSize = value;
    pixelSize = grid.clientHeight/gridSize;
    console.log(value);
    document.querySelector(".slider-size-text").textContent = gridSize + "x" + gridSize;
    makeCanvas();
}

function getColor(){
    if (random===false) {
        return color;
    }else if (random===true) {
        let randcolor = Math.floor(Math.random()*16777215).toString(16);
        return "#" + randcolor;
    }
}

function eraser(){
    if (right===true) {
        right=false;
    }else {
        right = true;
    }
    let temp = color;
    color = rclick;
    rclick = temp;
}

makeCanvas();

document.getElementById("darken").addEventListener("click", () => {
    if (darken===false) {
        document.getElementById("darken").style.backgroundColor = "#808080";
        darken=true;
        document.getElementById("random").style.backgroundColor = "#ffffff";
        random=false;
    }else {
        document.getElementById("darken").style.backgroundColor = "#ffffff";
        darken=false;
        random=false;
    }
});

document.getElementById("random").addEventListener("click", () => {
    if (random===false) {
        document.getElementById("random").style.backgroundColor = "#808080";
        random=true;
        document.getElementById("darken").style.backgroundColor = "#ffffff";
        darken=false;
    }else {
        document.getElementById("random").style.backgroundColor = "#ffffff";
        random=false;
        darken=false;
    }
});

document.getElementById("clear").addEventListener("click", clear);

function makeCanvas(){
    document.querySelectorAll(".pixel").forEach((item)=>{item.remove()});
    for (let i = 0; i < gridSize*gridSize; i++) {
        const div = document.createElement("div");
        div.style.width = pixelSize + "px";
        div.style.height = pixelSize + "px";
        div.classList.add("pixel");
        div.setAttribute("draggable", false);
        div.addEventListener("mousedown", (e) => {
            if(e.button === 2){
                console.log("Eraser Switch");
            }else if (right === false && darken===false) {
                div.style.backgroundColor = getColor();
            }else if (darken===true && right===false) {
                div.style.backgroundColor = LightenDarkenColor(convertRgb(div.style.backgroundColor), -10);
                console.log(darken);
            }else if(right===true && darken===false){
                div.style.backgroundColor = getColor();
            }else if (right===true && darken===true){
                eraser();
                div.style.backgroundColor = LightenDarkenColor(convertRgb(div.style.backgroundColor), -10);
                console.log(darken);
            }
        });
        div.addEventListener("contextmenu", (e)=>{
            e.preventDefault();
            if (right===true) {
                right=false;
            }else {
                right = true;
            }
            let temp = color;
            color = rclick;
            rclick = temp;
        });
        grid.appendChild(div);
    }    
    document.querySelectorAll(".pixel").forEach((item)=>{
        item.addEventListener("mouseover", ()=>{
            if(flag===true && darken===false){
                item.style.backgroundColor = getColor();
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
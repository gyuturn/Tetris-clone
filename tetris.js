import BLOKCS from "./blocks.js";

//DOM
const playground = document.querySelector(".playground > ul");

//Setting
const GAME_ROWS =20;
const GAME_COLS =10;

//variables
let score=0;
let duration = 500;
let downInterval;
let tempMovingItem;


const monvingItem={
     type:"tree",
     direction:0,
     top: 0,
     left: 3,

}

init();

//functions
function init(){
    
    // blockArray.forEach(block=>{
        
    // })
    tempMovingItem={...monvingItem};
   
    for( let i=0;i<20;i++){
        prerpendNewLine();
     }

     renderBlocks();
}


function prerpendNewLine(){
    const li =document.createElement("li");
    const ul =document.createElement("ul");
    for(let j=0;j<10;j++){
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);

}

function renderBlocks(moveType=""){
    const { type, direction,top,left}=tempMovingItem; 
    const movingBlocks= document.querySelectorAll(".moving");
     movingBlocks.forEach(moving=>{
         moving.classList.remove(type,"moving");
     })

     
    BLOKCS[type][direction].some(block => {
        const x = block[0]+left;
        const y= block[1]+top;
        
        
        
        const target = playground.childNodes[y]? playground.childNodes[y].childNodes[0].childNodes[x] :  null;
        console.log( playground.childNodes[y]);
        const isAvailabe = checkEmpty(target);
        if(isAvailabe){
             target.classList.add(type,"moving"); 
        } 
        else{
            tempMovingItem = {...monvingItem};
            setTimeout(()=>{
                renderBlocks();
                if(moveType==="top"){
                    seizeBlock();
                }
                
            },0)
            return true;
        }
       
    })
    monvingItem.left=left;
    monvingItem.top=top;
    monvingItem.direction=direction;
} 

 
function seizeBlock(){
    const movingBlocks= document.querySelectorAll(".moving");
    movingBlocks.forEach(moving=>{
        moving.classList.remove("moving");
        moving.classList.add("seized");
    })
    generateNewBlock();
}

function generateNewBlock(){
    const blockArray= Object.entries(BLOKCS);
    const randomIndex= Math.floor(Math.random()*blockArray.length);
    
    monvingItem.type=blockArray[randomIndex][0];
    monvingItem.top=0;
    monvingItem.left=3;
    monvingItem.direction =0;
    tempMovingItem={...monvingItem};
    renderBlocks();
}
function checkEmpty(target){
    if(!target || target.classList.contains("seized")){
    return false;
    }
    return true;
}

function moveBlock(moveType,amount){
    tempMovingItem[moveType] +=amount;
    renderBlocks(moveType);
}

function changeDirection(){
    const direction = tempMovingItem.direction;
    direction === 3? tempMovingItem.direction = 0 : tempMovingItem.direction+=1; 
    renderBlocks();
}

//event handling
document.addEventListener("keydown", e =>{
    switch(e.keyCode){
        case 39:
            moveBlock("left",1);
            break;
        case 37:
            moveBlock("left",-1);
            break;
        case 40:
            moveBlock("top",1);
            break;
        case 38:
            changeDirection();
    }

    
})
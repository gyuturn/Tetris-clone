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

const BLOKCS={
    tree: [
        [[2,1],[0,1],[1,0],[1,1]],
        [],
        [],
        [],
    ]
}
const monvingItem={
     type:"tree",
     direction:0,
     top: 0,
     left: 3,

}

init();

//functions
function init(){
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

function renderBlocks(){
    const { type, direction,top,left}=tempMovingItem; 
    const movingBlocks= document.querySelectorAll(".moving");
     movingBlocks.forEach(moving=>{
         moving.classList.remove(type,"moving");
     })

     
    BLOKCS[type][direction].forEach(block => {
        const x = block[0]+left;
        const y= block[1]+top;
        
        
        
        const target = playground.childNodes[y]? playground.childNodes[y].childNodes[0].childNodes[x] :  null;
        console.log(target);
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
            },0);
            
        }
       
    })
    monvingItem.left=left;
    monvingItem.top=top;
    monvingItem.direction=direction;
} 

//40:41 seizeBlock부터 만들기 settimeout 함수 왜 넣는거지??
function seizeBlock(){

}
function checkEmpty(target){
    if(!target){
    return false;
    }
    return true;
}

function moveBlock(moveType,amount){
    tempMovingItem[moveType] +=amount;
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
    }

    console.log(e);
})
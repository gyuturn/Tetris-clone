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
        [[0,0],[0,1],[1,0],[1,1]],
        [],
        [],
        [],
    ]
}
const monvingItem={
     type:"tree",
     direction:0,
     top: 0,
     left: 0,

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
    BLOKCS[type][direction].forEach(block => {
        const x = block[0];
        const y= block[1];
        
        //요기는 잘 모르겠음 일단 넘어가자 23분부터 부면됨
        const target = playground.childNodes[y].childNodes[0].childNodes[x];
        console.log(target);
    })
}
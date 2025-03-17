let duration=1000;
let cardsContainer=document.querySelector(".cards");
let cards=document.querySelectorAll(".card");
let cardsArr=[...cards];
let resetButton=document.getElementById("reset");
let scoreSpan=document.querySelector(".try span");
let nameSpan=document.querySelector(".name span");
let info=document.querySelector(".info");
let startButton=document.querySelector(".splash span");
let splash=document.querySelector(".splash");
window.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='hidden'){
        document.getElementById("background").pause();
    }
    else{
    document.getElementById("background").play();
    }
})
startButton.onclick=function(){
    document.getElementById("background").play();
    splash.remove();
    start();
}

// on click in any card
cardsArr.forEach((card)=>{
    card.addEventListener("click",()=>{
        flipCard(card)
    })
})


// function when click on card
function flipCard(card){
    card.classList.add("flip");
    let flipedCards=cardsArr.filter((c)=>{
        return c.classList.contains("flip");
    })
    if(flipedCards.length===2){
        stopClick();
        match(flipedCards[0],flipedCards[1]);
    }
}

// check if match function
function match(card1,card2){
    if(card1.dataset.shape===card2.dataset.shape){
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        card1.classList.add("match");
        card2.classList.add("match");
        card1.classList.add("noclick");
        card2.classList.add("noclick");
        setTimeout(()=>document.getElementById("succses").play(),300)
        let endGame=cardsArr.filter((e)=>{
            return e.classList.contains("match");
        })
        if(endGame.length===20){
            nameSpan.innerHTML="You Won !";
            info.classList.add("colors");
            document.getElementById("win").play();
        }
    }
    else{
        document.getElementById("fail").play();
        setTimeout(()=>{
            scoreSpan.innerHTML=parseInt(scoreSpan.innerHTML)+1;
            card1.classList.remove("flip");
            card2.classList.remove("flip");
            card1.classList.remove("shake");
            card2.classList.remove("shake");
        },1500)
    }
}
// stop click function
function stopClick(){
    cardsContainer.classList.add("noclick")
    setTimeout(()=>{
        cardsContainer.classList.remove("noclick");
    },1000)
}
//  on click in reset button
resetButton.onclick=start;

function start(){
    nameSpan.innerHTML="Memory Game";
    document.getElementById("background").play();
    info.classList.remove("colors");
    cardsArr.forEach((card)=>{
        card.classList.remove("flip");
        card.classList.remove("match");
        card.classList.remove("noclick");
        // call shuffle function
        setTimeout(()=>{
            shuffle();
        },500)
        setTimeout(()=>{
            card.classList.add("flip");
        },1500)
        setTimeout(()=>{
            card.classList.remove("flip");
        },2700)
    })
    // set the score to zero
    scoreSpan.innerHTML=`0`;
}
function shuffle(){
    let randomArr=[];
    while(randomArr.length<cardsArr.length)
    {
        let randomNum=Math.floor(Math.random()*cardsArr.length)+1;
        if(!randomArr.includes(randomNum)){
            randomArr.push(randomNum)
        }
    }
    for(let i=0;i<cardsArr.length;i++)
    {
        cardsArr[i].style.order=randomArr[i];
    }
    
}
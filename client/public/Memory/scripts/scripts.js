const cardArray = [
    {
        name:   'butterfly',
        img:    'images/butterfly.png'    
    },
    {
        name:   'hotballoon',
        img:    'images/hotballoon.png'    
    },
    {
        name:   'pear',
        img:    'images/pear.png'    
    },
    {
        name:   'seahorse',
        img:    'images/seahorse.png'    
    },
    {
        name:   'seashell',
        img:    'images/seashell.png'    
    },
    {
        name:   'teapot',
        img:    'images/teapot.png'    
    },
    {
        name:   'butterfly',
        img:    'images/butterfly.png'    
    },
    {
        name:   'hotballoon',
        img:    'images/hotballoon.png'    
    },
    {
        name:   'pear',
        img:    'images/pear.png'    
    },
    {
        name:   'seahorse',
        img:    'images/seahorse.png'    
    },
    {
        name:   'seashell',
        img:    'images/seashell.png'    
    },
    {
        name:   'teapot',
        img:    'images/teapot.png'    
    }
];
//shuffle array randomly.
cardArray.sort( () => 0.5 - Math.random());

const gridEl = document.querySelector('#grid');
const scoreEl = document.getElementById('result');
const mTotalEl = document.getElementById('matchTotal');
const total = '6';
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard(){
    for(let i = 0; i< cardArray.length; i++){
        const card = document.createElement('img');
        card.setAttribute('src', 'images/back.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard); //if the () are behind the function here it would be called on creation
        gridEl.append(card);
    }
    mTotalEl.textContent = "/" + total;
    scoreEl.textContent = '0';
}



function flipCard(){
    const cardId = this.getAttribute('data-id');  //gets the data-id attribute of the card that is clicked by using the this keyword
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if(cardsChosen.length === 2){
        //process when array reaches 2 cards chosen
        setTimeout(checkMatch, 500);
    }
}

function checkMatch(){
    const cards = document.querySelectorAll('#grid img');
    const card1 = cardsChosenIds[0];
    const card2 = cardsChosenIds[1];
    console.log('check for match');

    if(card1 == card2){
        cards[card1].setAttribute('src', 'images/back.png');
    }else if(cardsChosen[0] === cardsChosen[1]){
        alert('You found a match!');
        cards[card1].setAttribute('src', 'images/white.png');
        cards[card2].setAttribute('src', 'images/white.png');
        cards[card1].removeEventListener('click', flipCard);
        cards[card2].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen); //pair of cards pushed to cards one as single string
        scoreEl.textContent = cardsWon.length;
    } else{ 
        cards[card1].setAttribute('src', 'images/back.png');
        cards[card2].setAttribute('src', 'images/back.png');
    }
    cardsChosen = [];
    cardsChosenIds = [];

    if(cardsWon.length == (cardArray.length/2)){
        alert("Congrats!  You've found all of the matches!");
    }
}

createBoard();



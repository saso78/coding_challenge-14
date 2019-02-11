//    Description
//1. deck of all cards in game
//2. array that holds all cards
//3. move variable
//4. variable of matchedCards
//5. declare star icons
//6. stars list
//7. declare modal
//8. close icon in modal
//9. array for opened cards

// 1
const deck = document.getElementById("card-deck");


// 2.
let card = document.getElementsByClassName("card");
let cards = [...card]

// 3.
let moves = 0;
let counter = document.querySelector(".moves");

// 4.
let matchedCard = document.getElementsByClassName("match");

// 5.
const stars = document.querySelectorAll(".fa-star");

 // 6.
 let starsList = document.querySelectorAll(".stars li");

 // 7.
 let modal = document.getElementById("popup1")

 // 8.
 let closeicon = document.querySelector(".close");


 // 9.
var openedCards = [];





//             Functions 
//  shuffle - Knuth Shuffle function
// startGame -new game, shuffels the deck, removes classes from the card deck
// displayCard - opens and shows class to display cards
// cardOpen -adds cards to OpenedCards list and check if cards are match or not
// matched - handles matched cards
// unmantched - handles unmatched cards
// dissable - dissables cards 
// enable - enables cards and dissable matched cards
// moveCounter - counts the moves made after first click and calls startTimer function
// startTimer - starts a timer 
// congratulationds - end game function that call modal with info on rating moves and time , with a play again function
// closeModal - closes modal and starts a new game 
// playAgain - starts a new game 

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};



document.body.onload = startGame();

function startGame(){
    cards = shuffle(cards);
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    
    moves = 0;
    counter.innerHTML = moves;
    
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

function moveCounter(){
    moves++;
    counter.innerHTML = moves;
        if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add("show");
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        closeModal();
    };
}

function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}

function playAgain(){
    modal.classList.remove("show");
    startGame();
}

for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};

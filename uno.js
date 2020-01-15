/*

FIX GLOBAL VARIABLE


broken:
sometimes player plays card that doesn't match
sometimes player's chosen wild card color doesn't match
seems i can't draw a card without skipping last card in hand
**bonus** infinite loop?


    PSEUDOCODE:

    **done** -CREATE DECK
    **done** -CREATE PLAYER HANDS
    **done** -ISSUE CARDS FROM DECK INTO HANDS
    **done** -CREATE DISCARD PILE
    **done** -FLIP FIRST CARD FROM DECK
    -FIRST PLAYER TRIES TO PLAY
    -IF MATCH NUMBER OR COLOR, REMOVE CARD FROM HAND
    --USE HASATTRIBUTE TO CHECK IF IT'S A PLAIN CARD OR A FUNCTION CARD
    -DISCARD PILE NOW EQUALS MATCHED CARD FROM PLAYER HAND
    -NEXT PLAYER GOES, REPEAT
    -IF WILD CARD, DISCARD CARD FROM HAND
    -ALERT TO INPUT CARD COLOR AND NUMBER
    -DISCARD VALUE NOW EQUALS PROMPTED CARD
    -IF PLAYER CAN'T PLAY, DRAW ONCE, THEN GO TO NEXT PLAYER
    -IF PLAYER'S HAND LENGTH = 0, GAME OVER
    - UTILIZE PROMISES?
 */
let i = 0;
function revealRemainingDeck() {
    console.log("Here is the deck: ");
    console.log("===================");
    newDeck.forEach(function (card) {
        console.log("color: " + card.color + " | number: " + card.num + " | name: " + card.name);
    });
}
function randomCard() {
    tempCard = newDeck[Math.floor(Math.random() * (newDeck.length-1))];
    return tempCard;
}
function removeCardFromDeck() {
    let removeCard = newDeck.indexOf(tempCard);
    return newDeck.splice(removeCard, 1)
}


// same results for the below function, be it foreach or for loop
function showHand(user) {
    console.log("Here are " + user.name + "'s cards: ");
     user.hand.forEach(card => console.log(card.color + " " + card.num + " index: " + user.hand.indexOf(card)));
}
let usedArray = [];
function dealCardsToOnePlayer(user) {
    let i = 0;
    while (i < 4) {
        let flag = true;
        let tempCard = randomCard();
        while (flag) {
            if (usedArray.includes(tempCard)) {
                tempCard = randomCard();
            } else {
                usedArray.unshift(tempCard);
                user.hand.unshift(tempCard);
                flag = false;
            }
        }
        removeCardFromDeck();
        i++;
    }
}
function dealCardsToAllPlayers() {
    let j = 0;
    while (j < 3) {
        dealCardsToOnePlayer(players[j]);
        showHand(players[j]);
        console.log("========");
        j++;
    }
}
function drawCard(user) {
    user.hand.unshift(randomCard());
    removeCardFromDeck();
}

//variables:
let tempCard = {};
let player1 = {
    name: "James",
    hand: []
};
let player2 = {
    name: "Sangwiches",
    hand: []
};
let player3 = {
    name: "Lucy",
    hand: []
};
let players = [player1, player2, player3];
let discard = {};

function playWildCard(user) {
    discard = user.hand[i];
    console.log(user.name + " played a wild card!");
    console.log(user.name + " chooses the color " + user.hand[i].color);
    user.hand.splice(user.hand.indexOf(user.hand[i]), 1);
    showHand(user);
    console.log(user.hand.length + " cards remaining");
    console.log("===");
}
function playMatchingCard(user, index) {
    discard = user.hand[index];
    if (user.hand[index].num < 10) {
        console.log(user.name + " played a " + user.hand[index].color + " " + user.hand[index].num);
    } else {
        console.log(user.name + " played a " + user.hand[index].color + " " + user.hand[index].name);
    }
    user.hand.splice(user.hand.indexOf(user.hand[index]), 1);
    showHand(user);
    console.log(user.hand.length + " cards remaining");
    console.log("===");
}

discard = randomCard();
function checkPlayerCardMatch(user) {
    let tempCard = {};
    let j = 0;
    console.log("discard is: " + discard.color + " " + discard.num);
    console.log(user.name + "'s turn!");
    console.log("-----");
    for (let i = 0; i < user.hand.length; i++) {
        console.log("discard is: " + discard.color + " " + discard.num + " " + discard.name);
        if (j >= user.hand.length -1) {
            console.log("checking card... No results!");
            console.log(user.name + " has to draw a card!");
            drawCard(user);
            tempCard = user.hand[0];
            console.log(tempCard.name);
            if (tempCard.color === discard.color || tempCard.num === discard.num) {
                playMatchingCard(user);
                // } else if (tempCard.name === "wild" || tempCard.name === "drawFour") {
                //     playWildCard(user);
            } else {
                console.log(user.name + " can't play a card! Next!");
            }
            break;
        // } else if (user.hand[i].name === "wild" || user.hand[i].name === "drawFour") {
        //     playWildCard(user);
        //     break;
        } else if (user.hand[i].color === discard.color || user.hand[i].num === discard.num) {
            console.log("user played " + user.hand[i].color + user.hand[i].num);
            console.log("discard is " + discard.color + discard.num);

            playMatchingCard(user, i);
            break;
        } else {
            console.log(user.hand[i].color + " " + user.hand[i].num + " doesn't match.");
            console.log("===");
            j++;
        }
    }

}

function showArrayCards(arrayName) {
    console.log("Here are the cards drawn so far: ");
    arrayName.forEach(card => console.log(card.color + " " + card.num))
}
// console.log("----");
// console.log("discard color: " + discard.color + " | discard num: " + discard.num + " | discard name: " + discard.name);
// console.log("-----");
let flag = true;
//
// console.log("---");
dealCardsToAllPlayers();
checkPlayerCardMatch(players[0]);
checkPlayerCardMatch(players[1]);
checkPlayerCardMatch(players[2]);
checkPlayerCardMatch(players[0]);
checkPlayerCardMatch(players[1]);
checkPlayerCardMatch(players[2]);

// checkPlayerCardMatch(players[0]);
// checkPlayerCardMatch(players[1]);
// checkPlayerCardMatch(players[2]);
// checkPlayerCardMatch(players[0]);
// checkPlayerCardMatch(players[1]);
// checkPlayerCardMatch(players[2]);
//
// while (flag) {
//     checkPlayerCardMatch(players[0]);
//     if (players[0].length === 0) {
//         alert("The game is over! " + players[0].name + " wins!");
//         flag = false;
//     }
//     checkPlayerCardMatch(players[1]);
//     if (players[1].length <= 0) {
//         alert("The game is over! " + players[2].name + " wins!");
//         flag = false;
//     }
//     checkPlayerCardMatch(players[2]);
//     if (players[2].length <= 0) {
//         alert("The game is over! " + players[2].name + " wins!");
//         flag = false;
//     }
// }

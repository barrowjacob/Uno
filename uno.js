/*

FIX GLOBAL VARIABLE


broken:
user ignores draw fours at random

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
let discardPile = [];
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
    if (newDeck.length === 0) {
        newDeck = discardPile;
        discardPile = [];
        confirm("reshuffling deck!");
        console.log("-----------------");
        console.log(newDeck.length + " CARDS REMAINING IN DECK");
        console.log("-----------------");
    }
    user.hand.unshift(randomCard());
    console.log("-----------------");
    console.log(newDeck.length + " CARDS REMAINING IN DECK");
    console.log("-----------------");
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

function playWildCard(user, i) {
    discardPile.unshift(user.hand[i]);
    discard = user.hand[i];
    if (user.hand[i].num === 14) {
        let drawFour = "true";
    }
    console.log(user.name + " played a wild card!");
    console.log(user.name + " chooses the color " + user.hand[i].color);
    user.hand.splice(user.hand.indexOf(user.hand[i]), 1);
    showHand(user);
    console.log(user.name + " has " + user.hand.length + " cards remaining");
    console.log("===");
}
function playMatchingCard(user, i) {
    discardPile.unshift(user.hand[i]);
    discard = user.hand[i];
    if (user.hand[i].num < 10) {
        console.log(user.name + " played a " + user.hand[i].color + " " + user.hand[i].num);
    } else if (user.hand[i].num === 10) {
        let skip = "true";
        console.log(user.name + " played a " + user.hand[i].color + " " + user.hand[i].name);
    } else if (user.hand[i].num === 11) {
        let drawTwo = "true";
        console.log(user.name + " played a " + user.hand[i].color + " " + user.hand[i].name);
    } else {
        console.log(user.name + " played a " + user.hand[i].color + " " + user.hand[i].name);
    }
    user.hand.splice(user.hand.indexOf(user.hand[i]), 1);
    showHand(user);
    console.log(user.name + " has " + user.hand.length + " cards remaining");
    console.log("===");
}

discard = randomCard();
let skip = "true";
let drawTwo = "true";
let drawFour = "true";
function checkPlayerCardMatch(user, drawFour, drawTwo, skip) {
        let tempCard = {};
        let j = 0;
        console.log("discard is: " + discard.color + " " + discard.num);
        console.log(user.name + "'s turn!");
        console.log("-----");
        if (discard.num === 10 && skip === "true") {
            console.log(user.name + " has been skipped!");
            skip = "false";
        } else if (discard.num === 11 && drawTwo === "true") {
            console.log(user.name + " must draw two cards!");
            drawCard(user);
            drawCard(user);
            drawTwo = "false";
            console.log(user.name + "'s turn is over. Next!");
        } else if (discard.num === 14 && drawFour === "true") {
            console.log(user.name + " must draw FOUR CARDS!!");
            drawCard(user);
            drawCard(user);
            drawCard(user);
            drawCard(user);
            drawFour = "false";
            console.log(user.name + "'s turn is over. Next!");
        } else {
            for (let i = 0; i < user.hand.length; i++) {
                if (j >= user.hand.length - 1) {
                    console.log("checking card... No results!");
                    console.log(user.name + " has to draw a card!");
                    drawCard(user, i);
                    tempCard = user.hand[0];
                    console.log(tempCard.name);
                    if (tempCard.color === discard.color || tempCard.num === discard.num) {
                        playMatchingCard(user, 0);
                        break;
                    } else if (tempCard.num > 12) {
                        playWildCard(user, 0);
                        break;
                    } else {
                        console.log(user.name + " can't play a card! Next!");
                        showHand(user);
                    }
                    break;
                } else if (user.hand[i].num > 12) {
                    playWildCard(user, i);
                    break;
                } else if (user.hand[i].color === discard.color || user.hand[i].num === discard.num) {
                    console.log("user played " + user.hand[i].color + user.hand[i].num);
                    playMatchingCard(user, i);
                    break;
                } else {
                    console.log(user.hand[i].color + " " + user.hand[i].num + " doesn't match.");
                    console.log("===");
                    j++;
                }
            }
        }
}

function showArrayCards(arrayName) {
    console.log("Here are the cards drawn so far: ");
    arrayName.forEach(card => console.log(card.color + " " + card.num))
}
let flag = true;
var m = 0;
dealCardsToAllPlayers();
while (m < 300) {
    for (q = 0; q < 3; q++) {
            checkPlayerCardMatch(players[q]);
            m++;
            if (players[q].length === 0) {
                alert("The game is over! " + players[q].name + " wins!");
                flag = false;
            }
    }
}



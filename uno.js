/*

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

function revealRemainingDeck() {
    console.log("Here is the deck: ");
    console.log("===================");
    newDeck.forEach(function (card) {
        console.log("color: " + card.color + " | number: " + card.num + " | name: " + card.name);
    });
}
function randomCard() {
    tempCard = newDeck[Math.floor(Math.random() * (newDeck.length))];
    return tempCard;
}
function removeCardFromDeck() {
    let removeCard = newDeck.indexOf(tempCard);
    newDeck.splice(removeCard, 1)
}
function showHand(user) {
     user.forEach(card => console.log(card.color + " " + card.num));
}
function dealCardsToOnePlayer(user) {
    let i = 0;
    while (i < 4) {
        console.log(newDeck.length);
        user.unshift(randomCard(newDeck.length, 0));
        removeCardFromDeck();
        console.log(newDeck.length);
        console.log("---");
        i++;
    }
}
function dealCardsToAllPlayers() {
    let i = 0;
    while (i < 3) {
        dealCardsToOnePlayer(players[i].hand);
        console.log("=========");
        showHand(players[i].hand);
        i++;
    }
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



discard = randomCard();
let j = 0;
function checkPlayerCardMatch(user) {
    j = 0;
    console.log(user.name + "'s turn!");
    console.log("-----");
    console.log(user.name + "'s hand: ");
    console.log(showHand(user.hand));
    console.log("-----");
    for (let i = 0; i < user.hand.length; i++) {
        if (j === user.hand.length) {
            break;
        }
        if (user.hand[i].name === "wild" || user.hand[i].name === "drawFour") {
            user.hand.splice(user.hand.indexOf(user.hand[i]), 1);
            discard = user.hand[i];
            console.log("You play a wild card!");
            break;
        } else if (user.hand[i].color === discard.color || user.hand[i].num === discard.num) {
            discard = user.hand[i];
            console.log(user.hand[i].color + " " + user.hand[i].num + " matches!");
            user.hand.splice(user.hand.indexOf(user.hand[i]), 1);
            console.log(user.name + "'s hand now equals: ");
            showHand(user.hand);
            console.log("===");
            console.log("New discard is: ");
            console.log("color: " + discard.color + " | number: " + discard.num + " | name: " + discard.name);
            console.log("===");
            break;
        } else {
            console.log(user.hand[i].color + " " + user.hand[i].num + " doesn't match. Trying next card in hand.");
            j++;
        }
    }
}

dealCardsToAllPlayers();
console.log("----");
console.log("discard color: " + discard.color + " | discard num: " + discard.num + " | discard name: " + discard.name);
console.log("-----");
let flag = true;

while (flag) {
    checkPlayerCardMatch(players[0]);
    if (players[0].length === 0) {
        alert("The game is over! " + players[0].name + " wins!");
        flag = false;
    }
    checkPlayerCardMatch(players[1]);
    if (players[1].length <= 0) {
        alert("The game is over! " + players[2].name + " wins!");
    }
    checkPlayerCardMatch(players[2]);
    if (players[2].length <= 0) {
        alert("The game is over! " + players[2].name + " wins!");
    }
}

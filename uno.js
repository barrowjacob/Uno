/*

    PSEUDOCODE:

    -CREATE DECK
    -CREATE PLAYER HANDS
    -ISSUE CARDS FROM DECK INTO HANDS
    -CREATE DISCARD PILE
    -FLIP FIRST CARD FROM DECK
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
    user.forEach(function(card){
        console.log("color: " + card.color + " | number: " + card.num + " | name: " + card.name);
    })
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
        dealCardsToOnePlayer(players[i]);
        console.log("=========");
        showHand(players[i]);
        i++;
    }
}

//variables:
let tempCard = {};
let player1Hand = [];
let player2Hand = [];
let player3Hand = [];
let players  = [player1Hand, player2Hand, player3Hand];
let discard = {};


dealCardsToAllPlayers();




"use strict";

var squares = document.getElementsByClassName("square");
var coordinateArr = [];
for (var i = 0; i < squares.length; i++) {
  var coordinates = squares[i].getAttribute("id");
  coordinateArr.push(coordinates);
}

//function to retrieve a random square's coordinates
function getRandomCoordinates() {
    return coordinateArr[Math.floor(Math.random() * coordinateArr.length)];
}

//function to reverse black and white perspective
function switchSides() {
  coordinateArr.reverse();
  for (var i = 0; i < coordinateArr.length; i++) {
    squares[i].setAttribute("id", coordinateArr[i]);
  }
}
  
//function to retrieve a square's coordinates


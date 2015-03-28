"use strict";
  
var squares = document.getElementsByClassName("square"),
  coordinates,
  coordinateArr = [],
  i,
  playButton = document.getElementById("play-button");

//function to addEventListener
function addListener(obj) {
  obj.addEventListener("click", function () {console.log("clicked")});
}

//function to retrieve a random square's coordinates from arr
function getRandomCoordinates() {
  return coordinateArr[Math.floor(Math.random() * coordinateArr.length)];
}

//function to reverse black and white perspective
function switchSides() {
  coordinateArr.reverse();
  for (i = 0; i < coordinateArr.length; i += 1) {
    squares[i].setAttribute("id", coordinateArr[i]);
  }
}

//function to push results of getRandomCoordinates() to "next move" queue
function currentCoordinate() {
  var currentCoordinateHolder = document.getElementById("current-coordinate-holder");
  var currentCoordinate = getRandomCoordinates();
  currentCoordinateHolder.innerHTML = "<p>" + currentCoordinate + "</p>";
}

//function to add .progress-bar to activate timer
function startTimer() {
  var progBar = document.getElementById("prog-bar");
  progBar.className = "progress-bar";
}

//add event listeners and push coordinates to array
for (i = 0; i < squares.length; i += 1) {
  addListener(squares[i]);
  coordinates = squares[i].getAttribute("id");
  coordinateArr.push(coordinates);
}

//add event listener to play button
addListener(playButton);
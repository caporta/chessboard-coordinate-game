"use strict";

var squares = document.getElementsByClassName("square"),
  playButton = document.getElementById("play-button"),
  progBar = document.getElementById("prog-bar"),
  finalScoreHolder = document.getElementById("final-score-holder"),
  currentCoordinateHolder = document.getElementById("current-coordinate-holder"),
  chooseSide = document.getElementById("choose-side"),
  coordinates,
  coordinateArr = [],
  i,
  currentMove,
  sideVal,
  correctAnswers = 0;

// push coordinates to array
function pushToArray() {
  for (i = 0; i < squares.length; i += 1) {
    coordinateArr.push(squares[i].getAttribute("id"));
  }
}

// retrieve a random square's coordinates from arr
function getRandomCoordinates() {
  return coordinateArr[Math.floor(Math.random() * coordinateArr.length)];
}

// flip board
function switchSides() {
  coordinateArr.reverse();
  for (i = 0; i < coordinateArr.length; i += 1) {
    squares[i].setAttribute("id", coordinateArr[i]);
  }
}

function randomSide() {
  var sideGen = Math.round(Math.random());
  if (!sideGen) {
    switchSides();
  }
}

// push random coordinates to the 'coordinate' queue
function currentCoordinates() {
  currentMove = getRandomCoordinates();
  currentCoordinateHolder.innerHTML = "<p>" + currentMove + "</p>";
  return currentMove;
}

// add .progress-bar to activate timer
function startTimer() {
  progBar.className = "progress-bar";
}

function nextMove(iDynamic) {
  return function () {
    if (currentMove === squares[iDynamic].getAttribute("id")) {
      currentMove = currentCoordinates();
      correctAnswers += 1;
      currentCoordinateHolder.style.color = "#fbfbfb";
      return currentMove;
    } else if (currentMove !== squares[iDynamic].getAttribute("id")) {
      currentCoordinateHolder.style.color = "#ff0033";
    }
  };
}

// start game
function startGame() {
  currentCoordinateHolder.style.color = "#fbfbfb";
  sideVal = chooseSide.options[chooseSide.selectedIndex].value;
  currentMove = currentCoordinates();
  startTimer();
  finalScoreHolder.innerHTML = "";
  playButton.setAttribute("disabled", true);
  if (sideVal === "random") {
    randomSide();
  } else if (sideVal === "black" && coordinateArr[0] === "a8") {
    switchSides();
  } else if (sideVal === "white" && coordinateArr[0] === "h1") {
    switchSides();
  }
}

function endGame() {
  progBar.className = "complete";
  finalScoreHolder.innerHTML = "<p>" + correctAnswers + "<p>";
  currentCoordinateHolder.innerHTML = "";
  playButton.disabled = false;
  correctAnswers = 0;
}

pushToArray();

// add event listener to side picker
chooseSide.addEventListener("change", function () {
  if (chooseSide.options[chooseSide.selectedIndex].value !== "random") {
    switchSides();
  }
}, false);

// add event listeners to squares & permit move
for (i = 0; i < squares.length; i += 1) {
  squares[i].addEventListener("click", nextMove(i), false);
}
// add event listener to play button
playButton.addEventListener("click", startGame, false);

// add prefixed event listeners to progBar animation
progBar.addEventListener("webkitAnimationEnd", endGame, false);
progBar.addEventListener("animationend", endGame, false);
progBar.addEventListener("oAnimationend", endGame, false);
progBar.addEventListener("MSAnimationEnd", endGame, false);























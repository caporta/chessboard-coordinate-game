(function () {
  "use strict";

  //constructor
  function Board () {}

  //instance
  var board = new Board();

  //assign properties
  board.squares = document.getElementsByClassName("square");
  board.playButton = document.getElementById("play-button");
  board.progBar = document.getElementById("prog-bar");
  board.finalScoreHolder = document.getElementById("final-score-holder");
  board.currentCoordinateHolder = document.getElementById("current-coordinate-holder");
  board.chooseSide = document.getElementById("choose-side");
  board.coordinateArr = [];
  board.correctAnswers = 0;
  board.currentMove = null;
  board.sideVal = null;

  //push coordinates to array
  board.pushToArray = function () {
    for (var i = 0; i < this.squares.length; i += 1) {
      this.coordinateArr.push(this.squares[i].getAttribute("id"));
    }
  };
  //retrieve a random square's coordinates from arr
  board.getRandomCoordinates = function () {
    return this.coordinateArr[Math.floor(Math.random() * this.coordinateArr.length)];
  };
  //flip board
  board.switchSides = function () {
    this.coordinateArr.reverse();
    for (var i = 0; i < this.coordinateArr.length; i += 1) {
      this.squares[i].setAttribute("id", this.coordinateArr[i]);
    }
  };
  board.randomSide = function () {
    var sideGen = Math.random() >= 0.5 ? true : false;
    if (!sideGen) {
      board.switchSides();
    }
  };
  //push random coordinates to the 'coordinate queue'
  board.currentCoordinates = function () {
    this.currentMove = this.getRandomCoordinates();
    this.currentCoordinateHolder.innerHTML = "<p>" + this.currentMove + "</p>";
    return this.currentMove;
  };
  //add .progress-bar to activate timer
  board.startTimer = function () {
    this.progBar.className = "progress-bar";
  };
  board.nextMove = function (iDynamic) {
    var that = this;
    return function () {
      if (that.currentMove === that.squares[iDynamic].getAttribute("id")) {
        that.currentMove = that.currentCoordinates();
        that.correctAnswers += 1;
        that.currentCoordinateHolder.style.color = "#fbfbfb";
        return that.currentMove;
      } else if (that.currentMove !== that.squares[iDynamic].getAttribute("id")) {
          that.currentCoordinateHolder.style.color = "#ff0033";
      }
    };
  };
  board.startGame = function () {
    this.currentCoordinateHolder.style.color = "#fbfbfb";
    this.sideVal = this.chooseSide.options[this.chooseSide.selectedIndex].value;
    this.currentMove = this.currentCoordinates();
    this.startTimer();
    this.finalScoreHolder.innerHTML = "";
    this.playButton.setAttribute("disabled", true);
    this.chooseSide.setAttribute("disabled", true);
    if (this.sideVal === "random") {
      this.randomSide();
    } else if (this.sideVal === "black" && this.coordinateArr[0] === "a8") {
        this.switchSides();
    } else if (this.sideVal === "white" && this.coordinateArr[0] === "h1") {
        this.switchSides();
    }
  };
  board.endGame = function () {
    this.progBar.className = "complete";
    this.finalScoreHolder.innerHTML = "<p>" + this.correctAnswers + "</p>";
    this.currentCoordinateHolder.innerHTML = "";
    this.currentMove = "";
    this.playButton.disabled = false;
    this.chooseSide.disabled = false;
    this.correctAnswers = 0;
  };

  board.pushToArray();

  // add event listener to side picker
  board.chooseSide.addEventListener("change", function () {
    if (board.chooseSide.options[board.chooseSide.selectedIndex].value !== "random") {
      board.switchSides();
    }
  }, false);

  // add event listeners to squares & permit move
  for (var i = 0; i < board.squares.length; i += 1) {
    board.squares[i].addEventListener("click", board.nextMove.call(board, i), false);
  }
  // add event listener to play button
  board.playButton.addEventListener("click", board.startGame.bind(board), false);

  // add prefixed event listeners to progBar animation
  board.progBar.addEventListener("webkitAnimationEnd", board.endGame.bind(board), false);
  board.progBar.addEventListener("animationend", board.endGame.bind(board), false);
  board.progBar.addEventListener("oAnimationend", board.endGame.bind(board), false);
  board.progBar.addEventListener("MSAnimationEnd", board.endGame.bind(board), false);
})();

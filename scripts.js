(function () {
  "use strict";

  var board = {
    squares: document.getElementsByClassName("square"),
    playButton: document.getElementById("play-button"),
    progBar: document.getElementById("prog-bar"),
    finalScoreHolder: document.getElementById("final-score-holder"),
    currentCoordinateHolder: document.getElementById("current-coordinate-holder"),
    chooseSide: document.getElementById("choose-side"),
    coordinateArr: [],
    correctAnswers: 0,
    currentMove: null,
    sideVal: null,
    //push coordinates to array
    pushToArray: function () {
      for (var i = 0; i < this.squares.length; i += 1) {
        this.coordinateArr.push(this.squares[i].getAttribute("id"));
      }
    },
    //retrieve a random square's coordinates from arr
    getRandomCoordinates: function () {
      return this.coordinateArr[Math.floor(Math.random() * this.coordinateArr.length)];
    },
    //flip board
    switchSides: function () {
      this.coordinateArr.reverse();
      for (var i = 0; i < this.coordinateArr.length; i += 1) {
        this.squares[i].setAttribute("id", this.coordinateArr[i]);
      }
    },
    randomSide: function () {
      // 0 or 1
      var sideGen = Math.random() >= 0.5 ? true : false;
      if (!sideGen) {
        board.switchSides();
      }
    },
    //push random coordinates to the 'coordinate queue'
    currentCoordinates: function () {
      this.currentMove = this.getRandomCoordinates();
      this.currentCoordinateHolder.innerHTML = "<p>" + this.currentMove + "</p>";
      return this.currentMove;
    },
    //add .progress-bar to active timer
    startTimer: function () {
      this.progBar.className = "progress-bar";
    },
    nextMove: function (iDynamic) {
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
    },
    startGame: function () {
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
    },
    endGame: function () {
      this.progBar.className = "complete";
      this.finalScoreHolder.innerHTML = "<p>" + this.correctAnswers + "</p>";
      this.currentCoordinateHolder.innerHTML = "";
      this.currentMove = "";
      this.playButton.disabled = false;
      this.chooseSide.disabled = false;
      this.correctAnswers = 0;
    }
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

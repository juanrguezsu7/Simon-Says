const colorfulText = document.querySelector(".title");
const text = colorfulText.innerText;
let characterAnimations = new Array();

animatedTitle();

function animatedTitle() {
  colorfulText.innerHTML = "";
  for (let i = 0; i < text.length; ++i) {
    setTimeout(function() {
      const span = document.createElement("span");
      span.style.color = "red";
      span.style.fontSize = "2em";
      span.style.width = "1em";
      span.style.height = "1em";
      span.style.textShadow = "4px 4px black";
      span.textContent = text[i];
      colorfulText.appendChild(span);
      characterAnimations.push(setInterval(function() {nextColor(span);}, 300));
    }, i * 100);
  }
}

function nextColor(spanTag) {
  switch (spanTag.style.color) {
    case "red":
      spanTag.style.color = "green";
      break;
    case "green":
      spanTag.style.color = "blue";
      break;
    case "blue":
      spanTag.style.color = "yellow";
      break;
    case "yellow":
      spanTag.style.color = "red";
      break;
    default:
      break;
  }
}

function stopAnimation() {
  for (animation in characterAnimations) {
    clearInterval(animation);
  }
  characterAnimations.length = 0;
}

function staticTitle(newColor) {
  stopAnimation();
  colorfulText.innerHTML = "";
  const header = document.createElement("h1");
  header.innerText = text;
  header.style.textShadow = "4px 4px black";
  header.style.fontSize = "2em";
  header.style.color = newColor;
  colorfulText.appendChild(header);
}

let gameColors = new Array();
let gameLevel = 1;

document.querySelector(".play-button").addEventListener("click", startGame);

function startGame() {
  setScore(0);
  gameLevel = 1;
  gameColors.length = 0;
  nextSequence();
}

function nextSequence() {
  animatedTitle();
  removeClickEvents();
  ++gameLevel;
  for (let i = 1; i < gameLevel; ++i) {
    setTimeout(function() {
      chosenColor = getRandomColor();
      gameColors.push(chosenColor);
      colorSelection(chosenColor);
    }, i * 1000);
  }
  setTimeout(addClickEvents, (gameLevel - 1) * 1000 + 100);
}

function getRandomColor() {
  let randomColor = Math.floor(Math.random() * 10) % 4;
  switch (randomColor) {
    case 0:
      return "red";
    case 1:
      return "green";
    case 2:
      return "blue";
    case 3:
      return "yellow";
  }
}

function colorSelection(color) {
  let square = document.querySelector("." + color);
  square.classList.add("square-click");
  let audio = new Audio("./assets/sounds/" + color + ".mp3");
  audio.volume = 0.2;
  audio.play();
  setTimeout(function() {square.classList.remove("square-click")}, 300);
}

function setScore(newScore) {
  document.querySelector(".score-number").innerText = newScore;
}

function getScore() {
  return parseInt(document.querySelector(".score-number").innerText);
}

function handleSquareClick() {
  let squareColor = this.classList[0];
  staticTitle(squareColor);
  colorSelection(squareColor);
  if (squareColor === gameColors[0]) {
    setScore(getScore() + 1);
    gameColors.splice(0, 1);
    if (gameColors.length === 0) {
      removeClickEvents();
      setTimeout(function() {nextSequence();}, 1000);
    }
  } else {
      let wrongAudio = new Audio("./assets/sounds/wrong.mp3");
      wrongAudio.volume = 0.2;
      wrongAudio.play();
      setTimeout(lost, 0);
  }
}

function lost() {
  animatedTitle();
  removeClickEvents();
  document.querySelector(".play-button").addEventListener("click", startGame);
}

function removeClickEvents() {
  let allSquares = document.querySelectorAll(".square");
  document.querySelector(".play-button").removeEventListener("click", startGame);
  for (let i = 0; i < allSquares.length; ++i) {
    allSquares[i].removeEventListener("click", handleSquareClick);
  }
}

function addClickEvents() {
  let allSquares = document.querySelectorAll(".square");
  document.querySelector(".play-button").addEventListener("click", startGame);
  for (let i = 0; i < allSquares.length; ++i) {
    allSquares[i].addEventListener("click", handleSquareClick);
  }
}
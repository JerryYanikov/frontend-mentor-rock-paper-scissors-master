//DOM
const matchStart = document.getElementById("matchStart");
const matchProgress = document.getElementById("matchProgress");
const playerSelect = document.getElementById("playerSelect");
const playerIcon = document.getElementById("playerIcon");
const computerSelect = document.getElementById("computerSelect");
const computerIcon = document.getElementById("computerIcon");
const housePickText = document.getElementById("housePickText");
const shadow = document.getElementById("shadow");
const winLose = document.getElementById("winLose");
const statusText = document.getElementById("status");
const choise = document.querySelectorAll(".icon-wrapper");
const choices = document.querySelectorAll(".choice");
const rulesButtom = document.getElementById("rules");
const scorePoints = document.getElementById("score");
const playAgain = document.getElementById("playAgain");
const rulesOverlay = document.getElementById("rulesOverlay");
const closeRules = document.getElementById("closeRules");
const resetScore = document.getElementById("resetScore");

//default view
const defaultView = () => {
  matchStart.style.display = "block";
  matchProgress.style.display = "none";
  winLose.style.display = "none";
  computerSelect.style.display = "none";
  for (let i = 0; i < choices.length; i++) {
    choices[0].style.transform = "translateX(0)";
    choices[1].style.transform = "translateX(0)";
  }
  housePickText.innerText = "The House Still Picking...";
  shadow.style.display = "block";
  playerSelect.style.boxShadow = "none";
  computerSelect.style.boxShadow = "none";
  rulesOverlay.style.display = "none";
};
defaultView();

//score tracking
let score = 0;
const updateScore = () => {
  scorePoints.innerText = score;
  sessionStorage.setItem("score", score);
};
updateScore();

//choose your move
for (let i = 0; i < choise.length; i++) {
  choise[i].addEventListener("click", () => {
    //player's choise
    let playerChoise;
    switch (i) {
      case 0:
        playerChoise = "scissors";
        break;
      case 1:
        playerChoise = "paper";
        break;
      case 2:
        playerChoise = "rock";
        break;
      case 3:
        playerChoise = "lizard";
        break;
      case 4:
        playerChoise = "spock";
        break;
    }
    matchStart.style.display = "none";
    matchProgress.style.display = "flex";
    playerSelect.classList.add(`icon-${playerChoise}`);
    playerIcon.innerHTML = `<img src="img/icon-${playerChoise}.svg" alt="${playerChoise}">`;

    //computer's choise
    let j = Math.floor(Math.random() * (5 - 0));
    let computerChoise;
    switch (j) {
      case 0:
        computerChoise = "scissors";
        break;
      case 1:
        computerChoise = "paper";
        break;
      case 2:
        computerChoise = "rock";
        break;
      case 3:
        computerChoise = "lizard";
        break;
      case 4:
        computerChoise = "spock";
        break;
    }
    computerSelect.classList.add(`icon-${computerChoise}`);
    computerIcon.innerHTML = `<img src="img/icon-${computerChoise}.svg" alt="${computerChoise}">`;
    //cumputer may take time to choose its move
    //this makes it look like you are playing online
    let housePickTime = Math.floor(Math.random() * 2 - 0);
    if (housePickTime > 0) {
      setTimeout(() => {
        housePickText.innerText = "The House Picked";
        shadow.style.display = "none";
        computerSelect.style.display = "flex";
      }, 2000);
    } else {
      housePickText.innerText = "The House Picked";
      shadow.style.display = "none";
      computerSelect.style.display = "flex";
    }

    //Set Who Won
    setTimeout(() => {
      if (i == j) {
        //din case of a draw
        draw();
      } else if (
        (i == 0 && j == 1) ||
        (i == 0 && j == 3) ||
        (i == 1 && j == 2) ||
        (i == 1 && j == 4) ||
        (i == 2 && j == 0) ||
        (i == 2 && j == 3) ||
        (i == 3 && j == 1) ||
        (i == 3 && j == 4) ||
        (i == 4 && j == 0) ||
        (i == 4 && j == 2)
      ) {
        playerWin();
      } else if (
        (i == 0 && j == 2) ||
        (i == 0 && j == 4) ||
        (i == 1 && j == 0) ||
        (i == 1 && j == 3) ||
        (i == 2 && j == 1) ||
        (i == 2 && j == 4) ||
        (i == 3 && j == 0) ||
        (i == 3 && j == 2) ||
        (i == 4 && j == 1) ||
        (i == 4 && j == 3)
      ) {
        computerWin();
      }
    }, 3000);
  });
}

//move the results asaide to leave space for the winner decleration + play again button
const moveChoices = () => {
  if (window.innerWidth > 1100) {
    for (let i = 0; i < choices.length; i++) {
      choices[0].style.transform = "translateX(-100px)";
      choices[1].style.transform = "translateX(100px)";
    }
  }
};

//if player won
const playerWin = () => {
  moveChoices();
  score++; //add score
  updateScore();
  playerSelect.style.boxShadow = "0px 0px 100px white"; // highlight player's move
  setTimeout(() => {
    statusText.innerText = "You Win";
    winLose.style.display = "block";
  }, 1000);
};

const computerWin = () => {
  moveChoices();
  score--; //decreace score score
  updateScore();
  computerSelect.style.boxShadow = "0px 0px 100px white"; // highlight player's move
  setTimeout(() => {
    statusText.innerText = "You Lose";
    winLose.style.display = "block";
  }, 1000);
};

const draw = () => {
  moveChoices();
  setTimeout(() => {
    statusText.innerText = "Draw";
    winLose.style.display = "block";
  }, 1000);
};

//play again button
playAgain.addEventListener("click", (e) => {
  defaultView();
});

//rules popup button
rulesButtom.addEventListener("click", (e) => {
  rulesOverlay.style.display = "flex";
});

//close rules button
closeRules.addEventListener("click", (e) => {
  rulesOverlay.style.display = "none";
});

//reset score button
resetScore.addEventListener("click", (e) => {
  score = 0;
  updateScore();
});

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector(".board");
const winningMessage = document.querySelector(".winning-menssage");
const winningMessageTextElement = document.querySelector(".winning-menssage p");
const restartButton = document.querySelector(".winning-button");

const scoreXElement = document.getElementById("score-x");
const scoreOElement = document.getElementById("score-o");
//Controlar o estado do jogo (definindo a vez de quem vai jogar e armazena a pontuação)
let isCircleTurn;
let scoreX = 0;
let scoreO = 0;
//todas as possiveis combinaçoes de vitoria
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];
//funcao que deixa o tabuleiro pronto pra começar(sempre começa pelo X)
const startGame = () => {
  isCircleTurn = false;
//limpeza do tabuleiro
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.style.display = "none";
};
//aumentar o placar (o numero atualiza no HTML)
const updateScore = () => {
  if (isCircleTurn) {
    scoreO++;
    scoreOElement.innerText = scoreO;
  } else {
    scoreX++;
    scoreXElement.innerText = scoreX;
  }
};
//exibindo a tela de vitoria ou empate
const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!";
    updateScore();
  }

  winningMessage.style.display = "flex";
};
//verificar se a jogada pertence a uma combinação
const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};
//ver se deu empate
const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};
//alterna a vez do jogador entre X e O
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
};

const handleClick = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  const isWin = checkForWin(classToAdd);
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
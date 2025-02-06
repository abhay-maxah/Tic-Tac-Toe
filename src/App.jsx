import { useState } from "react";
import Player from "./components/player";
import GameBord from "./components/GameBord";
import Log from "./components/log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";
function deriveActivPlayer(gameTurn) {
  let currentPlayer = "O";
  if (gameTurn.length > 0 && gameTurn[0].player === "O") {
    currentPlayer = "X";
  }
  return currentPlayer;
}
const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function App() {
  const [player,setplayer]=useState({
    O:'Player 1',
    X:'Player 2'
  })
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = deriveActivPlayer(gameTurn);
  //create a new copy from orginal & map is used for create a innerarray copy
  let gameBoard = [...intialGameBoard.map((array) => [...array])];
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner = null;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];
    if (
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol &&
      firstSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }
  const hasDraw = gameTurn.length == 9 && !winner;
  console.log(hasDraw);
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn((prevTurns) => {
      const activePlayer = deriveActivPlayer(prevTurns);
      const newTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns,
      ];
      return newTurns; // return the new array of turns
    });
  }
  function handleRematch() {
    setGameTurn([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="player 1" symbol="O" isActive={activePlayer === "O"} />
          <Player name="player 2" symbol="X" isActive={activePlayer === "X"} />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRematch} />
        )}
        <GameBord
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        ></GameBord>
      </div>

      <Log turns={gameTurn} />
    </main>
  );
}

export default App;

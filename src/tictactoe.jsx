import { useState } from "react";
import "./ttt.css";

function TicTacToe() {
  let [currentState, setCurrentState] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const [draw, setDraw] = useState(false);

  // checker function for winner
  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setWinner("");
    setDraw(false);
    setCurrentState("X");
  };
  const CheckWinner = (board) => {
    let arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    arr.forEach((element) => {
      if (
        board[element[0]] === board[element[1]] &&
        board[element[1]] === board[element[2]]
      ) {
        setWinner(board[element[0]]);
        return true;
      }
    });
    if (!board.includes("")) {
      setDraw(true);
    }
    return false;
  };

  const ChangeTurn = (id) => {
    if (winner === "" && !draw && board[id] === "") {
      let newBoard = [...board];
      newBoard[id] = currentState;
      if (CheckWinner(newBoard) || draw) {
        return;
      }
      setBoard(newBoard);

      currentState === "X" ? setCurrentState("O") : setCurrentState("X");
      console.log(currentState);
    } else if (winner === "" && !draw) {
      alert("already clicked!!");
    }
  };

  return (
    <center className="container center">
      <center>
        <h1>Tic Tac Toe</h1>
        <table className="main_container">
          {Array(3)
            .fill("0")
            .map((_, rowIndex) => (
              <tr key={rowIndex} className="row">
                {Array(3)
                  .fill("0")
                  .map((_, colIndex) => (
                    <td
                      key={`${rowIndex}${colIndex}`}
                      className="box"
                      id={"box"}
                      onClick={() => ChangeTurn(`${rowIndex * 3 + colIndex}`)}
                    >
                      {board[rowIndex * 3 + colIndex]}
                    </td>
                  ))}
              </tr>
            ))}
        </table>
      </center>
      <center className="information_block">
        {!(winner === "") && (
          <h1 className="turns" id="results">
            Winner : {winner}
          </h1>
        )}
        {winner === "" && draw && (
          <h1 className="turns" id="results">
            Match Draw
          </h1>
        )}
        {winner === "" && !draw && (
          <h1 className="turns" id="results">
            Turn for : {currentState}
          </h1>
        )}{" "}
        <button className="btn btn-danger" onClick={restartGame}>
          Restart
        </button>
      </center>
    </center>
  );
}

export default TicTacToe;

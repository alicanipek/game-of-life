import React, { ReactElement, useState } from "react";
import Board from "./Board";

interface Props {
    row: number;
    col: number;
}
const updateBoard = (board: number[][]) => {
    let newBoard: number[][] = [];
    for (let r = 0; r < board.length; r++) {
        let cols = [];
        for (let c = 0; c < board[r].length; c++) {
            let neighbors = 0;
            if (c - 1 >= 0 && board[r][c - 1] === 1) neighbors++;
            if (c - 1 >= 0 && r - 1 >= 0 && board[r - 1][c - 1] === 1)
                neighbors++;
            if (c - 1 >= 0 && r + 1 < board.length && board[r + 1][c - 1] === 1)
                neighbors++;
            if (c + 1 <= board[r].length && board[r][c + 1] === 1) neighbors++;
            if (
                c + 1 <= board[r].length &&
                r + 1 < board.length &&
                board[r + 1][c + 1] === 1
            )
                neighbors++;
            if (
                c + 1 <= board[r].length &&
                r - 1 >= 0 &&
                board[r - 1][c + 1] === 1
            )
                neighbors++;
            if (r - 1 >= 0 && board[r - 1][c] === 1) neighbors++;
            if (r + 1 < board.length && board[r + 1][c] === 1) neighbors++;
            if (board[r][c] === 1 && (neighbors < 2 || neighbors > 3)) {
                cols.push(0);
            } else if (board[r][c] === 0 && neighbors === 3) {
                cols.push(1);
            } else {
                cols.push(board[r][c]);
            }
        }
        newBoard.push(cols);
    }
    return newBoard;
};

function Game({ row, col }: Props): ReactElement {
    const [board, setBoard] = React.useState<number[][]>(
        new Array(row).fill(0).map(() => new Array(col).fill(0))
    );

    const [isPlaying, setIsPlaying] = useState(false);
    React.useEffect(() => {
        if (!isPlaying) return;
        else {
            setTimeout(() => {
                setBoard(updateBoard(board));
            }, 200);
        }
    });
    const handleStart = () => {
        setIsPlaying(!isPlaying);
    };
    const handleReset = () => {
        setBoard(new Array(row).fill(0).map(() => new Array(col).fill(0)));
        setIsPlaying(false);
    };

    const handleClick = (r: number, c: number) => {
        let newBoard = [...board];
        newBoard[r][c] = board[r][c] === 1 ? 0 : 1;
        setBoard(newBoard);
    };
    return (
        <>
            <Board board={board} onClick={(e, r, c) => handleClick(r, c)} />
            <button onClick={handleStart}>
                {isPlaying ? "Stop" : "Start"}
            </button>
            <button onClick={handleReset}>Reset</button>
        </>
    );
}

export default Game;

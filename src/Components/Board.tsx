import React, { ReactElement } from "react";

interface Props {
    board: number[][];
    onClick: (
        ev: React.MouseEvent<HTMLTableDataCellElement>,
        r: number,
        c: number
    ) => void;
}

function Board({ board, onClick }: Props): ReactElement {
    const table = [];
    for (let r = 0; r < board.length; r++) {
        let cols = [];
        for (let c = 0; c < board[r].length; c++) {
            let className = board[r][c] === 0 ? "dead" : "alive";
            cols.push(
                <td
                    key={c}
                    className={className}
                    onClick={(e) => onClick(e, r, c)}
                ></td>
            );
        }
        table.push(<tr key={r}>{cols}</tr>);
    }
    return (
        <table>
            <tbody>{table}</tbody>
        </table>
    );
}

export default Board;

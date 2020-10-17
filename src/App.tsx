import React, { useState } from 'react';
import Game from './Components/Game';

function App() {
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0);

    return (
        <>
            <input
                type="number"
                onChange={(e) => setRow(Number(e.currentTarget.value))}
            />
            <input
                type="number"
                onChange={(e) => setCol(Number(e.currentTarget.value))}
            />
            <Game row={row} col={col} />
        </>
    );
}

export default App;

# React-Chessboard-Kit

React component to render a simple and easy to use chess board

# Features

- **Move validation**: Integrated with chess.js for chess move validation
- **Themes**: Multiple themes to choose from
- **Orientation**: Choose between white and black orientation
- **Interactive:** Allows users to interact with the board by making moves
- **Responsive:** Responsive design that adapts to different screen sizes
- **Drag and drop:** Drag and drop pieces to make moves 

# Demo

[Demo](https://react-chessboard-kit.netlify.app/)

# Getting started

### Compatibility

- The component is compatible with React 16.8 and newer. It supports all modern web browsers.

### Installation

Install the package using npm, yarn, or any other package manager.

```bash:
npm install react-chessboard-kit
```

```bash:
yarn add react-chessboard-kit
```

### Usage

Import and use the Chessboard component in your React application

```jsx
import { Chessboard } from 'react-chessboard-kit';

import { Chess } from 'chess.js';
import { useState } from 'react';

function App() {
    const [chess, setChess] = useState(new Chess());
    return (
        <Chessboard boardPosition={chess.fen()}
          onMove={(move) => {
            setChess((prev) => {
              prev.move({ from: move.from, to: move.to, promotion: move.promotion })
              return new Chess(prev.fen())
            }
            )
          }}
        />
    )
}

export default App;
```

## User guide

### Chessboard

#### props

<!-- table with 3 columns -->
| Name | Type | Description |
| --- | --- | --- |
| boardPosition | string | FEN string representing the current board position |
| onMove | function | Callback function to handle the move event |
| orientation | string | Board orientation. Can be "white" or "black" |
| theme | string | Board theme. Can be "default", "coral", "dusk", "marine", "wheat", "emerald", "sandcastle".

### License
React Chessboard Kit is open source software licensed under the MIT license.
# React Tic Tac Toe

A classic tic tac toe game built with React and Vite.

## Features

- Interactive tic tac toe game board
- Two-player gameplay (X and O)
- Win detection for rows, columns, and diagonals
- Draw/tie game detection
- Game status display showing current player or winner
- Reset button to start a new game
- Clean, responsive UI

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173` (or another port if 5173 is busy).

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## How to Play

1. The game starts with Player X
2. Click any empty square on the 3x3 grid to place your mark
3. Players alternate turns (X and O)
4. The first player to get 3 marks in a row (horizontally, vertically, or diagonally) wins
5. If all 9 squares are filled with no winner, the game is a draw
6. Click the "Reset Game" button to start a new game at any time

## Project Structure

```
react-tic-tac-toe/
├── src/
│   ├── App.jsx          # Main game component
│   ├── index.jsx        # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Technologies Used

- React 18
- Vite (build tool and dev server)
- JavaScript/JSX
- CSS3

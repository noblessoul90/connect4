import React from 'react';
import './App.css';
import GameBoard from 'src/components/GameBoard'

function App() {
  return (
    <div className="App">
      <h1>Connect 4</h1>
     <GameBoard />
    </div>
  );
}

export default App;

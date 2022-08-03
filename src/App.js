



import { useEffect, useState } from 'react';
import './App.css';

const width = 8;
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
];



function App() {
  const [currentColor, setCurrentColor] = useState([]); 
  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomNumber = Math.floor(Math.random() * candyColors.length);
      const randomColor = candyColors[randomNumber];
      randomColorArrangement.push(randomColor);
    }    
    setCurrentColor(randomColorArrangement);
  };
  useEffect(() => {

    createBoard();
  }, []);

  return (
    <div className="app">
      <div className='header'>
        <h1>MATCH 3 GAME</h1>
      </div>
      <div className='game'>
        {currentColor.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
          ></img>
        ))
        }

      </div>

    </div>
    
  );
}

export default App;


/* eslint-disable react-hooks/exhaustive-deps */




import { useEffect, useState } from 'react';
import './App.css';

const width = 8;
const candyColors = [
  'lightblue',
  'lightgreen',
  'lightcoral',
  'purple',
  'red',
  'yellow'
];



function App() {
  const [currentColor, setCurrentColor] = useState([]); 

  const checkColThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColor[i];
      if (columnOfThree.every(square => currentColor[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColor[square] = '');
      }
    }
  };


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

  useEffect(() => {
    const timer = setInterval(() => {
      checkColThree();
      setCurrentColor([...currentColor]);

    }, 100);
    return () => clearInterval(timer);
  }, [checkColThree, currentColor]);




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


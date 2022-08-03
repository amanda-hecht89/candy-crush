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


  const checkColFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColor[i];
      if (columnOfFour.every(square => currentColor[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColor[square] = '');
      }
    }
  };


  const checkRowThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColor[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      if (notValid.includes(i)) continue;
      if (rowOfThree.every(square => currentColor[square] === decidedColor)) {
        rowOfThree.forEach(square => currentColor[square] = '');
      }
    }
  };


  const checkRowFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColor[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      if (notValid.includes(i)) continue;
      if (rowOfFour.every(square => currentColor[square] === decidedColor)) {
        rowOfFour.forEach(square => currentColor[square] = '');
      }
    }
  };


  const moveBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      if ((currentColor[i + width]) === '') {
        currentColor[i + width] = currentColor[i];
        currentColor[i] = '';
      
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
      checkColFour();
      checkRowFour();
      checkColThree();
      checkRowThree();
      moveBelow();
      setCurrentColor([...currentColor]);

    }, 1000);
    return () => clearInterval(timer);
  }, [checkColFour, checkRowFour, checkColThree, checkRowThree, currentColor, moveBelow]);




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


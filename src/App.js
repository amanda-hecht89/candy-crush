/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.css';
import greenFruit from './images/green.png';
import yellowFruit from './images/yellow.png';
import pinkFruit from './images/pink.png';
import redFruit from './images/red.png';
import orangeFruit from './images/orange.png';
import purpleFruit from './images/purple.png';
import blankFruit from './images/blank.png';
import ScoreBoard from './Scoreboard';

const width = 8;
const candyColors = [
  pinkFruit,
  greenFruit,
  orangeFruit,
  purpleFruit,
  redFruit,
  yellowFruit
];

function App() {
  const [currentColor, setCurrentColor] = useState([]);
  const [draggedSquare, setDraggedSquare] = useState(null);
  const [replacedSquare, setReplacedSquare] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);



  const checkColThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColor[i];
      const ifBlank = currentColor[i] === blankFruit;
      if (columnOfThree.every(square => currentColor[square] === decidedColor && !ifBlank)) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(square => currentColor[square] = blankFruit);
        return true;
      }
    }
  };


  const checkColFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColor[i];
      const ifBlank = currentColor[i] === blankFruit;
      if (columnOfFour.every(square => currentColor[square] === decidedColor && !ifBlank)) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(square => currentColor[square] = blankFruit);
        return true;
      }
    }
  };


  const checkRowThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColor[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      const ifBlank = currentColor[i] === blankFruit;
      if (notValid.includes(i)) continue;
      if (rowOfThree.every(square => currentColor[square] === decidedColor && !ifBlank)) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(square => currentColor[square] = blankFruit);
        return true;
      }
    }
  };


  const checkRowFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColor[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      const ifBlank = currentColor[i] === blankFruit;
      if (notValid.includes(i)) continue;
      if (rowOfFour.every(square => currentColor[square] === decidedColor && !ifBlank)) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(square => currentColor[square] = blankFruit);
        return true;
      }
    }
  };


  const moveBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      // eslint-disable-next-line no-unused-vars
      const isFirstRow = firstRow.includes(i);
      if (firstRow && currentColor[i] === blankFruit) {
        let randomNum = Math.floor(Math.random() * candyColors.length);
        currentColor[i] = candyColors[randomNum];
      }
      if ((currentColor[i + width]) === blankFruit) {
        currentColor[i + width] = currentColor[i];
        currentColor[i] = blankFruit;
      }
    }
  };
  
  function dragStart(e) {
    setDraggedSquare(e.target);
    
  }
  
  function dragDrop(e) {
    setReplacedSquare(e.target);
  }
  
  function dragEnd() {

    const draggedSquareId = parseInt(draggedSquare.getAttribute('data-id'));
    const replacedSquareId = parseInt(replacedSquare.getAttribute('data-id'));
    
    currentColor[replacedSquareId] = draggedSquare.getAttribute('src');
    currentColor[draggedSquareId] = replacedSquare.getAttribute('src');

    const validTableMoves = [
      draggedSquareId - 1,
      draggedSquareId - width,
      draggedSquareId + 1,
      draggedSquareId + width,
    ];

    const validMove = validTableMoves.includes(replacedSquareId);

 
    const isColFour = checkColFour();
    const isRowFour = checkRowFour();
    const isColThree = checkColThree();
    const isRowThree = checkRowThree();

    if (replacedSquareId &&
       validMove &&
        (isColFour || isRowFour || isColThree || isRowThree)) {
      setDraggedSquare(null);
      setReplacedSquare(null);
    } else {
      currentColor[replacedSquareId] = replacedSquare.getAttribute('src');
      currentColor[draggedSquareId] = draggedSquare.getAttribute('src');
      setCurrentColor([...currentColor]);
    }}
  
  
  
  
  
  
  
  
  
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
      
    }, 300);
    return () => clearInterval(timer);
  }, [checkColFour, checkRowFour, checkColThree, checkRowThree, currentColor, moveBelow]);
  
  
  
  
  return (
    <div className="app">
      <div className='header'>
        <h1>MATCH 3 || 4 GAME</h1>
        <h1>I built this app all alone! I hope you enjoy playing it<br/>
        as much as I did making it.</h1>
        <h1>Can match 3 or 4 friuts vertically or horizontally<br/>
        new fruits drop from top. colloect 3 for 3 point and collect 4 for 4 points!</h1>
      </div>
      <div className='game'>
        {currentColor.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            style={{ backgroundColor: candyColor, opacity:0.6 }}
            data-id={index}
            alt={candyColor}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))
        }
      </div>
      <ScoreBoard score={scoreDisplay}/>
    </div>
    
  );
}

export default App;

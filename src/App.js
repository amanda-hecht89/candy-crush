import { useEffect, useState } from 'react';
import './App.css';

const width = 8;
const candyColors = [
  'blue', 'pink', 'green', 'red', 'yellow', 'purple',
];


const App = () => {

  const [currentColor, setCurrentColor] = useState([]); 

  const createBoard = () => {
    const colorArrangement = [];
    for (let i = 0; i < width * width; i++); {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      colorArrangement.push(randomColor);

    }
    setCurrentColor(colorArrangement);
  };


  useEffect(() => {
    createBoard();

  }, []);
  // console.log(currentColor);






  return (
    <div className="app">
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
};

export default App;

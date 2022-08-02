import './App.css';

const width = 8;
const candyColors = [
  'blue', 'pink', 'green', 'orange', 'yellow', 'purple',
];


const App = () => {

  const createBoard = () => {
    const colorArrangement = [];
    for ('let i = 0', 'i < width * width'; i++); {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      colorArrangement.push(randomColor);

    }
    console.log(colorArrangement); 
  };







  return (
    <div className="App">
      <div>
        <h1>CANDY CRUSH!</h1>
      </div>
    </div>
  );
};

export default App;

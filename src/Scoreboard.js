import './App.css';
import React from 'react';

export default function Scoreboard({ score }) {
  return (
    <div className='scoreBoard'>
      <h1>YOUR SCORE: {score}</h1>
    </div>
  );
}

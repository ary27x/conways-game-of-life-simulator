import React , {useState} from 'react';
import './App.css';
import Board from './components/Board';
import Header from './components/Header';

function App() {
  const [running , setRunning] = useState(false)
  return (
    <div className="App">
      <Header running = {running} setRunning = {setRunning}/>
      <Board running ={running}/>
    </div>
  );
}

export default App;

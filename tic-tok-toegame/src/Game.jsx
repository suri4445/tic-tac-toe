import React, { useState } from 'react';
import Board from './Board';
import {calculateWinner} from './helper';
import configureStore from './redux/store.js';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import './playerInfo.css'
import './game.css'

const  Game =   () => {
  
  const [histroy, setHistroy] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xNext, setXNext] = useState(true);
  const winner = calculateWinner(histroy[stepNumber]);
  const x0 = xNext ? "X" : "O";
  const [totalXWins,setTotalXWins] = useState(0);
  const [totalYWins,setTotalYWins] = useState(0);
  const [player1,setplayer1] = useState(configureStore.getState().player1);
  const [player2,setplayer2] = useState(configureStore.getState().player2);
  const history = useHistory();

  const hadleClick = (i) => {
    const histroyPoint = histroy.slice(0,stepNumber + 1);
    const current = histroyPoint[stepNumber];
    const squares = [...current];

    if(winner || squares[i]){
      return;
    }
    squares[i]= x0;
    setHistroy([...histroyPoint,squares]);
    setStepNumber(histroyPoint.length);
    setXNext(!xNext);

  }

  const jumpTo = (m) => {
    setStepNumber(m);
    setXNext(m % 2 === 0);
  }

  const renderMoves = () => {
    histroy.map((_step,move) => {
      const dest = move ? `Go to move ${move}` : "Go to start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{dest}</button>
        </li>
      )
    })
  }

  const getWinner = (move) => {
    if(winner == move){
      return {border: "5px solid #FB9E01"}
    }else{
      return {}
    }
  }

  const getDots = (move) => {
    let wins = move ==  "X" ? totalXWins : totalYWins;
    let some = <span>
        <span style={1<=wins?{color : "white"}:{}}>.</span>
        <span style={2<=wins?{color : "white"}:{}}>.</span>
        <span style={3<=wins?{color : "white"}:{}}>.</span>
        <span style={4<=wins?{color : "white"}:{}}>.</span>
        <span style={5<=wins?{color : "white"}:{}}>.</span>
        <span style={6<=wins?{color : "white"}:{}}>.</span>
      </span>
    return some;
  }

  const getStatus = () => {
    if(stepNumber == 9 && !winner){
      return (<span>
        <span style={{fontSize:"26px",fontWeight:"bold",color:"white",left:"160px"}} className="xText">Draw</span>
        <span style={{fontSize:"26px",fontWeight:"bold",color:"white"}}className="oText">Draw</span>
      </span>)
    }
    if(x0 == "X" && !winner){
      return <span className="xText">Your Turn</span> ;
    }else if(x0 == "O" && !winner){
      return <span className="oText">Your Turn</span>
    }else if(winner == "X"){
      return <span style={{fontSize:"26px",fontWeight:"bold",left:"160px"}} className="xText">Winner</span>
    }else if(winner == "O"){
      return <span style={{fontSize:"26px",fontWeight:"bold",left:"1014px"}} className="oText">Winner</span>
    }else{
      return (<span>
                <span className="xText">Draw</span>
                <span className="oText">Draw</span>
              </span>)
    }
  }

  const handleNextGameClick = () => {
    if(winner == "X"){
        setTotalXWins(totalXWins+1);
    }else if(winner == "O"){
        setTotalYWins(totalYWins+1);
    }
    setHistroy([Array(9).fill(null)]);
    setStepNumber(0)
  }

  const setWinner = () => {
    if(totalXWins >= 5 || totalYWins >= 5){
      let win = totalXWins >= 5 ? "X" : "O";
      let winner = totalXWins >= 5 ? player1 : player2;
      let winnerP = totalXWins >= 5 ? "PLAYER 1" : "PLAYER 2";
      configureStore.dispatch({
        type : "win",
        payload : {
            winner : winner,
            winnerSymbol : win,
            winnerPlayer : winnerP,
        }
      })
      history.push('/win');
    }
  }

  return (
    <div className="layout">
      <div className="symbol">TIC TAK TOE</div>
        <div className="border">
          <div className="roundBox">
            <Board squares={histroy[stepNumber]} onClick={hadleClick}></Board>
            <div className="info-wrapper"> 
              {renderMoves}
            </div>
          </div>
        </div>

        <div>{getStatus()}</div>

        <div style={getWinner("X")} className="roundLeft">
          <center><span className="player1Text">Player1</span></center>
          <center><span className="p1Name">{player1}</span></center><br></br>
          <span className="xtxt">X</span>
        </div>

        <div className="dotsX">{getDots("X")}</div>

        <div style={getWinner("O")}className="roundRight">
          <span className="player2Text">Player2</span><br></br>
          <center><span className="p2Name">{player2}</span></center><br></br>
          <span className="ytxt">O</span>
        </div>

        <div className="dotsY">{getDots("Y")}</div>

        <Button variant="contained" color="secondary" className="nextBtn" onClick={handleNextGameClick}>
                              Next Game
        </Button>
        {winner ? setWinner() : ""}
    </div>
  );
}

export default Game;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import configureStore from './redux/store.js';
import './playerInfo.css'

function Hello ()  {
  const history = useHistory();
  const handleClick = () => {
      if(!player1 || !player2){
        seterror1(true);
        seterror2(true);
        seterrorText("Enter names of the players")
        return
      }
      configureStore.dispatch({
          type : "p1",
          payload : {
              name : player1,
              wins : 0
          }
      })
      configureStore.dispatch({
        type : "p2",
        payload : {
            name : player2,
            wins : 0
        }
    })
      history.push('/game');
  }

  const [player1, setplayer1] = useState(null);
  const [player2, setplayer2] = useState(null);
  const [error1, seterror1] = useState(false);
  const [error2, seterror2] = useState(false);
  const [errorText, seterrorText] = useState("");

  return (
    <div className="layout">
        <div className="symbol">TIC TAK TOE</div>
        <div className="border">
            <div className="roundBox">
                <div className="innerFormBox">
                    <div className="welcometxt">Welcome to <span style={{color : "#FBA202"}}>TIC TAC TOE</span></div>
                    <span className="playerTxt1">Player 1</span>
                        <div ><TextField error={error1} id="outlined-basic" variant="outlined" className="inputTexts" onChange={(e) => setplayer1(e.target.value)}/> </div>
                    <span className="playerTxt2">Player 2</span>
                        <TextField error={error2} id="outlined-basic" variant="outlined" className="inputTexts2" onChange={(e) => setplayer2(e.target.value)}/>
                        <Button variant="contained" color="secondary" className="continueBtn" onClick={handleClick}>
                            Continue
                        </Button>
                        <center><div style={{color:"#ff4d4d",marginTop:"81px"}}>{errorText}</div></center>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Hello;
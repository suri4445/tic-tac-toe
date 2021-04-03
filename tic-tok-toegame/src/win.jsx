import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import configureStore from './redux/store.js';
import './game.css';

function Win ()  {
  const history = useHistory();

  const [player, setplayer1] = useState(configureStore.getState().winnerP);
  const [name, setName] = useState(configureStore.getState().winner);
  const [symbol, setSymbol] = useState(configureStore.getState().winnerSymbol);

  return (
    <div className="layout">
        <div className="symbol">TIC TAK TOE</div>
        <div className="border">
            <div className="roundBox">
                <div className="innerFormBox">
                    <div className="winnertxt">Winner!</div>    
                </div>
                <div className="winBox"></div>
                <div className="player">{player}</div>
                <div className="pname">{name}</div>
                <div className="wsymbol">{symbol}</div>
            </div>
        </div>
    </div>
  );
};

export default Win;
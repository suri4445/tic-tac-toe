import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

import PlayerInfo from './PlayerInfo.jsx';
import Game from './Game.jsx';
import Win from './win.jsx';
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={PlayerInfo} />
          <Route path="/game" component={Game} />
          <Route path="/win" component={Win} />
        </Switch>
      </Router>
    </div>
  );
}

export default App; 

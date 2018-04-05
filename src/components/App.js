import React from 'react';

import '../css/app.css';

import Session from '../models/session';
import TimingTower from './TimingTower';

const App = () => {
  const practiceTwo = new Session('P2');
  return (
    <TimingTower
      session={practiceTwo}
    />
  );
};

export default App;

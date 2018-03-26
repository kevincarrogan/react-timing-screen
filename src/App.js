import React from 'react';
import ReactDOM from 'react-dom';

import TimingTower from './components/TimingTower';

const App = () => {
    return (
        <TimingTower />
    );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;

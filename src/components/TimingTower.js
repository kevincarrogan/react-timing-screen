import React from 'react';

import '../css/timing-tower.css';

const driverNames = [
    'Hamilton',
    'Bottas',
    'Raikkonen',
    'Verstappen',
    'Ricciardo',
    'Vettel'
];

const getDriverShortName = name => name.substring(0, 3);

const TimingTower = () => {
    return (
        <section className="timing-tower">
            <div className="session-details">
                <h1>P2</h1>
                <div>1:17:59</div>
            </div>
            <ol className="driver-times">
                {driverNames.map((driverName, position) => (
                    <li className="driver-time" key={driverName}>
                        <span className="driver-position">{position + 1}</span>
                        <span className="driver-name">{getDriverShortName(driverName)}</span>
                        <span className="lap-status"></span>
                    </li>
                ))}
            </ol>
        </section>
    );
};

export default TimingTower;

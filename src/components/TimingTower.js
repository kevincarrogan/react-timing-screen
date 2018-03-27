import React from 'react';

import '../css/timing-tower.css';

const driverStatuses = [
    ['Hamilton', '1:24.569'],
    ['Bottas', '1:24.719'],
    ['Raikkonen', '1:25.828'],
    ['Verstappen', '1:25.929'],
    ['Ricciardo', '1:26.201'],
    ['Vettel', '1:26.450']
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
                {driverStatuses.map((driverStatus, position) => (
                    <li className="driver-time" key={driverStatus[0]}>
                        <span className="driver-position">{position + 1}</span>
                        <span className="driver-name">{getDriverShortName(driverStatus[0])}</span>
                        <span className="lap-status">{driverStatus[1]}</span>
                    </li>
                ))}
            </ol>
        </section>
    );
};

export default TimingTower;

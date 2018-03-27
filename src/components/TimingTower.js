import React from 'react';

import '../css/timing-tower.css';

const driverStatuses = [
    ['Hamilton', 84569],
    ['Bottas', 84570],
    ['Raikkonen', 85828],
    ['Verstappen', 105929],
    ['Ricciardo', 146201],
    ['Vettel', 165450]
];

const getDriverShortName = name => name.substring(0, 3);

const getFastestTime = driverStatuses => driverStatuses
    .map(status => status[1])
    .sort((a, b) => a > b)[0];

const humanReadableTimeFromMilliseconds = time => {
    let totalMilliseconds = time;

    const minutes = Math.floor(totalMilliseconds / (60 * 1000));
    totalMilliseconds = totalMilliseconds - (minutes * 60 * 1000);

    const seconds = Math.floor(totalMilliseconds / 1000);
    totalMilliseconds = totalMilliseconds - (seconds * 1000);

    const milliseconds = totalMilliseconds;
    const paddedMilliseconds = milliseconds.toString().padStart(3, '0');

    if (minutes > 0) {
        const paddedSeconds = seconds.toString().padStart(2, '0');
        return `${minutes}:${paddedSeconds}.${paddedMilliseconds}`;
    }

    return `${seconds}.${paddedMilliseconds}`;
};

const humanReadableDelta = (thisTime, otherTime) => {
    let delta = thisTime - otherTime;

    return humanReadableTimeFromMilliseconds(delta);
};

const TimingTower = () => {
    const fastestTime = getFastestTime(driverStatuses);
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
                        <span className="lap-status">+{humanReadableDelta(driverStatus[1], fastestTime)}</span>
                    </li>
                ))}
            </ol>
        </section>
    );
};

export default TimingTower;

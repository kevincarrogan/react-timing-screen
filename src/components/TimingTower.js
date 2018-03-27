import React from 'react';

import '../css/timing-tower.css';

class Driver {
    constructor(name, team) {
        this.name = name;
        this.team = team;
    }
};

const driverStatuses = [
    [new Driver('Hamilton', 'mercedes'), 84569],
    [new Driver('Bottas', 'mercedes'), 84570],
    [new Driver('Raikkonen', 'ferrari'), 85828],
    [new Driver('Verstappen', 'red-bull'), 105929],
    [new Driver('Ricciardo', 'red-bull'), 146201],
    [new Driver('Vettel', 'ferrari'), 165450]
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
                {driverStatuses.map((driverStatus, position) => {
                    const driver = driverStatus[0];
                    const time = driverStatus[1];
                    return (
                        <li className="driver-time" key={driver.name}>
                            <span className="driver-position">{position + 1}</span>
                            <span className={`driver-name ${driver.team}`}>{getDriverShortName(driver.name)}</span>
                            <span className="lap-status">
                                {position == 0 ? (
                                    humanReadableTimeFromMilliseconds(time)
                                ) : (
                                    '+' + humanReadableDelta(time, fastestTime)
                                )}
                            </span>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
};

export default TimingTower;

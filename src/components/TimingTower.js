import React from 'react';

import '../css/timing-tower.css';

const driverStatuses = [
    ['Hamilton', '1:24.569'],
    ['Bottas', '1:24.570'],
    ['Raikkonen', '1:25.828'],
    ['Verstappen', '1:45.929'],
    ['Ricciardo', '2:26.201'],
    ['Vettel', '2:45.450']
];

const getDriverShortName = name => name.substring(0, 3);

const timeInMilliseconds = time => {
    const components = time.split(/[:\.]/);
    const minutes = parseInt(components[0], 10);
    const seconds = parseInt(components[1], 10);
    const milliseconds = parseInt(components[2], 10);

    return (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;
};

const getFastestTime = driverStatuses => driverStatuses
    .map(
        status => timeInMilliseconds(status[1])
    )
    .concat()
    .sort((a, b) => a > b)[0];

const getDelta = (currentTime, fastestTimeInMilliseconds) => {
    const currentTimeInMilliseconds = timeInMilliseconds(currentTime);
    const diff = currentTimeInMilliseconds - fastestTimeInMilliseconds;

    return diff;
};

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
                        <span className="lap-status">+{humanReadableTimeFromMilliseconds(getDelta(driverStatus[1], fastestTime))}</span>
                    </li>
                ))}
            </ol>
        </section>
    );
};

export default TimingTower;

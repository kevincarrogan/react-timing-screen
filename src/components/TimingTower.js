import React from 'react';

import '../css/timing-tower.css';

class Driver {
  constructor(name, team) {
    this.name = name;
    this.team = team;
  }
}

const STATUS = {
  ON_TRACK: 'ON_TRACK',
  IN_PIT: 'IN_PIT',
  OUT_LAP: 'OUT_LAP',
};

const driverStatuses = [
  [
    new Driver('Hamilton', 'mercedes'),
    84569, STATUS.ON_TRACK,
  ],
  [
    new Driver('Bottas', 'mercedes'),
    84570, STATUS.ON_TRACK,
  ],
  [
    new Driver('Raikkonen', 'ferrari'),
    85828, STATUS.ON_TRACK,
  ],
  [
    new Driver('Verstappen', 'red-bull'),
    105929, STATUS.IN_PIT,
  ],
  [
    new Driver('Ricciardo', 'red-bull'),
    146201, STATUS.ON_TRACK,
  ],
  [
    new Driver('Vettel', 'ferrari'),
    165450, STATUS.OUT_LAP,
  ],
];

const getDriverShortName = name => name.substring(0, 3);

const getFastestTime = statuses => statuses
  .map(status => status[1])
  .sort((a, b) => a > b)[0];

const humanReadableTimeFromMilliseconds = (time) => {
  let totalMilliseconds = time;

  const minutes = Math.floor(totalMilliseconds / (60 * 1000));
  totalMilliseconds -= (minutes * 60 * 1000);

  const seconds = Math.floor(totalMilliseconds / 1000);
  totalMilliseconds -= (seconds * 1000);

  const milliseconds = totalMilliseconds;
  const paddedMilliseconds = milliseconds.toString().padStart(3, '0');

  if (minutes > 0) {
    const paddedSeconds = seconds.toString().padStart(2, '0');
    return `${minutes}:${paddedSeconds}.${paddedMilliseconds}`;
  }

  return `${seconds}.${paddedMilliseconds}`;
};

const humanReadableDelta = (thisTime, otherTime) => {
  const delta = thisTime - otherTime;

  return humanReadableTimeFromMilliseconds(delta);
};

const humanReadableTimeFromSeconds = (time) => {
  let totalSeconds = time;

  const hours = Math.floor(totalSeconds / (60 * 60));
  totalSeconds -= hours * (60 * 60);

  const minutes = Math.floor(totalSeconds / 60);
  const paddedMinutes = minutes.toString().padStart(2, '0');
  totalSeconds -= minutes * 60;

  const seconds = totalSeconds;
  const paddedSeconds = seconds.toString().padStart(2, '0');

  return `${hours}:${paddedMinutes}:${paddedSeconds}`;
};

class Session {
  constructor(name) {
    this.name = name;
    this.currentTime = 4681;
  }
}

const practiceTwo = new Session('P2');

const TimingTower = () => {
  const fastestTime = getFastestTime(driverStatuses);
  return (
    <section className="timing-tower">
      <div className="session-details">
        <h1>{practiceTwo.name}</h1>
        <div>{humanReadableTimeFromSeconds(practiceTwo.currentTime)}</div>
      </div>
      <ol className="driver-times">
        {driverStatuses.map((driverStatus, position) => {
          const driver = driverStatus[0];
          const time = driverStatus[1];
          const currentState = driverStatus[2];

          let lapStatus;
          if (currentState === STATUS.OUT_LAP) {
            lapStatus = 'OUT LAP';
          } else if (position === 0) {
            lapStatus = humanReadableTimeFromMilliseconds(time);
          } else {
            lapStatus = `+${humanReadableDelta(time, fastestTime)}`;
          }

          return (
            <li className="driver-time" key={driver.name}>
              <span className="driver-position">{position + 1}</span>
              <span className={`driver-name ${driver.team}`}>{getDriverShortName(driver.name)}</span>
              <span className="lap-status">{lapStatus}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default TimingTower;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Driver from '../models/driver';
import Session from '../models/session';

import SessionDetails from './SessionDetails';

import padIntegerStart from '../utils';

import '../css/timing-tower.css';

const STATUS = {
  ON_TRACK: 'ON_TRACK',
  IN_PIT: 'IN_PIT',
  OUT_LAP: 'OUT_LAP',
};

let driverStatuses = [
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
    new Driver('Ricciardo', 'red-bull'),
    146201, STATUS.ON_TRACK,
  ],
  [
    new Driver('Vettel', 'ferrari'),
    165450, STATUS.OUT_LAP,
  ],
  [
    new Driver('Verstappen', 'red-bull'),
    null, STATUS.IN_PIT,
  ],
];

const getDriverShortName = name => name.substring(0, 3);

const getFastestTime = statuses => statuses
  .map(status => status[1])
  .filter(time => !!time)
  .sort((a, b) => a > b)[0];

const humanReadableTimeFromMilliseconds = (time) => {
  let totalMilliseconds = time;

  const minutes = Math.floor(totalMilliseconds / (60 * 1000));
  totalMilliseconds -= (minutes * 60 * 1000);

  const seconds = Math.floor(totalMilliseconds / 1000);
  totalMilliseconds -= (seconds * 1000);

  const milliseconds = totalMilliseconds;
  const paddedMilliseconds = padIntegerStart(milliseconds, 3);

  if (minutes > 0) {
    const paddedSeconds = padIntegerStart(seconds);
    return `${minutes}:${paddedSeconds}.${paddedMilliseconds}`;
  }

  return `${seconds}.${paddedMilliseconds}`;
};

const humanReadableDelta = (thisTime, otherTime) => {
  const delta = thisTime - otherTime;

  return humanReadableTimeFromMilliseconds(delta);
};

const lapStatus = (time, currentState, position, fastestTime) => {
  if (!time) {
    return 'NO TIME';
  }

  if (currentState === STATUS.OUT_LAP) {
    return 'OUT LAP';
  }

  if (position === 0) {
    return humanReadableTimeFromMilliseconds(time);
  }

  return `+${humanReadableDelta(time, fastestTime)}`;
};

const getRandomTime = () => {
  const min = 84560;
  const max = 165500;

  return Math.floor(Math.random() * (max - min)) + min;
};

const getNextStatus = (currentStatus) => {
  const statusKeys = Object.keys(STATUS);
  const statusIndex = statusKeys.indexOf(currentStatus);
  const newStatusIndex = (statusIndex + 1) % statusKeys.length;
  const newStatusKey = statusKeys[newStatusIndex];

  return STATUS[newStatusKey];
};

const updateDriverTimes = () => {
  driverStatuses = driverStatuses.map(([driver, time, status]) => (
    [driver, getRandomTime(), getNextStatus(status)]
  ));
};

window.setInterval(updateDriverTimes, 5000);

const sortByTime = statuses => statuses
  .slice()
  .sort((a, b) => a[1] > b[1]);

class TimingTower extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      driverStatuses,
    };
  }

  componentDidMount() {
    const tick = () => {
      this.setState({
        driverStatuses,
      });
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  render() {
    const fastestTime = getFastestTime(driverStatuses);
    const sortedDriverTimes = sortByTime(this.state.driverStatuses);
    return (
      <section className="timing-tower">
        <SessionDetails session={this.props.session} />
        <ol className="driver-times">
          {sortedDriverTimes.map((driverStatus, position) => {
            const [driver, time, currentState] = driverStatus;

            const driverStatusClassNames = classNames(
              'driver-time',
              {
                'driver-time--in-pit': currentState === STATUS.IN_PIT,
                'driver-time--out-lap': currentState === STATUS.OUT_LAP,
                'driver-time--on-track': currentState === STATUS.ON_TRACK,
              },
            );

            return (
              <li className={driverStatusClassNames} key={driver.name}>
                <span className="driver-position">{position + 1}</span>
                <span className={`driver-name ${driver.team}`}>
                  {getDriverShortName(driver.name)}
                </span>
                <span className="lap-status">
                  {lapStatus(time, currentState, position, fastestTime)}
                </span>
              </li>
            );
          })}
        </ol>
      </section>
    );
  }
}

TimingTower.propTypes = {
  session: PropTypes.instanceOf(Session).isRequired,
};

export default TimingTower;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Driver from '../models/driver';
import Session from '../models/session';

import '../css/timing-tower.css';

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

const padIntegerStart = (integer, padLength = 2) => (
  integer.toString().padStart(padLength, '0')
);

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

const humanReadableTimeFromSeconds = (time) => {
  let totalSeconds = time;

  const hours = Math.floor(totalSeconds / (60 * 60));
  totalSeconds -= hours * (60 * 60);

  const minutes = Math.floor(totalSeconds / 60);
  const paddedMinutes = padIntegerStart(minutes);
  totalSeconds -= minutes * 60;

  const seconds = totalSeconds;
  const paddedSeconds = padIntegerStart(seconds);

  return `${hours}:${paddedMinutes}:${paddedSeconds}`;
};

class TimingTower extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionCurrentTime: props.session.currentTime,
    };
  }

  componentDidMount() {
    const tick = () => {
      this.setState({
        sessionCurrentTime: this.props.session.currentTime,
      });
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  render() {
    const fastestTime = getFastestTime(driverStatuses);
    const sessionLength = this.props.session.length;
    const { sessionCurrentTime } = this.state;
    const sessionTimeLeft = sessionLength - sessionCurrentTime;
    return (
      <section className="timing-tower">
        <div className="session-details">
          <h1>{this.props.session.name}</h1>
          <div>
            {humanReadableTimeFromSeconds(sessionTimeLeft)}
          </div>
        </div>
        <ol className="driver-times">
          {driverStatuses.map((driverStatus, position) => {
            const [driver, time, currentState] = driverStatus;

            let lapStatus;
            if (currentState === STATUS.OUT_LAP) {
              lapStatus = 'OUT LAP';
            } else if (position === 0) {
              lapStatus = humanReadableTimeFromMilliseconds(time);
            } else {
              lapStatus = `+${humanReadableDelta(time, fastestTime)}`;
            }

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
                <span className="lap-status">{lapStatus}</span>
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

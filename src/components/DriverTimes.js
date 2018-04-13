import React from 'react';

import classNames from 'classnames';

import STATUS from '../constants';
import padIntegerStart from '../utils';

const getFastestTime = statuses => statuses
  .map(status => status[1])
  .filter(time => !!time)
  .sort((a, b) => a > b)[0];

const sortByTime = statuses => statuses
  .slice()
  .sort((a, b) => a[1] > b[1]);

const getDriverShortName = name => name.substring(0, 3);

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

const DriverTimes = ({ driverStatuses }) => {
  const fastestTime = getFastestTime(driverStatuses);
  const sortedDriverTimes = sortByTime(driverStatuses);

  return (
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
  );
};

export default DriverTimes;

import React from 'react';
import PropTypes from 'prop-types';

import Driver from '../models/driver';
import Session from '../models/session';

import DriverTimes from './DriverTimes';
import SessionDetails from './SessionDetails';

import STATUS from '../constants';

import '../css/timing-tower.css';

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
  driverStatuses = driverStatuses.map(([driver, , status]) => (
    [driver, getRandomTime(), getNextStatus(status)]
  ));
};

window.setInterval(updateDriverTimes, 5000);

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
    return (
      <section className="timing-tower">
        <SessionDetails session={this.props.session} />
        <DriverTimes driverStatuses={this.state.driverStatuses} />
      </section>
    );
  }
}

TimingTower.propTypes = {
  session: PropTypes.instanceOf(Session).isRequired,
};

export default TimingTower;

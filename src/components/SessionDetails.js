import React from 'react';
import PropTypes from 'prop-types';

import Session from '../models/session';

import padIntegerStart from '../utils';

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

class SessionDetails extends React.Component {
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
    const sessionLength = this.props.session.length;
    const { sessionCurrentTime } = this.state;
    const sessionTimeLeft = sessionLength - sessionCurrentTime;

    return (
      <div className="session-details">
        <h1>{this.props.session.name}</h1>
        <div>
          {humanReadableTimeFromSeconds(sessionTimeLeft)}
        </div>
      </div>
    );
  }
}

SessionDetails.propTypes = {
  session: PropTypes.instanceOf(Session).isRequired,
};

export default SessionDetails;


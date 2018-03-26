import React from 'react';

const TimingTower = () => {
    return (
        <section className="timing-tower">
            <div className="session-details">
                <h1>P2</h1>
                <div>1:17:59</div>
            </div>
            <ol className="driver-times">
                <li className="driver-time driver-time--on-track">
                    <span className="driver-position">1</span>
                    <span className="driver-name mercedes">HAM</span>
                    <span className="lap-status lap-status--first">1:24.569</span>
                </li>
                <li className="driver-time driver-time--on-track">
                    <span className="driver-position">2</span>
                    <span className="driver-name mercedes">BOT</span>
                    <span className="lap-status lap-status--interval">+0.150</span>
                </li>
                <li className="driver-time driver-time--on-track driver-time--personal-best">
                    <span className="driver-position">3</span>
                    <span className="driver-name ferrari">RAI</span>
                    <span className="lap-status lap-status--interval">1:25.828</span>
                </li>
                <li className="driver-time driver-time--in-pit">
                    <span className="driver-position">4</span>
                    <span className="driver-name red-bull">VER</span>
                    <span className="lap-status lap-status--interval">+0.402</span>
                </li>
                <li className="driver-time driver-time--on-track">
                    <span className="driver-position">5</span>
                    <span className="driver-name red-bull">RIC</span>
                    <span className="lap-status lap-status--interval">+0.457</span>
                </li>
                <li className="driver-time driver-time--out-lap">
                    <span className="driver-position">6</span>
                    <span className="driver-name ferrari">VET</span>
                    <span className="lap-status lap-status--interval">OUT LAP</span>
                </li>
            </ol>
        </section>
    );
};

export default TimingTower;

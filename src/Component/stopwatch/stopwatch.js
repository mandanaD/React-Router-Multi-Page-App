import React from 'react';
import "./stopwatch.css"

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            isRunning: false,
            stop: false,
            start: false,
        };
        this.intervalId = null;
    }

    componentWillUnmount() {
        this.stopStopwatch();
    }

    startStopwatch = () => {
        if (!this.state.isRunning) {
            this.intervalId = setInterval(() => {
                this.setState(prevState => ({
                    time: prevState.time + 1
                }));
            }, 10);
            this.setState({isRunning: true, start: false});
        }
    };

    stopStopwatch = () => {
        clearInterval(this.intervalId);
        this.setState({isRunning: false});
        this.setState({stop: true});
    };

    resetStopwatch = () => {
        this.setState({
            time: 0,
            isRunning: false,
            start: true,
            stop: false
        });
    };
    resumeStopwatch = () => {
        this.startStopwatch()
        this.setState({
            stop: false
        });
    };

    formatTime = () => {
        const {time} = this.state;
        const minutes = Math.floor(((time / 100) % 3600) / 60);
        const seconds = Math.floor((time / 100) % 60);
        const milSeconds = (((time) % 100));

        const formattedHours = String(minutes).padStart(2, '0');
        const formattedMinutes = String(seconds).padStart(2, '0');
        const formattedSeconds = String(milSeconds).padStart(2, '0');

        return `${formattedHours} : ${formattedMinutes} . ${formattedSeconds}`;
    };

    render() {
        let btn = <button className={"start-btn btn"} onClick={this.startStopwatch}>Start</button>
        if (this.state.isRunning === true) {
            btn =
                <div>
                    <button onClick={this.stopStopwatch} className={"stop-btn btn"}>Stop
                    </button>
                    {/*<button className={"lap-btn btn"}>Lap</button>*/}
                </div>
        }
        if (this.state.stop === true) {
            btn =
                <div>
                    <button onClick={this.resumeStopwatch} className={"resume-btn btn"}>Resume</button>
                    <button onClick={this.resetStopwatch} className={"reset-btn btn"}>Reset</button>
                </div>
        }
        if (this.state.start) {
            btn = <button className={"start-btn btn"} onClick={this.startStopwatch}>Start</button>
        }
        return (
            <div className={"container"}>
                <div className={"watch"}>
                    <p>{this.formatTime()}</p>
                </div>
                {btn}
            </div>
        )
    }
}

export default Stopwatch;
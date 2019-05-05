import React, { Component } from "react";
import { secondsToHms } from "./helper";

export default class Timer extends Component {
  state = { count: 1 };

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.stop === true) {
        this.stopTimer();
      } else {
        this.startTimer();
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick = () => {
    this.setState({ count: this.state.count + 1 });
  };
  startTimer = () => {
    clearInterval(this.timer);
    this.timer = setInterval(this.tick.bind(this), 1000);
  };
  stopTimer = () => {
    clearInterval(this.timer);
  };
  render() {
    return (
      <div className="timer">
        <div className="subtext">
          {this.props.gameSolved
            ? `Well done, you have solved the puzzle in:`
            : `Time Elapsed:`}{" "}
        </div>
        <div className="subtext final">{secondsToHms(this.state.count)}</div>
      </div>
    );
  }
}

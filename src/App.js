import React, { Component } from "react";
import Timer from "./Timer";
import Main from "./Main";
import "./App.css";

export default class App extends Component {
  state = {
    stopTimer: false,
    gameOver: false,
    gameSolved: false
  };

  handleLeave = () => {
    if (!this.state.gameOver) {
      this.setState({ stopTimer: true });
    }
  };

  handleFocus = () => {
    if (!this.state.gameOver) {
      this.setState({ stopTimer: false });
    }
  };

  stopTimer = () => {
    this.setState({ stopTimer: true, gameOver: true });
  };

  checkIfSolved = flag => {
    if (flag) {
      this.stopTimer();
      this.setState({ gameSolved: true });
    }
  };

  render() {
    return (
      <div
        className="App"
        onMouseLeave={this.handleLeave}
        onMouseEnter={this.handleFocus}
      >
        <Timer stop={this.state.stopTimer} gameSolved={this.state.gameSolved} />
        <Main
          stopTimer={this.stopTimer}
          checkIfSolved={this.checkIfSolved}
          gameSolved={this.state.gameSolved}
        />
      </div>
    );
  }
}

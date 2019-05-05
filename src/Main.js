import React, { Component } from "react";
import {
  comparePuzzle,
  rows,
  getCustomClass,
  checkCorrectClass
} from "./helper";

// Hardcoded Puzzle
//   [2, 8, 7, 1, 9, 6, 5, 4, 3],
//   [3, 9, 4, 2, 5, 7, 1, 8, 6],
//   [6, 5, 1, 3, 4, 8, 9, 2, 7],
//   [7, 4, 9, 6, 1, 2, 8, 3, 5],
//   [1, 6, 3, 4, 8, 5, 7, 9, 2],
//   [5, 2, 8, 9, 7, 3, 6, 1, 4],
//   [4, 1, 6, 5, 2, 9, 3, 7, 8],
//   [9, 7, 5, 8, 3, 4, 2, 6, 1],
//   [8, 3, 2, 7, 6, 1, 4, 5, 9]

export default class Main extends Component {
  state = {
    puzzle: [
      [0, 8, 7, 1, 9, 0, 0, 0, 0],
      [3, 0, 4, 0, 0, 7, 0, 8, 6],
      [6, 0, 0, 0, 0, 8, 9, 0, 7],
      [0, 0, 0, 6, 0, 2, 0, 3, 0],
      [1, 0, 0, 4, 0, 5, 0, 0, 2],
      [0, 2, 0, 9, 0, 3, 0, 0, 0],
      [4, 0, 6, 5, 0, 0, 0, 0, 8],
      [9, 7, 0, 8, 0, 0, 2, 0, 1],
      [0, 0, 0, 0, 6, 1, 4, 5, 0]
    ],
    mistakes: 3,
    gameStarted: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (!comparePuzzle(prevState.puzzle, this.state.puzzle)) {
      this.props.checkIfSolved(comparePuzzle(this.state.puzzle, rows));
    }
    if (prevState.mistakes !== this.state.mistakes) {
      if (this.state.mistakes < 0) {
        this.props.stopTimer();
      }
    }
  }

  handleInputChange = (e, index, innerIndex) => {
    e.persist();
    const val = (e.target.value.replace(/[^1-9]/g, "") * 1 || "").toString();
    this.setState(prevState => {
      let state = JSON.parse(JSON.stringify(prevState));
      state.puzzle[index][innerIndex] = val;
      state.gameStarted = true;
      if (val !== "" && parseInt(e.target.value) !== rows[index][innerIndex]) {
        state.mistakes = state.mistakes - 1;
      }
      return state;
    });
  };

  setMistakes = e => {
    e.persist();
    this.setState(prevState => {
      let state = { ...prevState };
      state.mistakes = e.target.value.replace(/[^1-9]/g, "") * 1;
      return state;
    });
  };

  renderActionContainer = () => {
    return (
      <div className="actionContainer">
        {this.props.gameSolved ? null : !this.state.gameStarted ? (
          <div className="subtext">
            {`Number of mistakes allowed : `}
            <input
              type="text"
              maxLength="2"
              value={this.state.mistakes < 0 ? "" : this.state.mistakes}
              onChange={this.setMistakes}
            />
          </div>
        ) : this.state.mistakes < 0 ? (
          <div className="subtext">
            Game Over - reload the page to start over
          </div>
        ) : (
          <div className="subtext">
            You have {this.state.mistakes} mistakes left
          </div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="main">
        <div>
          {this.state.puzzle.map((row, index) => {
            return (
              <div key={row[0] + index + Math.random()}>
                {row.map((currentVal, innerIndex) => {
                  const borderClass = getCustomClass(index, innerIndex);
                  const correctClass = checkCorrectClass(
                    currentVal,
                    index,
                    innerIndex
                  );
                  const customClass = `${borderClass} ${correctClass}`;
                  const isReadOnly =
                    currentVal !== 0 && typeof currentVal === "number";
                  return (
                    <input
                      type="text"
                      maxLength="1"
                      defaultValue={currentVal || ""}
                      readOnly={isReadOnly}
                      key={innerIndex}
                      className={customClass}
                      onChange={e =>
                        this.handleInputChange(e, index, innerIndex)
                      }
                      disabled={this.state.mistakes < 0}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        {this.renderActionContainer()}
      </div>
    );
  }
}

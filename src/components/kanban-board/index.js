import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { name: "task 1", stage: 0 },
        { name: "task 2", stage: 0 },
        { name: "task 3", stage: 0 },
        { name: "task 4", stage: 1 },
        { name: "task 5", stage: 1 },
        { name: "task 6", stage: 1 },
        { name: "task 7", stage: 2 },
        { name: "task 8", stage: 2 },
        { name: "task 9", stage: 3 },
        { name: "task 10", stage: 3 },
      ],
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
  }

  moveCard(task, direction) {
    const tasks = [...this.state.tasks];
    if (direction === "forward") {
      task.stage += 1;
    } else {
      task.stage -= 1;
    }
    this.setState({ tasks });
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return (
                        <li className="slide-up-fade-in" key={`${i}${index}`}>
                          <div className="li-content layout-row justify-content-between align-items-center">
                            <span
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-name`}
                            >
                              {task.name}
                            </span>
                            <div className="icons">
                              <button
                                disabled={task.stage === 0}
                                onClick={() => this.moveCard(task, "backward")}
                                className="icon-only x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-back`}
                              >
                                <i className="material-icons">arrow_back</i>
                              </button>
                              <button
                                disabled={task.stage === 3}
                                onClick={() => this.moveCard(task, "forward")}
                                className="icon-only x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-forward`}
                              >
                                <i className="material-icons">arrow_forward </i>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

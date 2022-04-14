import React, { Component } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./styles.css";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const styles = {
  wrap: {
    display: "flex",
  },
  left: {
    marginRight: "10px",
  },
  main: {
    flexGrow: "1",
  },
  navbar: {
    display: "flex",
  },
};

class Schedular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWild: false,
      args: {},
      activities: ["event1", "event2", "event3"],
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      toggleState: () => {
        this.setState({
          isWild: !this.state.isWild,
        });
      },
      onTimeRangeSelected: async (args) => {
        this.setState({
          args: args,
        });
        if (!this.state.isWild) {
          const dp = this.calendar;
          const modal = await DayPilot.Modal.prompt("Please enter event.");
          dp.clearSelection();
          if (!modal.result) {
            return;
          }
          dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result,
          });
        } else {
          for (let i = 0; i < 3; i++) {
            const response = await axios.get(
              "https://www.boredapi.com/api/activity/"
            );
            let activity = this.state.activities;
            activity[i] = response.data.activity;
            this.setState({
              activities: activity,
            });
          }
          confirmAlert({
            title: "Event Selection Type.",
            buttons: [
              {
                label: this.state.activities[0],
                onClick: async () => {
                  const dp = this.calendar;
                  const modal = await DayPilot.Modal.prompt(
                    "Your selected event.",
                    this.state.activities[0]
                  );
                  dp.clearSelection();
                  if (!modal.result) {
                    return;
                  }
                  dp.events.add({
                    start: this.state.args.start,
                    end: this.state.args.end,
                    id: DayPilot.guid(),
                    text: modal.result,
                  });
                },
              },
              {
                label: this.state.activities[1],
                onClick: async () => {
                  const dp = this.calendar;
                  const modal = await DayPilot.Modal.prompt(
                    "Your selected event.",
                    this.state.activities[1]
                  );
                  dp.clearSelection();
                  if (!modal.result) {
                    return;
                  }
                  dp.events.add({
                    start: this.state.args.start,
                    end: this.state.args.end,
                    id: DayPilot.guid(),
                    text: modal.result,
                  });
                },
              },
              {
                label: this.state.activities[2],
                onClick: async () => {
                  const dp = this.calendar;
                  const modal = await DayPilot.Modal.prompt(
                    "Your selected event.",
                    this.state.activities[2]
                  );
                  dp.clearSelection();
                  if (!modal.result) {
                    return;
                  }
                  dp.events.add({
                    start: this.state.args.start,
                    end: this.state.args.end,
                    id: DayPilot.guid(),
                    text: modal.result,
                  });
                },
              },
            ],
          });
        }
      },
      eventDeleteHandling: "Update",
      onEventClick: async (args) => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt(
          "Update event text:",
          args.e.text()
        );
        if (!modal.result) {
          return;
        }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
      },
    };
  }

  componentDidMount() {
    this.setState({
      startDate:
        new Date().getFullYear() +
        "-" +
        String(new Date().getMonth() + 1).padStart(2, "0") +
        "-" +
        String(new Date().getDate()).padStart(2, "0"),
      events: [],
    });
  }

  render() {
    const { ...config } = this.state;
    return (
      <>
        <div className="col-sm-12" style={styles.navbar}>
          <button onClick={this.state.toggleState} className="btn btn-primary">
            {!this.state.isWild ? (
              <span>Use Wildcard</span>
            ) : (
              <span>Use Hard Input</span>
            )}
          </button>
        </div>
        <div style={styles.wrap}>
          <DayPilotCalendar
            {...config}
            ref={(component) => {
              this.calendar = component && component.control;
            }}
          />
        </div>
      </>
    );
  }
}

export default Schedular;

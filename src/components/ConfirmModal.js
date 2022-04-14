import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import React from "react";

const options = {
  title: "Title",
  message: "Message",
  buttons: [
    {
      label: "Yes",
      onClick: () => alert("Click Yes"),
    },
    {
      label: "No",
      onClick: () => alert("Click No"),
    },
  ],
  childrenElement: () => <div />,
  customUI: ({ onClose }) => <div>Custom UI</div>,
  closeOnEscape: true,
  closeOnClickOutside: true,
  keyCodeForClose: [8, 32],
  willUnmount: () => {},
  afterClose: () => {},
  onClickOutside: () => {},
  onKeypressEscape: () => {},
  overlayClassName: "overlay-custom-class-name",
};

confirmAlert(options);

export class ConfirmModal extends React.Component {
  submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes"),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  render() {
    return (
      <div className="container">
        <button onClick={this.submit}>Confirm dialog</button>
      </div>
    );
  }
}

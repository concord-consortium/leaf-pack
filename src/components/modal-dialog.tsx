import React from "react";
import Modal from "react-modal";

import "./modal-dialog.scss";

interface IProps {
  title?: string;
  label: string;
  onClose: () => void;
  showModal: boolean;
}

export class ModalDialog extends React.PureComponent <IProps> {
  render() {
    const { title, label, showModal, onClose } = this.props;
    const handleClose = () => {
      onClose();
    };
    return (
      <Modal
        isOpen={showModal}
        contentLabel={title || "Alert"}
        className={"modal-dialog"}
      >
        <div className="header" data-testid="modal-dialog-header">{title || "Alert"}</div>
        <div data-testid="modal-dialog-label">{label}</div>
        <div className="footer">
          <button onClick={handleClose} data-testid="modal-dialog-close">Close</button>
        </div>
      </Modal>
    );
  }
}

import React from "react";
import Modal from "react-modal";

// Set the app element to avoid accessibility warnings
Modal.setAppElement("#__next");

const index = ({ isModalOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          maxWidth: "500px",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
        },
      }}
    >
      <h2>Modal Title</h2>
      <p>This is the content inside the modal.</p>
      <button
        onClick={closeModal}
        style={{
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "15px",
        }}
      >
        Close
      </button>
    </Modal>
  );
};

export default index;

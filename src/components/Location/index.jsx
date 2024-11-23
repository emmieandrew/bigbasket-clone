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
          height: "250px", // Ensure height is in a string for inline CSS
          display: "flex", // Use string values
          flexDirection: "column", // Use camelCase
          justifyContent: "center", // Use camelCase
          alignItems: "center", // Use camelCase
        },
      }}
    >
      <h2 style={{fontSize: "20px", }} >Select a location for delivery</h2>
      <p>Choose your address location to see product availability and delivery options</p>
      <div className="serchArea_Head" style={{ position:"relative",    width: "100%",}}>
      <svg height={18} width={18} class="svg-icon search-icon"  style={{position: "absolute", left: "10px", top:"34%", }} aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7"><title id="title">Search Icon</title><desc id="desc">A magnifying glass icon.</desc><g class="search-path" fill="none" stroke="#848F91"><path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4"/><circle cx="8" cy="8" r="7"/></g></svg>
  <input type="text" placeholder="Search for area or street name" style={{ paddingLeft: "32px", paddingRight: "32px", }}  />
</div>
      <button
        onClick={closeModal}
        style={{
          padding: "4px",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "15px",
          position: "absolute",
          top: "5px",
          right: "6px",
          marginTop: "4px",
        }}
      >
        <svg width={14} height={14} viewPort="0 0 12 12" version="1.1"
     xmlns="http://www.w3.org/2000/svg">
    <line x1="1" y1="11" 
          x2="11" y2="1" 
          stroke="black" 
          stroke-width="2"/>
    <line x1="1" y1="1" 
          x2="11" y2="11" 
          stroke="black" 
          stroke-width="2"/>
</svg>
      </button>
    </Modal>
  );
};

export default index;

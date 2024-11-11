import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setPinCode } from "@/redux/features/pinCodeSlice";

Modal.setAppElement("#__next"); // Required for accessibility

const PinCodeModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedPinCode = localStorage.getItem("pinCode");
    if (storedPinCode) {
      dispatch(setPinCode(storedPinCode));
      setIsOpen(false); // Close modal if pinCode is already set
    }
  }, [dispatch]);

  const onSubmit = (data) => {
    const { pinCode } = data;
    dispatch(setPinCode(pinCode));
    localStorage.setItem("pinCode", pinCode);
    setIsOpen(false);
    reset();
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      padding: "30px",
      width: "320px",
      height: "300px",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      // onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      contentLabel="Enter Pin Code"
    >
     
      <p className="modal-title">Enter Your Pin Code</p>
      <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
        <input
          type="text"
          placeholder="Enter Pin Code"
          {...register("pinCode", { required: true })}
          className="modal-input"
        />
        <button type="submit" className="modal-submit-button">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default PinCodeModal;

import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowRight } from "react-icons/fa";
import acceptImage from "../screens/assets/accept.png"; // Import the image

const Popup = ({ show }) => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <Modal
      show={show}
      centered
      dialogClassName="custom-modal-width" // Apply custom class for the modal
    >
      <Modal.Body style={styles.modalContent}>
        <h3 style={styles.modalHeading}>Submission Status</h3>
        <p style={styles.modalSubtext}>Form submitted successfully!</p>
        <img src={acceptImage} alt="accept" style={styles.image} />

        <div style={styles.buttonContainer}>
          <Button
            variant="danger"
            onClick={handleNavigateHome}
            className="w-30"
            style={{ fontWeight: "bold" }}
          >
            Back to Home Page <FaArrowRight />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Popup;

const styles = {
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
  },
  modalHeading: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "red",
    textAlign: "center",
  },
  modalSubtext: {
    fontSize: 16,
    marginBottom: 20,
    color: "black",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2%",
  },
  image: {
    width: "10%",
    display: "block",
    margin: "0 auto",
  },
};

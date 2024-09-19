// HospitalModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HospitalModal = ({ modalVisible, setModalVisible }) => {
    const navigate = useNavigate();

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setModalVisible(false);
        }
    };
    const handleConfirm = () => {
        navigate('/YourPreferred');
        setModalVisible(false);
    };

    const handleCancel = () => {
        navigate('/SelectEmergency');
        setModalVisible(false);
    };

    const styles = {
        modalContent: {
            padding: '20px',
            textAlign: 'center',
        },
        modalHeading: {
            fontSize: '1.5rem',
            marginBottom: '10px',
        },
        modalSubtext: {
            fontSize: '1rem',
            marginBottom: '20px',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
        },
    };

    return (
        <Modal
            show={modalVisible}
            onHide={() => setModalVisible(false)}
            onClick={handleBackdropClick}
            centered
             backdrop="static"
        >
            <Modal.Body style={styles.modalContent}>
                <h2 style={styles.modalHeading}>Have a Hospital in Mind?</h2>
                <p style={styles.modalSubtext}>Do you want to look for your preferred Hospitals or go with any Hospital?</p>
                <div style={styles.buttonContainer}>
                    <Button variant="success" onClick={handleConfirm}>SHOW PREFERRED</Button>
                    <Button variant="danger" onClick={handleCancel}>BOOK ANY</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default HospitalModal;

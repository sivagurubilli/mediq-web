import React, { useState } from 'react';
import { Modal } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

function ServiceScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleBackdropClick = () => {
        setModalVisible(false);
    };

    return (
        <div style={styles.container}>
            {/* Cards Section */}
            <div style={styles.scrollView}>
                <div style={styles.cardContainer} onClick={() => setModalVisible(true)}>
                    <div style={styles.gradient}>
                        <div style={styles.cardContent}>
                            <h2 style={styles.cardTitle}>Emergency Ambulance</h2>
                            <p style={styles.cardDescription}>Click here for Emergency Ambulance.</p>
                            <div style={styles.getstartContainer}>
                                <button style={styles.getStartedButton}>Learn More!</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.cardContainer} onClick={() => navigate('/SomeScreen')}>
                    <div style={styles.gradient}>
                        <div style={styles.cardContent}>
                            <h2 style={styles.cardTitle}>Private Ambulance</h2>
                            <p style={styles.cardDescription}>Click here for Private Ambulance.</p>
                            <div style={styles.getstartContainer}>
                                <button style={styles.getStartedButton}>Learn More!</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.cardContainer} onClick={() => navigate('/SomeScreen')}>
                    <div style={styles.gradient}>
                        <div style={styles.cardContent}>
                            <h2 style={styles.cardTitle}>Mortuary</h2>
                            <p style={styles.cardDescription}>Click here for Mortuary services.</p>
                            <div style={styles.getstartContainer}>
                                <button style={styles.getStartedButton}>Learn More!</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.cardContainer} onClick={() => navigate('/moreServices')}>
                    <div style={styles.gradient}>
                        <div style={styles.cardContent}>
                            <h2 style={styles.cardTitle}>More Services</h2>
                            <p style={styles.cardDescription}>Click here for more services.</p>
                            <div style={styles.getstartContainer}>
                                <button style={styles.getStartedButton}>Learn More!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={modalVisible}
                onClose={() => handleBackdropClick()}
                // Attach onClick event to the backdrop
                onClick={handleBackdropClick}
            >
                <div style={styles.modalContainer}>
                    <div style={styles.modalContent}>
                        <h2 style={styles.modalHeading}>Have a Hospital in Mind?</h2>
                        <p style={styles.modalSubtext}>Do you want to look for your preferred Hospitals or go with any Hospital?</p>
                        <div style={styles.buttonContainer}>
                            <button style={styles.button} onClick={() => navigate('/YourPreferred')}>SHOW PREFERRED</button>
                            <button style={{ ...styles.button, ...styles.secondaryButton }} onClick={() => navigate('/SelectEmergency')}>BOOK ANY</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#D3FFD8',
        padding: 20,
    },
    scrollView: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    cardContainer: {
        margin: '3%',
        marginBottom:'3%',
        cursor: 'pointer',
    },
    gradient: {
        background: 'linear-gradient(to right, #FFFFFF, #FFFFFF)',
        borderRadius: 15,
        width: 300,
    },
    cardContent: {
        borderRadius: 6,
        padding: '7%',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: '1%',
        color: 'black',
    },
    cardDescription: {
        fontSize: 15,
        color: 'black',
    },
    getStartedButton: {
        padding: 7,
        color: '#052769',
        borderRadius: 5,
        textAlign: 'center',
        fontWeight: 500,
        border: '2px solid #FFBB37',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        marginBottom:'3%'
    },
    getstartContainer: {
        display: 'flex',
        marginTop: '6%',
    },
    modalContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        textAlign: 'center',
        width: '80%',
        maxWidth: 500,
    },
    modalHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'red',
    },
    modalSubtext: {
        fontSize: 16,
        marginBottom: 20,
        color: 'black',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    button: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        textAlign: 'center',
        backgroundColor: 'green',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    secondaryButton: {
        backgroundColor: 'red',
    },
};

export default ServiceScreen;

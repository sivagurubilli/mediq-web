import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ServiceScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleBackdropClick = () => {
        setModalVisible(false);
    };

    return (
        <Container fluid style={styles.container}>
            <Row className="justify-content-center">
                <Col xs={12} sm={6} md={4} style={styles.cardContainer} onClick={() => setModalVisible(true)}>
                    <div style={styles.gradient}>
                        <div style={styles.cardContent}>
                            <h2 style={styles.cardTitle}>Emergency Ambulance</h2>
                            <p style={styles.cardDescription}>Click here for Emergency Ambulance.</p>
                            <div style={styles.getstartContainer}>
                                <Button variant="primary" style={styles.getStartedButton}>Book Now!</Button>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xs={12} sm={6} md={4} style={styles.cardContainer} onClick={() => navigate('/SomeScreen')}>
                    <div style={styles.gradient}>
                        <div style={styles.cardContent}>
                            <h2 style={styles.cardTitle}>Private Ambulance</h2>
                            <p style={styles.cardDescription}>Click here for Private Ambulance.</p>
                            <div style={styles.getstartContainer}>
                                <Button variant="primary" style={styles.getStartedButton}>Book Now!</Button>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xs={12} sm={6} md={4} style={styles.cardContainer} onClick={() => navigate('/SomeScreen')}>
                    <div style={styles.gradient}>
                        <div style={styles.cardContent}>
                            <h2 style={styles.cardTitle}>Mortuary</h2>
                            <p style={styles.cardDescription}>Click here for Mortuary services.</p>
                            <div style={styles.getstartContainer}>
                                <Button variant="primary" style={styles.getStartedButton}>Book Now!</Button>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xs={12} sm={6} md={4} style={styles.cardContainer} onClick={() => navigate('/firstaid')}>
                    <div style={styles.gradient}>
                        <div style={styles.cardContent}>
                            <h2 style={styles.cardTitle}>First AID</h2>
                            <p style={styles.cardDescription}>Click here for firstaid services.</p>
                            <div style={styles.getstartContainer}>
                                <Button variant="primary" style={styles.getStartedButton}>Book Now!</Button>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xs={12} sm={6} md={4} style={styles.cardContainer} onClick={() => navigate('/moreServices')}>
                    <div style={styles.gradient}>
                        <div style={styles.cardContent}>
                            <h2 style={styles.cardTitle}>More Services</h2>
                            <p style={styles.cardDescription}>Click here for more services.</p>
                            <div style={styles.getstartContainer}>
                                <Button variant="primary" style={styles.getStartedButton}>Book Now!</Button>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xs={12} sm={6} md={4} style={styles.cardContainer} onClick={() => navigate('/profile')}>
                    <div style={styles.gradient}>
                        <div style={styles.cardContent}>
                            <h2 style={styles.cardTitle}>Profile/Register</h2>
                            <p style={styles.cardDescription}>Click here for Register.</p>
                            <div style={styles.getstartContainer}>
                                <Button variant="primary" style={styles.getStartedButton}>Create Profile/Register</Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <Modal
                show={modalVisible}
                onHide={() => setModalVisible(false)}
                onClick={handleBackdropClick}
                centered
            >
                <Modal.Body style={styles.modalContent}>
                    <h2 style={styles.modalHeading}>Have a Hospital in Mind?</h2>
                    <p style={styles.modalSubtext}>Do you want to look for your preferred Hospitals or go with any Hospital?</p>
                    <div style={styles.buttonContainer}>
                        <Button variant="success" onClick={() => navigate('/YourPreferred')}>SHOW PREFERRED</Button>
                        <Button variant="danger" onClick={() => navigate('/SelectEmergency')}>BOOK ANY</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#066951',
        backgroundImage: `url(${require('./assets/LyfGuardLogo.png')})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '600px 600px',
        padding: 20,
    },
    cardContainer: {
        marginBottom: '3%',
        cursor: 'pointer',
    },
    gradient: {
        background: 'linear-gradient(to right, #FFFFFF, #FFFFFF)',
        borderRadius: 15,
        width: '100%',
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
        borderRadius: 5,
        textAlign: 'center',
        fontWeight: 500,
        border: '2px solid #FFBB37',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        marginBottom: '3%',
        color:'black'
    },
    getstartContainer: {
        display: 'flex',
        marginTop: '6%',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        textAlign: 'center',
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
};

export default ServiceScreen;

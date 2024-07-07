import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GET_FIRSTAID_CATEGORY } from './api';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function FirstAidservices() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authorization token found');
                return;
            }
    
            try {
                const response = await axios.get(GET_FIRSTAID_CATEGORY, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.status !== 200) {
                    console.error('HTTP error! Status:', response.status);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = response.data;
                if (data.code === 200) {
                    setServices(data.data.firstAidCategories);
                    console.log('response:', data);
                } else {
                    throw new Error(`API error! Code: ${data.code}`);
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    

    const handleCardClick = (id, slug) => {
        navigate(`/firstaidservice/${id}/${slug}`);
    };

    if (error) {
        return <div style={styles.errorContainer}>Error: {error}</div>;
    }

    return (
        <Container fluid style={styles.container}>
            <Row className="justify-content-center">
                {services.map(service => (
                    <Col key={service.id} xs={12} sm={6} md={4} lg={3} style={styles.cardContainer}>
                        <Card className="mb-4" style={{ borderRadius: '15px' }} onClick={() => handleCardClick(service.id,service.slug)}>
                            <Card.Body>
                                <Card.Title>{service.name}</Card.Title>
                                <Card.Text>Click here for {service.name}.</Card.Text>
                                <div style={styles.getstartContainer}>
                                    <Button style={styles.getStartedButton}>Book Now!</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
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
        cursor: 'pointer',
        borderRadius: 10
    },
    errorContainer: {
        color: 'red',
        fontWeight: 'bold',
    },
    getstartContainer: {
        display: 'flex',
        marginTop: '6%',
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
        color: 'black'
    },
};

export default FirstAidservices;

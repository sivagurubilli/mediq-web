import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { GET_FIRSTAID_CATEGORY_BYID } from './api';
import { Container, Card, Button } from 'react-bootstrap';

function FirstAidServiceDetail() {
    const { id, slug } = useParams();
    const [service, setService] = useState(null);
    const [error, setError] = useState(null);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authorization token found');
                return;
            }

            try {
                const response = await axios.get(GET_FIRSTAID_CATEGORY_BYID(id), {
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
                    const firstAidService = data.data.firstAid.find(service => service.id === parseInt(id));
                    setService(firstAidService);
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
    }, [id]);

    if (error) {
        return <div style={styles.errorContainer}>Error: {error}</div>;
    }

    if (!service) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid style={styles.container}>
            <Card className="mb-4" style={{ borderRadius: '15px' }}>
                <Card.Body>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                    {showVideo ? (
                        <ReactPlayer
                            url={service.video_link}
                            controls
                            width="100%"
                            height="500px"
                        />
                    ) : (
                        <Button onClick={() => setShowVideo(true)} style={styles.getStartedButton}>
                            See Video!
                        </Button>
                    )}
                </Card.Body>
            </Card>
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
    errorContainer: {
        color: 'red',
        fontWeight: 'bold',
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

export default FirstAidServiceDetail;

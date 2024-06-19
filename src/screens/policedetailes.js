import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { POLICE_DETAILS } from './api'; 

function ServiceDetail() {
    const { slug } = useParams();
    const [serviceDetail, setServiceDetail] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServiceDetail = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authorization token found');
                return;
            }
            try {
                // Fetch user's current geolocation
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });

                    // Construct API endpoint with latitude and longitude
                    const apiEndpoint = `${POLICE_DETAILS}/${latitude}/${longitude}`;

                    const response = await axios.get(apiEndpoint, {
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
                        setServiceDetail(data.data.listing[0]);
                        console.error('response:', response.data);
                    } else {
                        throw new Error(`API error! Code: ${data.code}`);
                    }
                }, (error) => {
                    setError(`Error retrieving geolocation: ${error.message}`);
                    console.error('Geolocation error:', error);
                });
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            }
        };

        fetchServiceDetail();
    }, [slug]);

    const handleDirectionsClick = () => {
        if (userLocation && serviceDetail) {
            const { latitude: userLat, longitude: userLng } = userLocation;
            const { latitude: policeLat, longitude: policeLng } = serviceDetail;
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${policeLat},${policeLng}&travelmode=driving`;
            window.open(directionsUrl, '_blank');
        }
    };

    if (error) {
        return <div style={styles.errorContainer}>Error: {error}</div>;
    }

    if (!serviceDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.cardContent}>
                <h2 style={styles.cardTitle}>{serviceDetail.name}</h2>
                <p style={styles.cardDescription}>Phone: {serviceDetail.phone}</p>
                <p style={styles.cardDescription}>Address: {serviceDetail.address_line1}</p>
                <p style={styles.cardDescription}>Pincode: {serviceDetail.pincode}</p>
                <button style={styles.directionButton} onClick={handleDirectionsClick}>
                    Get Directions 🧭
                </button>
            </div>
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
    cardContent: {
        borderRadius: 6,
        padding: '7%',
        backgroundColor: '#FFF',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
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
    errorContainer: {
        color: 'red',
        fontWeight: 'bold',
    },
    directionButton: {
        marginTop: 20,
        padding: '10px 20px',
        fontSize: 16,
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
    }
};

export default ServiceDetail;

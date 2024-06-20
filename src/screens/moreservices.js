import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_LISTING_TYPE } from './api'; 
import axios from 'axios';

function Moreservices() {
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
                const response = await axios.get(GET_LISTING_TYPE, {
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
                    setServices(data.data.types);
                    console.error('response:', data);
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
        switch(id) {
            case 1:
                navigate('/police');
                break;
            case 2:
                navigate('/fire-stations');
                break;
            case 3:
                navigate('/blood-banks');
                break;
            case 4:
                navigate('/mortuaries');
                break;
            default:
                navigate(`/service/${slug}`);
        }
    }

    if (error) {
        return <div style={styles.errorContainer}>Error: {error}</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.scrollView}>
                {services.map(service => (
                    <div 
                        key={service.id} 
                        style={styles.cardContainer} 
                        onClick={() => handleCardClick(service.id, service.slug)} 
                    >
                        <div style={styles.gradient}>
                            <div style={styles.cardContent}>
                                <h2 style={styles.cardTitle}>{service.name}</h2>
                                <p style={styles.cardDescription}>Click here for {service.name}.</p>
                                <div style={styles.getstartContainer}>
                                    <button style={styles.getStartedButton}>Learn More!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
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
    scrollView: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    cardContainer: {
        margin: '3%',
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
        marginBottom: '3%',
    },
    getstartContainer: {
        display: 'flex',
        marginTop: '6%',
    },
    errorContainer: {
        color: 'red',
        fontWeight: 'bold',
    }
};

export default Moreservices;

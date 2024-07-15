import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { POLICE_DETAILS } from './api';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

function ServiceDetail() {
    const { id } = useParams();
    const [serviceDetail, setServiceDetail] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [searchLocation, setSearchLocation] = useState(null);
    const [error, setError] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);


    const handleMouseEnterbutton = (button) => setHoveredButton(button);
    const handleMouseLeavesbutton = () => setHoveredButton(null);

    useEffect(() => {
        const fetchServiceDetail = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authorization token found');
                return;
            }

            try {
                // Fetch user's geolocation using Google Maps Geolocation API
                const googleGeolocationEndpoint = `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCLg_Oahf9q1keNmJoqHc_Uk4f0fu3YmxU`;

                const geolocationResponse = await axios.post(googleGeolocationEndpoint);
                const { lat: latitude, lng: longitude } = geolocationResponse.data.location;
                setUserLocation({ latitude, longitude });

                // If searchLocation is set, use it as userLocation
                const finalLocation = searchLocation || { latitude, longitude };

                // Construct API endpoint with id, latitude, and longitude
                const apiEndpoint = POLICE_DETAILS(id, finalLocation.latitude, finalLocation.longitude);
                console.log(apiEndpoint);
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
                if (data.code === 200 && data.data.listing.length > 0) {
                    setServiceDetail(data.data.listing[0]);
                    console.log(data.data);
                } else {
                    setError('No police station found at the specified location');
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            }
        };

        fetchServiceDetail();
    }, [id, searchLocation]);

    const handleLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };

    const handlePlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                const latitude = place.geometry.location.lat();
                const longitude = place.geometry.location.lng();
                setSearchLocation({ latitude, longitude });
            }
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    const handleDirectionsClick = () => {
        if (serviceDetail) {
            let originLat, originLng;

            if (searchLocation) {
                originLat = searchLocation.latitude;
                originLng = searchLocation.longitude;
            } else if (userLocation) {
                originLat = userLocation.latitude;
                originLng = userLocation.longitude;
            } else {
                setError('Could not determine user location');
                return;
            }

            const { latitude: policeLat, longitude: policeLng } = serviceDetail;
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${policeLat},${policeLng}&travelmode=driving`;
            window.open(directionsUrl, '_blank');
        }
    };

    const handleCallClick = () => {
        if (serviceDetail && serviceDetail.phone) {
            window.location.href = `tel:${serviceDetail.phone}`;
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
            <div style={styles.searchBar}>
                <LoadScript googleMapsApiKey="AIzaSyCLg_Oahf9q1keNmJoqHc_Uk4f0fu3YmxU" libraries={["places"]}>
                    <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                        <input
                            type="text"
                            placeholder="Search for a Current location"
                            style={styles.searchInput}
                        />
                    </Autocomplete>
                </LoadScript>
            </div>
            <div style={styles.cardContent}>
                <h2 style={styles.cardTitle}>{serviceDetail.name}</h2>
                <p style={styles.cardDescription}>
                    <img src={require('./assets/location.png')} alt="Profile/Register" style={styles.Icon} />
                    {serviceDetail.address_line1},     {serviceDetail.pincode}
                </p>

                <p style={styles.cardDescription}>
                    <a href={`tel:${serviceDetail.phone}`} style={styles.phoneLink}>
                        <img src={require('./assets/phone.png')} alt="Profile/Register" style={styles.Icon} />
                        {serviceDetail.phone}</a>
                </p>
                <div style={styles.buttonRow}>
                    <button
                        onClick={handleDirectionsClick}
                        style={{
                            ...styles.Button,
                            backgroundColor: hoveredButton === 'Direction' ? 'green' : '#F4A338',
                            color: hoveredButton === 'Direction' ? 'white' : 'white',

                        }}
                        onMouseEnter={() => handleMouseEnterbutton('Direction')}
                        onMouseLeave={handleMouseLeavesbutton}

                    >
                        Get Directions
                        <img src={require('./assets/Direction.png')} alt="Profile/Register" style={styles.Icon} />
                    </button>
                    <button
                        onClick={handleCallClick}
                        style={{
                            ...styles.Button,
                            backgroundColor: hoveredButton === 'Call' ? 'green' : '#F4A338',
                            color: hoveredButton === 'Call' ? 'white' : 'white',

                        }}
                        onMouseEnter={() => handleMouseEnterbutton('Call')}
                        onMouseLeave={handleMouseLeavesbutton}
                    >
                        Call
                        <img src={require('./assets/Call.png')} alt="Profile/Register" style={styles.Icon} />
                    </button>
                </div>
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
        backgroundColor: '#066951',
        backgroundImage: `url(${require('./assets/LyfGuardLogo.png')})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '600px 600px',
        padding: 20,
    },
    searchBar: {
        width: '100%',
        maxWidth: 600,
        marginBottom: 20,
    },
    searchInput: {
        width: '100%',
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        border: '1px solid #ccc',
    },
    cardContent: {
        borderRadius: 15,
        padding: '4%',
        // width: '40%',
        background: 'linear-gradient(135deg, #EEEEEE,#EEEEEE, #F4A338)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        border: '3px solid white',
        
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 700,
        marginBottom: '1%',
        color: 'black',
    },
    cardDescription: {
        fontSize: 18,
        color: 'black',
    },
    Icon: {
        marginRight: 10,
        marginLeft: 10,
        marginBottom:5,
        width: 18,
        height: 18,
        verticalAlign: 'middle',
    },
    phoneLink: {
        color: '#007BFF',
        textDecoration: 'none',
    },
    errorContainer: {
        color: 'red',
        fontWeight: 'bold',
    },
    Button: {
        padding: '10px 20px',
        fontSize: 20,
        color: '#fff',
        // backgroundColor: '#F4A338',
        border: 'none',
        borderRadius: 15,
        cursor: 'pointer',
        marginRight: 20,
        fontWeight: '600'
    },

    buttonRow: {
        display: 'flex',
        marginTop: 20,
    }
};

export default ServiceDetail;

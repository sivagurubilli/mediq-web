import React, { useEffect, useState } from 'react';
import { PREFERRED_HOSPITAL } from './api'; // Assuming this imports the correct endpoint
import axios from 'axios';

function PreferredHospitalsScreen() {
    const [preferredHospitals, setPreferredHospitals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPreferredHospitals(); // Fetch hospitals when the component mounts
    }, []);

    const fetchPreferredHospitals = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token is missing');
                setError('Token is missing');
                return;
            }

            console.log('Token:', token);

            const response = await axios.get(PREFERRED_HOSPITAL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response); // Log the full response for further inspection

            if (response.status === 200) {
                if (response.data.data && response.data.data.preferredHospitals) {
                    setPreferredHospitals(response.data.data.preferredHospitals);
                } else {
                    console.warn('No preferred hospitals data found in response');
                    setPreferredHospitals([]);
                }
            } else {
                console.error('Unexpected response status:', response.status, response.data);
                setError(`Failed to fetch preferred hospitals: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
                setError(`Failed to fetch preferred hospitals: ${error.response.status}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
                setError('Failed to fetch preferred hospitals: No response received');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                setError(`Failed to fetch preferred hospitals: ${error.message}`);
            }
            console.error('Error config:', error.config);
        }
    };
    
    return (
        <div>
            <h2>Preferred Hospitals</h2>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                preferredHospitals.length > 0 ? (
                    <ul>
                        {preferredHospitals.map(hospital => (
                            <li key={hospital.id}>
                                <h3>{hospital.name}</h3>
                                <p>{hospital.branchTypeName}</p>
                                <p>{hospital.address_line1}</p>
                                <p>{hospital.pincode}</p>
                                <p>{hospital.phone}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No preferred hospitals found.</p>
                )
            )}
        </div>
    );
}

export default PreferredHospitalsScreen;
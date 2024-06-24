import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFERRED_HOSPITAL } from './api';

function PreferredHospitalsScreen() {
    const [preferredHospitals, setPreferredHospitals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
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
                        'Content-Type': 'application/json',
                    }
                });
                console.log('Response:', response);

                if (response.data.code === 200) {
                    setPreferredHospitals(response.data.data.preferredHospitals);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                console.error('Error fetching preferred hospitals:', err);
                if (err.response) {
                   
                    console.error('Response data:', err.response.data);
                    console.error('Response status:', err.response.status);
                    console.error('Response headers:', err.response.headers);
                } else if (err.request) {
                    // Request was made but no response was received
                    console.error('Request data:', err.request);
                } else {
                    // Something else caused the error
                    console.error('Error message:', err.message);
                }
                setError('An error occurred while fetching the preferred hospitals.');
            }
        };

        fetchPreferredHospitals();
    }, []);

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

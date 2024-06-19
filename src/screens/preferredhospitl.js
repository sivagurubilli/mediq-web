import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PREFERRED_HOSPITAL } from './api'; // Assuming this imports the correct endpoint
import axios from 'axios';

function PreferredHospitalsScreen() {
    const [preferredHospitals, setPreferredHospitals] = useState([]);
    const { emergencyType } = useParams(); // Assuming you're passing emergencyType as a parameter

    useEffect(() => {
        fetchPreferredHospitals(emergencyType); // Fetch hospitals when emergencyType changes
    }, [emergencyType]);

    const fetchPreferredHospitals = async (emergencyType) => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        console.log('emergencyType:', emergencyType);
      
        try {
            const response = await axios.get(PREFERRED_HOSPITAL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: {
                    emergencyType: emergencyType // Adjust if query parameter is needed
                }
            });
    
            console.log('Response:', response); // Log the full response for further inspection
    
            if (response.status === 200) {
                setPreferredHospitals(response.data.data.preferredHospitals); // Adjust based on API structure
            } else {
                throw new Error('Failed to fetch preferred hospitals');
            }
        } catch (error) {
            console.error('Error fetching preferred hospitals:', error);
        }
    };
    

    return (
        <div>
            <h2>Preferred Hospitals</h2>
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
        </div>
    );
}

export default PreferredHospitalsScreen;

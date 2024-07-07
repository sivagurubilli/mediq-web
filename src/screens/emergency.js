import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EMERGENCY_TYPE } from './api'; 
import { useNavigate } from 'react-router-dom';

function EmergencyScreen({ navigation }) {

    const [selectedButton, setSelectedButton] = useState('');
    const [canProceed, setCanProceed] = useState(false);
    const [emergencyTypes, setEmergencyTypes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmergencyTypes();
    }, []);

    const fetchEmergencyTypes = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(EMERGENCY_TYPE, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Emergency types:', JSON.stringify(response.data, null, 2));
            setEmergencyTypes(response.data.data.types);
        } catch (error) {
            console.error('Error fetching emergency types:', error);
        }
    };
    
    const handleButtonClick = (slug) => {
        setSelectedButton(slug);
        setCanProceed(true);
    };

    const handleProceedButtonClick = () => {
        if (canProceed && selectedButton) {
            const selectedType = emergencyTypes.find(type => type.name === selectedButton);
            if (selectedType) {
                navigate('/map', { state: { selectedButton, typeId: selectedType.id } });
            }
        }
    };

    // Dynamic styling for the Proceed button
    const proceedButtonStyle = {
        ...styles.proceedButton,
        color: canProceed ? 'white' : 'black',
        backgroundColor: canProceed ? 'red' : 'grey',
        cursor: canProceed ? 'pointer' : 'not-allowed',
    };

    return (
        <div style={styles.container}>
            <div style={styles.buttonsContainer}>
                {emergencyTypes.map((type, index) => (
                    <div key={index} style={styles.buttonContainer}>
                        <button
                            onClick={() => handleButtonClick(type.name)}
                            style={{
                                ...styles.button,
                                color: selectedButton === type.name ? 'white' : 'white',
                                backgroundColor: selectedButton === type.name ? 'red' : 'grey',
                            }}
                        >
                            {type.name}
                        </button>
                    </div>
                ))}
            </div>
            <div style={styles.proceedButtonContainer}>
                <button
                    onClick={handleProceedButtonClick}
                    style={proceedButtonStyle}
                    disabled={!canProceed}
                >
                    Proceed
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#066951',
        backgroundImage: `url(${require('./assets/LyfGuardLogo.png')})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '600px 600px',
        padding: 20,
    },
    buttonsContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    buttonContainer: {
        marginBottom: 10,
        width: '100%',
    },
    button: {
        fontSize: 25,
        fontWeight: 500,
        width: '100%',
        border: '2px solid black',
        borderRadius: '10px',
        
    },
    proceedButtonContainer: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        padding: 20,
        backgroundColor: '#066951',
        boxSizing: 'border-box',
    },
    proceedButton: {
        fontSize: 25,
        fontWeight: '500',
        width: '100%',
        border: '2px solid black',
        borderRadius: '10px',
    },
};

export default EmergencyScreen;

import React, { useState } from 'react';
import { Container, Form, Button, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LOGOUT, UPDATE_PROFILE } from './api'; // Assuming UPDATE_PROFILE is defined in your API file
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProfileScreen = () => {
    const navigate = useNavigate();
    const [hoveredButton, setHoveredButton] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [avatar, setAvatar] = useState(null); // State to store user's profile picture
    const [setUploaded] = useState(false); // State to track if picture is uploaded

    const handleMouseEnterButton = (button) => setHoveredButton(button);
    const handleMouseLeaveButton = () => setHoveredButton(null);

    const [profile, setProfile] = useState({
        name: '',
        mobile: '',
        gender: '',
        blood_group: '',
        dob: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        mobile: '',
        bloodGroup: '',
        dob: ''  // Error state for date of birth
    });

    const handleChange = (e) => {
        if (e instanceof Date) {
            // Handle date change separately
            setProfile({ ...profile, dob: e });
            validateField('dob', e); // You can validate date here if needed
        } else {
            const { name, value } = e.target;
            setProfile({ ...profile, [name]: value });
            validateField(name, value);
        }
    };
    
    

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'name':
                if (!/^[A-Za-z\s]+$/.test(value)) {
                    error = 'Name should only contain alphabets.';
                }
                break;
            case 'mobile':
                if (!/^\d{10}$/.test(value)) {
                    error = 'Mobile number should only contain 10 digits.';
                }
                break;
            case 'bloodGroup':
                if (!/^(A|B|AB|O)[+-]$/i.test(value)) {
                    error = 'Blood group should be one of A+, A-, B+, B-, AB+, AB-, O+, O-.';
                }
                break;
            case 'dob':
                if (!value) {
                    error = 'Date of Birth is required.';
                }
                break;
            default:
                break;
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (Object.values(errors).every(error => error === '') &&
            Object.values(profile).every(field => field !== null && field !== '')) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No authorization token found');
                    return;
                }
    
                console.log('Submitting profile:', profile); // Debug the profile before sending
    
                const response = await axios.post(UPDATE_PROFILE, profile, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.status === 200) {
                    console.log('Profile updated successfully:', response.data);
                    navigate('/services');
                } else {
                    console.error('Failed to update profile:', response.data);
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        } else {
            console.log('Please fix the errors before submitting.');
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authorization token found');
                return;
            }

            try {
                const response = await axios.get(LOGOUT, {
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
                    console.log('Logout successful', response.data);
                    navigate('/');
                } else {
                    throw new Error(`API error! Code: ${data.code}`);
                }
            } catch (error) {
                console.error('Logout failed', error);
            }

        } catch (error) {
            // Handle error (e.g., show error message)
        }
    };

    const handlePictureUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file)); // Store the URL of the selected file
            setUploaded(true); // Set uploaded state to true
        }
    };

    const handleRemovePicture = () => {
        setAvatar(null); // Remove the uploaded picture
        setUploaded(false); // Set uploaded state to false
    };

    const CameraIcon = () => (
        <img viewBox="0 0 24 24" width="24" height="24"
            src={require('./assets/camaraicon.png')}
            alt="Top Right"

        />
    );

    return (
        <div style={styles.centeredContainer}>
            <Container fluid style={styles.body}>
                <div style={styles.cardContainer}>
                    <div style={styles.card}>
                        <img
                            src={require('./assets/LyfGurad-white-logo.png')}
                            alt="Top Right"
                            style={styles.topRightImage}
                        />

                        <Col xs="auto" style={styles.avatarCol}>
                            <div style={styles.avatarContainer}>
                                {avatar ? (
                                    <img src={avatar} alt="Profile Pic" style={styles.avatar} onClick={handleRemovePicture} />
                                ) : (
                                    <div style={styles.defaultAvatar}>
                                        <CameraIcon style={styles.cameraIcon} />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePictureUpload}
                                            style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </Col>

                        {submitted && Object.values(profile).some(field => field === '') && (
                            <Alert variant="danger">Please fill out all fields before submitting.</Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formMobile" className="mb-4">
                                <Form.Label style={styles.label}>Mobile</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="mobile"
                                    value={profile.mobile}
                                    onChange={handleChange}
                                    placeholder="Enter your mobile number"
                                    maxLength={10}
                                    isInvalid={!!errors.mobile}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.mobile}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formName" className="mb-4">
                                <Form.Label style={styles.label}>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-4">
                                <Form.Label style={styles.label}>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                   
                                />
                            </Form.Group>

                            <Form.Label style={styles.label}>Date of Birth</Form.Label>
                            <Form.Group controlId="formDOB" className="mb-4">
                                <DatePicker
                                    selected={profile.dob}
                                    onChange={handleChange}
                                    dateFormat="dd-MMM-yyyy"
                                    placeholderText="DD-MMM-YYYY"
                                    className="form-control"
                                />
                            </Form.Group>

                            <Form.Group controlId="formGender" className="mb-4">
                                <Form.Label style={styles.label}>Gender</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="gender"
                                    value={profile.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formBloodGroup" className="mb-4">
                                <Form.Label style={styles.label}>Blood Group</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="blood_group"
                                    value={profile.blood_group}
                                    onChange={handleChange}
                                    placeholder="Enter your blood group"
                                    isInvalid={!!errors.bloodGroup}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.bloodGroup}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                                <Button
                                    type="submit"
                                    style={{
                                        ...styles.joinUsButton,
                                        backgroundColor: hoveredButton === 'Submit' ? '#FFBB37' : 'red',
                                        color: hoveredButton === 'Submit' ? 'black' : 'white',
                                    }}
                                    onMouseEnter={() => handleMouseEnterButton('Submit')}
                                    onMouseLeave={handleMouseLeaveButton}
                                >
                                    SUBMIT
                                </Button>
                                <Button
                                    onClick={handleLogout}
                                    style={{
                                        ...styles.joinUsButton,
                                        backgroundColor: hoveredButton === 'LogOut' ? '#FFBB37' : 'red',
                                        color: hoveredButton === 'LogOut' ? 'black' : 'white',
                                    }}
                                    onMouseEnter={() => handleMouseEnterButton('LogOut')}
                                    onMouseLeave={handleMouseLeaveButton}
                                >
                                    LOG OUT
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProfileScreen;

const styles = {
    centeredContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#066951',
        backgroundImage: `url(${require('./assets/LyfGuardLogo.png')})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '600px 600px',
    },
    body: {
        width: '100%',
        maxWidth: '800px', // Adjust as per your design  
    },
    topRightImage: {
        position: 'absolute',
        top: '5%',
        right: '2%',
        width: '100px', // Adjust the width as needed
        height: 'auto',
        zIndex: 1,
    },

    header: {
        color: 'white',
        textAlign: 'center',
    },
    headerRow: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '20px',
    },
    avatarCol: {
        display: 'flex',
        justifyContent: 'center',
    },
    label: {
        color: 'white',
        fontSize: 18,
    },
    cardContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center items horizontally
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        padding: 40,
        border: '1px solid rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(2px)',
        width: '100%', // Make the card take full width of the container
        maxWidth: '600px', // Limit the maximum width of the card
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center items horizontally
    },
    joinUsButton: {
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'red',
        textAlign: 'center',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        padding: '8px 16px',
        fontSize: '18px',
        marginTop: '20px',
    },
    avatarContainer: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    avatar: {
        width: '70px',
        height: '70px',
        objectFit: 'cover',
        cursor: 'pointer',
        borderRadius: '50%',
    },
    defaultAvatar: {
        width: '70px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
        color: '#fff',
        fontSize: 60,
        borderRadius: '50%',
        cursor: 'pointer',
    },
};

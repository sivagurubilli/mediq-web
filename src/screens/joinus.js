import React, { useState } from 'react';
import { Container, Form, Button, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

const JoinUsScreen = () => {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [avatar, setAvatar] = useState(null); // State to store user's profile picture
    const [uploaded, setUploaded] = useState(false); // State to track if picture is uploaded
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleMouseEnterButton = (button) => setHoveredButton(button);
    const handleMouseLeaveButton = () => setHoveredButton(null);

    const [profile, setProfile] = useState({
        name: '',
        mobile: '',
        service: '', 
        position: '', 
        email: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        mobile: '',
        bloodGroup: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
        validateField(name, value);
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
                if (!/^[A-Za-z+-]+$/.test(value)) {
                    error = 'Blood group should only contain alphabets, + and - characters.';
                }
                break;
            default:
                break;
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (Object.values(errors).every(error => error === '') &&
            Object.values(profile).every(field => field !== '')) {
            console.log('Profile submitted:', profile);
            const data = {
                email_address: email,
                status: 'subscribed'
            };
            try {
                const response = axios.post(
                    'https://us14.api.mailchimp.com/3.0/lists/LyfGuard/members',
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `apikey 2a09f1526bebd9b8be0114cd5a4c1f57-us14`
                        }
                    }
                );
                if (response.status === 200) {
                    setMessage('Subscription successful!');
                }
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                setMessage('Subscription failed. Please try again.');
            }
        } else {
            console.log('Please fix the errors before submitting.');
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
                          
                            {/* <Col>
                                <h1 style={styles.header}>REGISTER</h1>
                            </Col> */}
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

                        <Form.Group controlId="formService" className="mb-4">
                                <Form.Label style={styles.label}>Select Service</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="service"
                                    value={profile.service}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Service</option>
                                    <option value="Hospital">Hospital</option>
                                    <option value="Private Ambulance">Private Ambulance</option>
                                    
                                </Form.Control>
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

                            <Form.Group controlId="formPosition" className="mb-4">
                                <Form.Label style={styles.label}>Your Position</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="position"
                                    value={profile.position}
                                    onChange={handleChange}
                                    placeholder="Enter your Position"
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
                                    isInvalid={!!errors.bloodGroup}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.bloodGroup}
                                </Form.Control.Feedback>
                            </Form.Group>
    
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
    
                            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                                <Button
                                    type="submit"
                                    style={{
                                        ...styles.joinUsButton,
                                        backgroundColor: hoveredButton === 'JOIN' ? '#FFBB37' : 'red',
                                        color: hoveredButton === 'JOIN' ? 'black' : 'white',
                                    }}
                                    onMouseEnter={() => handleMouseEnterButton('JOIN')}
                                    onMouseLeave={handleMouseLeaveButton}
                                >
                                    JOIN US
                                </Button>
                                
                            </div>
                        </Form>
                    </div>
                </div>
            </Container>
        </div>
    );
    
    

};

export default JoinUsScreen;

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
        padding: '8px 30px',
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


// 2a09f1526bebd9b8be0114cd5a4c1f57-us14
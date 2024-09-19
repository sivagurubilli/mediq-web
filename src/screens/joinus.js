// import React, { useState } from 'react';
// import { Container, Form, Button, Col, Alert } from 'react-bootstrap';
// import axios from 'axios';

// const JoinUsScreen = () => {
//     const [hoveredButton, setHoveredButton] = useState(null);
//     const [submitted, setSubmitted] = useState(false);
//     const [avatar, setAvatar] = useState(null); // State to store user's profile picture
//     const [setUploaded] = useState(false); // State to track if picture is uploaded
//     const [email,] = useState('');
//     const [ setMessage] = useState('');

//     const handleMouseEnterButton = (button) => setHoveredButton(button);
//     const handleMouseLeaveButton = () => setHoveredButton(null);

//     const [profile, setProfile] = useState({
//         name: '',
//         mobile: '',
//         service: '',
//         position: '',
//         email: ''
//     });

//     const [errors, setErrors] = useState({
//         name: '',
//         mobile: '',
//         bloodGroup: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProfile({ ...profile, [name]: value });
//         validateField(name, value);
//     };

//     const validateField = (name, value) => {
//         let error = '';
//         switch (name) {
//             case 'name':
//                 if (!/^[A-Za-z\s]+$/.test(value)) {
//                     error = 'Name should only contain alphabets.';
//                 }
//                 break;
//             case 'mobile':
//                 if (!/^\d{10}$/.test(value)) {
//                     error = 'Mobile number should only contain 10 digits.';
//                 }
//                 break;
//             case 'bloodGroup':
//                 if (!/^[A-Za-z+-]+$/.test(value)) {
//                     error = 'Blood group should only contain alphabets, + and - characters.';
//                 }
//                 break;
//             default:
//                 break;
//         }
//         setErrors({ ...errors, [name]: error });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setSubmitted(true);
//         if (Object.values(errors).every(error => error === '') &&
//             Object.values(profile).every(field => field !== '')) {
//             console.log('Profile submitted:', profile);
//             const data = {
//                 email_address: email,
//                 status: 'subscribed'
//             };
//             try {
//                 const response = axios.post(
//                     'https://us14.api.mailchimp.com/3.0/lists/LyfGuard/members',
//                     data,
//                     {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             Authorization: `apikey 2a09f1526bebd9b8be0114cd5a4c1f57-us14`
//                         }
//                     }
//                 );
//                 if (response.status === 200) {
//                     setMessage('Subscription successful!');
//                 }
//             } catch (error) {
//                 if (error.response) {
//                     // The request was made and the server responded with a status code
//                     // that falls out of the range of 2xx
//                     console.log(error.response.data);
//                     console.log(error.response.status);
//                     console.log(error.response.headers);
//                 } else if (error.request) {
//                     // The request was made but no response was received
//                     console.log(error.request);
//                 } else {
//                     // Something happened in setting up the request that triggered an Error
//                     console.log('Error', error.message);
//                 }
//                 setMessage('Subscription failed. Please try again.');
//             }
//         } else {
//             console.log('Please fix the errors before submitting.');
//         }
//     };

//     const handlePictureUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setAvatar(URL.createObjectURL(file)); // Store the URL of the selected file
//             setUploaded(true); // Set uploaded state to true
//         }
//     };

//     const handleRemovePicture = () => {
//         setAvatar(null); // Remove the uploaded picture
//         setUploaded(false); // Set uploaded state to false
//     };

//     const CameraIcon = () => (
//         <img viewBox="0 0 24 24" width="24" height="24"
//         src={require('./assets/camaraicon.png')}
//         alt="Top Right"

//     />
//     );

//     return (
//         <div style={styles.centeredContainer}>
//             <Container fluid style={styles.body}>
//                 <div style={styles.cardContainer}>
//                     <div style={styles.card}>
//                         <img
//                             src={require('./assets/LyfGurad-white-logo.png')}
//                             alt="Top Right"
//                             style={styles.topRightImage}
//                         />

//                             {/* <Col>
//                                 <h1 style={styles.header}>REGISTER</h1>
//                             </Col> */}
//                             <Col xs="auto" style={styles.avatarCol}>
//                                 <div style={styles.avatarContainer}>
//                                     {avatar ? (
//                                         <img src={avatar} alt="Profile Pic" style={styles.avatar} onClick={handleRemovePicture} />
//                                     ) : (
//                                         <div style={styles.defaultAvatar}>
//                                             <CameraIcon style={styles.cameraIcon} />
//                                             <input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 onChange={handlePictureUpload}
//                                                 style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%' }}
//                                             />
//                                         </div>
//                                     )}
//                                 </div>
//                             </Col>

//                         {submitted && Object.values(profile).some(field => field === '') && (
//                             <Alert variant="danger">Please fill out all fields before submitting.</Alert>
//                         )}

//                         <Form onSubmit={handleSubmit}>

//                         <Form.Group controlId="formService" className="mb-4">
//                                 <Form.Label style={styles.label}>Select Service</Form.Label>
//                                 <Form.Control
//                                     as="select"
//                                     name="service"
//                                     value={profile.service}
//                                     onChange={handleChange}
//                                 >
//                                     <option value="">Select Service</option>
//                                     <option value="Hospital">Hospital</option>
//                                     <option value="Private Ambulance">Private Ambulance</option>

//                                 </Form.Control>
//                             </Form.Group>

//                             <Form.Group controlId="formName" className="mb-4">
//                                 <Form.Label style={styles.label}>Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="name"
//                                     value={profile.name}
//                                     onChange={handleChange}
//                                     placeholder="Enter your name"
//                                     isInvalid={!!errors.name}
//                                 />
//                                 <Form.Control.Feedback type="invalid">
//                                     {errors.name}
//                                 </Form.Control.Feedback>
//                             </Form.Group>

//                             <Form.Group controlId="formPosition" className="mb-4">
//                                 <Form.Label style={styles.label}>Your Position</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="position"
//                                     value={profile.position}
//                                     onChange={handleChange}
//                                     placeholder="Enter your Position"
//                                     isInvalid={!!errors.name}
//                                 />
//                                 <Form.Control.Feedback type="invalid">
//                                     {errors.name}
//                                 </Form.Control.Feedback>
//                             </Form.Group>

//                             <Form.Group controlId="formEmail" className="mb-4">
//                                 <Form.Label style={styles.label}>Email</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="email"
//                                     value={profile.email}
//                                     onChange={handleChange}
//                                     placeholder="Enter your email"
//                                     isInvalid={!!errors.bloodGroup}
//                                 />
//                                 <Form.Control.Feedback type="invalid">
//                                     {errors.bloodGroup}
//                                 </Form.Control.Feedback>
//                             </Form.Group>

//                             <Form.Group controlId="formMobile" className="mb-4">
//                                 <Form.Label style={styles.label}>Mobile</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="mobile"
//                                     value={profile.mobile}
//                                     onChange={handleChange}
//                                     placeholder="Enter your mobile number"
//                                     maxLength={10}
//                                     isInvalid={!!errors.mobile}
//                                 />
//                                 <Form.Control.Feedback type="invalid">
//                                     {errors.mobile}
//                                 </Form.Control.Feedback>
//                             </Form.Group>

//                             <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
//                                 <Button
//                                     type="submit"
//                                     style={{
//                                         ...styles.joinUsButton,
//                                         backgroundColor: hoveredButton === 'JOIN' ? '#FFBB37' : 'red',
//                                         color: hoveredButton === 'JOIN' ? 'black' : 'white',
//                                     }}
//                                     onMouseEnter={() => handleMouseEnterButton('JOIN')}
//                                     onMouseLeave={handleMouseLeaveButton}
//                                 >
//                                     JOIN US
//                                 </Button>

//                             </div>
//                         </Form>
//                     </div>
//                 </div>
//             </Container>
//         </div>
//     );

// };

// export default JoinUsScreen;

// const styles = {
//     centeredContainer: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#066951',
//         backgroundImage: `url(${require('./assets/LyfGuardLogo.png')})`,
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: '600px 600px',
//     },
//     body: {
//         width: '100%',
//         maxWidth: '800px', // Adjust as per your design
//     },
//     topRightImage: {
//         position: 'absolute',
//         top: '5%',
//         right: '2%',
//         width: '100px', // Adjust the width as needed
//         height: 'auto',
//         zIndex: 1,
//     },
//     header: {
//         color: 'white',
//         textAlign: 'center',
//     },
//     headerRow: {
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         width: '100%',
//         marginBottom: '20px',
//     },
//     avatarCol: {
//         display: 'flex',
//         justifyContent: 'center',
//     },
//     label: {
//         color: 'white',
//         fontSize: 18,
//     },
//     cardContainer: {
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center', // Center items horizontally
//     },
//     card: {
//         backgroundColor: 'rgba(255, 255, 255, 0.2)',
//         borderRadius: 20,
//         padding: 40,
//         border: '1px solid rgba(255, 255, 255, 0.5)',
//         backdropFilter: 'blur(2px)',
//         width: '100%', // Make the card take full width of the container
//         maxWidth: '600px', // Limit the maximum width of the card
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center', // Center items horizontally
//     },
//     joinUsButton: {
//         fontWeight: 'bold',
//         color: 'white',
//         backgroundColor: 'red',
//         textAlign: 'center',
//         borderRadius: '10px',
//         border: 'none',
//         cursor: 'pointer',
//         padding: '8px 30px',
//         fontSize: '18px',
//         marginTop: '20px',
//     },
//     avatarContainer: {
//         width: '100%',
//         height: 'auto',
//         display: 'flex',
//         justifyContent: 'center',
//         marginBottom: '20px',
//     },
//     avatar: {
//         width: '70px',
//         height: '70px',
//         objectFit: 'cover',
//         cursor: 'pointer',
//         borderRadius: '50%',
//     },
//     defaultAvatar: {
//         width: '70px',
//         height: '70px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#ccc',
//         color: '#fff',
//         fontSize: 60,
//         borderRadius: '50%',
//         cursor: 'pointer',
//     },
// };

// 2a09f1526bebd9b8be0114cd5a4c1f57-

// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import myImage from './assets/th (1).jpeg';
// import Popup from './Popup';
// import { useNavigate } from 'react-router-dom';
// import { FaCheckCircle } from 'react-icons/fa';
// import './joinus.css'

// const Joinus = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phoneNumber: '',
//     email: '',
//     role: '',
//     remarks: '',
//   });

//   const [errors, setErrors] = useState({
//     phoneNumber: '',
//   });
//   const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   const [submissionStatus, setSubmissionStatus] = useState(null);
//   const [validFields, setValidFields] = useState({
//     name: false,
//     phoneNumber: false,
//     email: false,
//     role: false,
//     remarks: false,
//   });

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = {
//       name: formData.name,
//       phoneNumber: formData.phoneNumber,
//       email: formData.email,
//       role: formData.role,
//       remarks: formData.remarks,
//     };

//     try {
//       const response = await fetch('http://localhost:3000/send-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         console.log('Form submitted successfully:', responseData);
//         setSubmissionStatus('success');
//         setShowPopup(true); // Show the popup on successful form submission
//         setTimeout(() => {
//           setShowPopup(false);
//           navigate('/home'); // Navigate to home after popup closes
//         }, 15000); // Adjust time as needed
//       } else {
//         console.error('Form submission failed:', response.statusText);
//         setSubmissionStatus('error');
//         setShowPopup(true);
//         setTimeout(() => {
//           setShowPopup(false);
//         }, 15000);
//       }
//     } catch (error) {
//       console.error('Fetch error:', error.message);
//       setSubmissionStatus('error');
//       setShowPopup(true);
//       setTimeout(() => {
//         setShowPopup(false);
//       }, 15000);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     let isValid = false;
//     if (name === 'phoneNumber') {
//       isValid = /^\d{10}$/.test(value);
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         phoneNumber: isValid ? '' : 'Phone number can only contain digits and must be exactly 10 digits long.',
//       }));
//     } else if (name === 'email') {
//       isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//     } else if (name === 'role') {
//       isValid = value !== '';
//     } else if (name === 'remarks') {
//       isValid = value.length > 0;
//     } else if (name === 'name') {
//       isValid = value.trim().length > 0;
//     }

//     setValidFields((prevValidFields) => ({
//       ...prevValidFields,
//       [name]: isValid,
//     }));
//   };

//   const handleClosePopup = () => setShowPopup(false); // Function to close popup

//   return (

//     <Container className="custom-container">
//       <Row className="no-space justify-content-center">
//         <Col md={6}>
//           <Card className="custom-card">
//             <Card.Body>
//             <h2 className="mb- text-center">Contact Form</h2>
//              <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formName" className="position-relative">
//                   <Form.Label>
//                     Name
//                     <span className="text-danger">*</span>
//                   </Form.Label>
//                   <div className="input-group">
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter your name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="form-control pr-5"
//                     />

//                   </div>
//                 </Form.Group>

//                 <Form.Group controlId="formPhoneNumber" className="position-relative">
//   <Form.Label>
//     Phone Number
//     <span className="text-danger ms-1">*</span>
//   </Form.Label>
//   <div className="input-group">
//     <Form.Control
//       type="tel"
//       placeholder="Enter your phone number"
//       name="phoneNumber"
//       value={formData.phoneNumber}
//       onChange={handleChange}
//       required
//       isInvalid={!!errors.phoneNumber}
//       pattern="[0-9]{10}"
//       maxLength="10"
//       title="Please enter exactly 10 digits."
//       className="form-control pr-5"
//     />
//     <Form.Control.Feedback type="invalid">
//       {errors.phoneNumber}
//     </Form.Control.Feedback>

//   </div>
// </Form.Group>

// <Form.Group controlId="formEmail" className="position-relative">
//   <Form.Label>
//     Email <span className="text-danger">*</span>
//   </Form.Label>
//   <div className="input-group">
//     <Form.Control
//       type="email"
//       placeholder="Enter your email"
//       name="email"
//       value={formData.email}
//       onChange={handleChange}
//       required
//       className="form-control pr-5"
//     />
//   </div>
// </Form.Group>

//                  <Form.Group controlId="formRole" className="position-relative">
//                   <Form.Label>
//                     Role <span className="text-danger">*</span>
//                   </Form.Label>
//                   <div className="input-group">
//                     <Form.Control
//                       as="select"
//                       name="role"
//                       value={formData.role}
//                       onChange={handleChange}
//                       required
//                       className="form-control pr-5"
//                     >
//                       <option value="">------Select Role------</option>
//                       <option value="Private ambulance agent">Private ambulance agent</option>
//                       <option value="Hospital Emergency">Hospital Emergency</option>
//                       <option value="Mortuary">Mortuary</option>
//                     </Form.Control>

//                   </div>
//                 </Form.Group>

//                 <Form.Group controlId="formRemark" className="position-relative">
//                   <Form.Label>
//                     Remark
//                   </Form.Label>
//                   <div className="input-group">
//                     <Form.Control
//                       as="textarea"
//                       rows={2}
//                       placeholder="Enter any remarks"
//                       name="remarks"
//                       value={formData.remarks}
//                       onChange={handleChange}
//                       className="form-control pr-5"
//                     />

//                   </div>
//                 </Form.Group>

//                 <div className="center-button mt-2">
//                   <Button
//                     variant="danger"
//                     type="submit"
//                     className="submit-button"
//                   >
//                     BOOK NOW
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={6}>
//           <img src={myImage} alt="LyfGuard Logo" style={{ width: '100%', height: 'auto' }} />
//         </Col>
//       </Row>
//       <Popup show={showPopup} handleClose={handleClosePopup} />
//     </Container>
//   );
// };

// export default Joinus;
// const styles = {
//     body: {
//       fontFamily: "'Roboto', sans-serif",
//     },
//     container: {
//       backgroundImage: "url('./assets/LyfGuard Logo.png')",
//       backgroundColor: 'rgb(6, 105, 81)',
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       minHeight: '100vh',
//       padding: '2rem',
//       fontFamily: "'Roboto', sans-serif",
//     },
//     row: {
//       marginLeft: 0,
//       marginRight: 0,
//       fontFamily: "'Roboto', sans-serif",
//     },
//     customContainer: {
//       maxWidth: '100vw', // Full viewport width
//       paddingLeft: 0,
//       paddingRight: 0,
//       fontFamily: "'Roboto', sans-serif",
//     },
//     centerButton: {
//       display: 'flex',
//       justifyContent: 'center',
//       width: '100%',
//       fontFamily: "'Roboto', sans-serif",
//     },
//     submitButton: {
//       width: '100%', // Width is 50% of its parent container
//       maxWidth: '300px', // Maximum width
//       fontFamily: "'Roboto', sans-serif",
//     },
//     noSpace: {
//       marginRight: 0,
//       marginLeft: 0,
//       fontFamily: "'Roboto', sans-serif",
//     },
//     noSpaceCol: {
//       paddingRight: 0,
//       paddingLeft: 0,
//       fontFamily: "'Roboto', sans-serif",
//     },
//   };
import React, { useState, useRef, useEffect} from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import myImage from "./assets/Lyfguard-red-logo.png";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";
import "./joinus.css"; // You can still keep this if it contains component-specific styles.
import FooterScreen from './footer';
import FloatingButton from './FloatingButton';
import Navigation from './navbar';

const Joinus = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    role: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({ phoneNumber: "" });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [validFields, setValidFields] = useState({
    name: false,
    phoneNumber: false,
    email: false,
    role: false,
    remarks: false,
  });
  const sliderRef = useRef(null);
    const overViewRef = useRef(null);
    const teamRef = useRef(null);
    const contactRef = useRef(null);
    useEffect(() => {
      if (contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, []);
    

  const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          role: formData.role,
          remarks: formData.remarks,
        };
    
        try {
          const response = await fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (response.ok) {
            const responseData = await response.json();
            console.log('Form submitted successfully:', responseData);
            setSubmissionStatus('success');
            setShowPopup(true); // Show the popup on successful form submission
            setTimeout(() => {
              setShowPopup(false);
              navigate('/home'); // Navigate to home after popup closes
            }, 5000); // Adjust time as needed
          } else {
            console.error('Form submission failed:', response.statusText);
            setSubmissionStatus('error');
            setShowPopup(true);
            setTimeout(() => {
              setShowPopup(false);
            }, 5000);
          }
        } catch (error) {
          console.error('Fetch error:', error.message);
          setSubmissionStatus('error');
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 5000);
        }
      };
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    let isValid = false;
    if (name === "phoneNumber") {
      isValid = /^\d{10}$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: isValid
          ? ""
          : "Phone number can only contain digits and must be exactly 10 digits long.",
      }));
    } else if (name === "email") {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (name === "role") {
      isValid = value !== "";
    } else if (name === "remarks") {
      isValid = value.length > 0;
    } else if (name === "name") {
      isValid = value.trim().length > 0;
    }

    setValidFields((prevValidFields) => ({
      ...prevValidFields,
      [name]: isValid,
    }));
  };

  const handleClosePopup = () => setShowPopup(false);

  return (
    <div style={styles.container} ref={contactRef}>

      <FloatingButton />

      <Navigation
      sliderRef={sliderRef}
      overViewRef={overViewRef}
      teamRef={contactRef}
      contactRef={contactRef}
      />
      <section style={styles.section1}>
        <img
          src={require("./assets/LyfGurad-white-logo.png")} // Replace with your image path
          alt="Top Left"
          style={styles.topLeftImage}
        />
        <h1 style={styles.secheading}>Join Us</h1>
      </section>

    <Container className="custom-joinus-container mt-5 ">
      <Row className="no-space justify-content-center">
        <Col md={6}>
          <Card className="custom-card w-75 mx-auto">
            <Card.Body>
              <h4 className="mb-1 text-center  ">Contact Form</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="position-relative">
                  <Form.Label>
                    Name <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </Form.Group>

                <Form.Group
                  controlId="formPhoneNumber"
                  className="position-relative"
                >
                  <Form.Label>
                    Phone Number <span className="text-danger ms-1">*</span>
                  </Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type="tel"
                      placeholder="Enter your phone number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      isInvalid={!!errors.phoneNumber}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      title="Please enter exactly 10 digits."
                      className="form-control"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phoneNumber}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                <Form.Group controlId="formEmail" className="position-relative">
                  <Form.Label>
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="formRole" className="position-relative">
                  <Form.Label>
                    Role <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="input-group">
                    <Form.Control
                      as="select"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="form-control"
                    >
                      <option value="">Select Role</option>
                      <option value="Private ambulance agent">
                        Private ambulance agent
                      </option>
                      <option value="Hospital Emergency">
                        Hospital Emergency
                      </option>
                      <option value="Mortuary">Mortuary</option>
                    </Form.Control>
                  </div>
                </Form.Group>

                <Form.Group
                  controlId="formRemark"
                  className="position-relative"
                >
                  <Form.Label>Remark</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      as="textarea"
                      rows={1}
                      placeholder="Enter any remarks"
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </Form.Group>

                <div className="center-button mt-2 mx-auto">
                  <Button
                    variant="danger"
                    type="submit"
                    className="submit-button"
                    style={{ width: "auto", maxWidth: "150px" }} // Adjust the maxWidth as needed
                  >
                    BOOK NOW
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <img
            src={myImage}
            alt="LyfGuard Logo"
            style={{ width: "100%", height: "93%" }}
          />
        </Col>
       
      </Row>
      
      <Popup show={showPopup} handleClose={handleClosePopup} />
      
    </Container>
    <FooterScreen />
    </div>
    
  );
};

export default Joinus;

const styles = {
  section1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
    padding: "20px",
    backgroundColor: "#066951",
    backgroundImage: `url(${require("./assets/LyfGuardLogo.png")})`,
    backgroundSize: "auto",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  secheading: {
    color: "white",
    fontSize: "35px",
    marginTop: "5%",
  },
  topLeftImage: {
    position: "absolute",
    top: "15%",
    width: "100px",
    height: "auto",
    zIndex: 1,
  },
  row: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "10px",
    color: "white",
  },
  heading: {
    marginTop: "8%",
    textAlign: "center",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "10px",
    marginTop: 20,
    cursor: "pointer",
  },
  cardsction2: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.2s ease",
    marginTop: "4%",
  },
  teamName: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  teamDescription: {
    fontSize: "14px",
  },
  subteamDescription: {
    fontSize: "12px",
  },
  avatar: {
    height: "80px",
    width: "68px",
    marginBottom: "5%",
  },
  section2Text1: {
    color: "black",
    textAlign: "center",
    marginTop: "2%",
    fontSize: "18px",
    fontWeight: "700",
  },
  section2Text3: {
    color: "#4D4F4D",
    textAlign: "center",
    fontSize: "14px",
  },
};
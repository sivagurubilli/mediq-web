import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { LOGIN_API } from './api';
import { useLocation, useNavigate } from 'react-router-dom';

const OTPScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState(['', '', '', '']);
  const otpInputRef = useRef([null, null, null, null]);

  useEffect(() => {
    if (location.state && location.state.phone) {
      setPhone(location.state.phone);
    }
  }, [location.state]);

  const handleVerifyOTP = async () => {
    if (!phone) {
      console.error('Phone number is missing.');
      alert('Phone number is missing. Please try again.');
      return;
    }

    try {
      const enteredOTP = otp.join('');
      console.log('Sending OTP verification request', { phone, otp: enteredOTP, fcm_token: 'hh' });

      const response = await axios.post(LOGIN_API, { 
        phone, 
        otp: enteredOTP, 
        fcm_token: 'hh' 
      });

       // Log the full response
       console.log('Full API response:', response);

      const token = response.data.data.token;
      localStorage.setItem('token', token);

      setOTP(['', '', '', '']);
      navigate('/services'); // Navigate to the Services page
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        alert(`Error verifying OTP: ${error.response.data.message || 'Please try again.'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('Error verifying OTP: No response from server. Please try again.');
      } else {
        console.error('Error message:', error.message);
        alert('Error verifying OTP: Please try again.');
      }
      console.error('Error config:', error.config);
    }
  };

  const handleOtpInputChange = (value, index) => {
    if (/^\d$/.test(value) || value === '') {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      if (index < 3 && value !== '') {
        otpInputRef.current[index + 1]?.focus();
      } else if (index > 0 && value === '') {
        otpInputRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
        <img
                    src={require('./assets/LyfGurad-white-logo.png')} // Replace with your image path
                    alt="Top Left"
                    style={styles.topLeftImage}
                />
          <h1 style={styles.text}>Enter OTP</h1>
          <div style={styles.otpInputContainer}>
            {[0, 1, 2, 3].map(index => (
              <input
                key={index}
                ref={ref => otpInputRef.current[index] = ref}
                style={styles.otpInput}
                placeholder="-"
                maxLength={1}
                onChange={e => handleOtpInputChange(e.target.value, index)}
                value={otp[index]}
              />
            ))}
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.buttonStyle} onClick={handleVerifyOTP}>
              Verify OTP
            </button>
            <img 
          src={require('./assets/applelogo.png')}
          alt="Apple Logo" style={styles.otherLoginImage} />
          </div>

         
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#066951',
    backgroundImage: `url(${require('./assets/bklyfguardlogo.png')})`,
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  cardContainer: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '20px',
    padding: '15px',
    backdropFilter: 'blur(10px)',
  },
  text: {
    textAlign: 'center',
    margin: '15%',
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'white',
  },
  topLeftImage: {
    position: 'absolute',
    top: '5%',
    right: '3%',
    width: '50px', // Adjust the width as needed
    height: 'auto',
    zIndex: 1,
},
  otpInputContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  otpInput: {
    width: '50px',
    height: '50px',
    border: '2px solid #FFBB37',
    margin: '8px',
    textAlign: 'center',
    color: 'black',
    borderRadius:10
  },
  buttonStyle: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#FFBB37',
    background: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    padding: '8px 20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20%',
    flexDirection:'column'
  },
  otherLoginImage: {
    width: "40%",
    height: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '8%',
  },
};

export default OTPScreen;

import React, { useState } from 'react';
import axios from 'axios';
import { SEND_OTP } from './api';
import { useNavigate } from 'react-router-dom';

const BookingScreen = () => {
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    const phoneRegex = /^[0-9]{10}$/;

    if (!phone) errors.phone = 'Phone number is required';
    else if (!phoneRegex.test(phone)) errors.phone = 'Please enter a valid 10-digit phone number';

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(SEND_OTP, { phone: phone });
        console.log("API Response:", response.data);

        const otp = response.data.otp;

        console.log("Submitted", phone, "OTP:", otp);

        // Clear phone and errors state
        setPhone("");
        setErrors({});

        // Navigate to OTP screen with phone state
        navigate('/otp', { state: { phone: phone } });

      } catch (error) {
        console.error("Error fetching OTP:", error);
        // Handle error as needed
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h1 style={styles.text}>Sign In</h1>
          <p style={styles.subText}>Enter your mobile number</p>
          <div>
            <input
              style={styles.inputStyle}
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={validateForm}
              maxLength={10}
            />
            {errors.phone && <p style={{ ...styles.errorText, animation: 'blink 1s infinite' }}>{errors.phone}</p>}
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.buttonStyle} onClick={handleSubmit}>GET OTP</button>
          </div>
          <a style={styles.bottomText}>Having issues? Click here</a>
          <p style={styles.subBottomText}>Other Login Options</p>
          <img
            src={require('./assets/applelogo.png')}
            alt="Apple Logo" style={styles.otherLoginImage} />
        </div>
      </div>
      <style jsx="true">{`
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#066951',
    backgroundImage: `url(${require('./assets/bklyfguardlogo.png')})`,
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  cardContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 60,
    border: '1px solid rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)',
    textAlign: 'center',
  },
  text: {
    fontSize: "250%",
    fontWeight: 'bold',
    color: 'white',
  },
  subText: {
    fontSize: "150%",
    fontWeight: '300',
    color: 'white',
    marginBottom: '15%',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  buttonStyle: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#FBB040',
    background: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: "120%",
    padding: '8px 20px',
  },
  inputStyle: {
    height: 50,
    border: '1px solid transparent',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: '10%',
    marginLeft: '2%',
    color: 'black',
    borderRadius: 12,
    width: '100%',
    textAlign: 'center',
  },
  errorText: {
    color: 'yellow',
    fontSize: "100%"
  },
  bottomText: {
    marginTop: '18%',
    color: 'white',
    textAlign: 'center',
    fontSize: "100%",
  },
  subBottomText: {
    marginTop: '7%',
    color: 'white',
    textAlign: 'center',
  },
  otherLoginImage: {
    width: "40%",
    height: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '8%',
  },
};

export default BookingScreen;

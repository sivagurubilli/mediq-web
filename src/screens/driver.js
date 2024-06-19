import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { BOOKING_UPDATE } from './api';

const containerStyle = {
  width: '100%',
  height: '430px',
};

const DriverScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { bookingId, selectedButton, noAmbulanceMessage } = state || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [directions, setDirections] = useState(null);
  const [managerPhone, setManagerPhone] = useState(null);
  const [directionsUpdated, setDirectionsUpdated] = useState(false);
  const [updateInterval, setUpdateInterval] = useState(null);
  const [isCanceled, setIsCanceled] = useState(false);

  const updateBooking = useCallback(async () => {
    if (!bookingId || isCanceled) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authorization token not found');
      }

      const url = BOOKING_UPDATE(bookingId);
      console.log('Updating booking details from URL:', url);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response.data;
      if (data && data.booking) {
        setBookingDetails(data.booking);
        setManagerPhone(data.booking.managerPhone || '1234567890');
        calculateRoute(data.booking.route_array, data.booking.user_latitude, data.booking.user_longitude);
      } else {
        console.warn('No data found for the given booking ID');
      }

      // Check if status is either 9 or 10
      if (data.booking && (data.booking.status === 9 || data.booking.status === 10)) {
        setIsCanceled(true); // Set booking as canceled
      } else {
        // Continue refreshing every 30 seconds if status is not 9 or 10
        const intervalId = setInterval(() => {
          updateBooking();
        }, 30000);
        setUpdateInterval(intervalId);
      }
    } catch (error) {
      console.error('Error updating booking details:', error);
    }
  }, [bookingId, isCanceled]);

  useEffect(() => {
    if (!isCanceled) {
      // Start the first update call
      updateBooking();
    }
  }, [isCanceled, updateBooking]);

  useEffect(() => {
    if (bookingDetails) {
      calculateRoute(bookingDetails.route_array, bookingDetails.user_latitude, bookingDetails.user_longitude);
    }
  }, [bookingDetails]);

  useEffect(() => {
    if (!state || noAmbulanceMessage) {
      setModalVisible(true);
    } else {
      updateBooking();
      const initialInterval = setInterval(() => {
        updateBooking();
      }, 15000);
      setUpdateInterval(initialInterval);

      return () => clearInterval(initialInterval);
    }
  }, [state, noAmbulanceMessage, updateBooking]);

  useEffect(() => {
    if (directionsUpdated) {
      clearInterval(updateInterval);
    }
  }, [directionsUpdated, updateInterval]);

  const calculateRoute = (routeArray, userLat, userLng) => {
    if (!routeArray || isCanceled) return;

    const directionsService = new window.google.maps.DirectionsService();
    const waypoints = JSON.parse(routeArray).map(point => ({
      location: new window.google.maps.LatLng(point.latitude, point.longitude),
      stopover: true,
    }));

    const origin = waypoints.shift().location;
    const destination = new window.google.maps.LatLng(userLat, userLng);

    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setDirectionsUpdated(true);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  const handleBackdropClick = () => {
    setModalVisible(false);
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/'); // Change the path to your home screen's path
  };

  const handleCancelBooking = () => {
    if (managerPhone) {
      window.open(`tel:${managerPhone}`);
    } else {
      alert('Manager phone number not available');
    }
    clearInterval(updateInterval);
    setIsCanceled(true);
  };

  const parsedLat = bookingDetails ? parseFloat(bookingDetails.user_latitude) : 0;
  const parsedLng = bookingDetails ? parseFloat(bookingDetails.user_longitude) : 0;
  const isValidLatLng = !isNaN(parsedLat) && !isNaN(parsedLng);

  return (
    <div style={styles.container}>
      {modalVisible ? (
        <>
          <Modal
            open={modalVisible}
            onClose={handleBackdropClick}
            onClick={handleBackdropClick}
          >
            <div style={styles.modalContainer}>
              <div style={styles.modalContent}>
                <h2 style={styles.modalHeading}>Have a Hospital in Mind?</h2>
                <p style={styles.modalSubtext}>{noAmbulanceMessage || 'Do you want to look for your preferred Hospitals or go with any Hospital?'}</p>
                <div style={styles.buttonContainer}>
                  <button style={styles.button} onClick={() => navigate('/YourPreferred')}>SHOW PREFERRED</button>
                  <button style={{ ...styles.button, ...styles.secondaryButton }} onClick={() => navigate('/SelectEmergency')}>BACK TO HOME</button>
                </div>
              </div>
            </div>
          </Modal>
          {!noAmbulanceMessage && (
            <div style={styles.noDataContainer}>
              <h1 style={styles.noDataText}>No Booking details available</h1>
            </div>
          )}
        </>
      ) : (
        <>
          <LoadScript googleMapsApiKey="AIzaSyCLg_Oahf9q1keNmJoqHc_Uk4f0fu3YmxU">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat: isValidLatLng ? parsedLat : 0, lng: isValidLatLng ? parsedLng : 0 }}
              zoom={15}
            >
              {directions && !isCanceled && <DirectionsRenderer directions={directions} />}
              {isValidLatLng && !isCanceled && (
                <Marker position={{ lat: parsedLat, lng: parsedLng }} />
              )}
              {isCanceled && (
                <Marker
                  position={{ lat: parsedLat, lng: parsedLng }}
                  icon={{
                    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>

          <div style={styles.centerSection}>
            <h1 style={styles.title}>{bookingId}</h1>
            <h5 style={styles.subtitle}>{selectedButton}</h5>
            <h6 style={styles.subtitle}>Driver En Route to Location</h6>
          </div>

          <div style={styles.gradient}>
            <div style={styles.statusContainer}>
              {isCanceled ? (
                <>
                  <img src={require('./assets/delete.png')} alt="Booking Cancel" style={styles.statusImage} />
                  <p style={styles.statusText}>Booking Cancel</p>
                </>
              ) : (
                <>
                  <img src={require('./assets/accept.png')} alt="Booking Successful" style={styles.statusImage} />
                  <p style={styles.statusText}>Booking Successful</p>
                </>
              )}
            </div>
            <div style={styles.detailRow}>
              <div style={styles.detailItem}>
                <p>Driver Name:</p>
                <p style={styles.phoneLink}>{isCanceled ? 'Not Available' : bookingDetails?.driverName || 'Not Available'}</p>
              </div>
              <div style={styles.detailItem}>
                <p>Driver Phone:</p>
                <a href={`tel:${isCanceled ? '' : bookingDetails?.driverPhone || ''}`} style={styles.phoneLink}>{isCanceled ? 'Not Available' : bookingDetails?.driverPhone || 'Not Available'}</a>
              </div>
            </div>
            <div style={styles.detailRow}>
              <div style={styles.detailItem}>
                <p>Branch Name:</p>
                <p style={styles.phoneLink}>{isCanceled ? 'Not Available' : bookingDetails?.branchName || 'Not Available'}</p>
              </div>
              <div style={styles.detailItem}>
                <p>Branch Phone:</p>
                <p style={styles.phoneLink}>{isCanceled ? 'Not Available' : bookingDetails?.branchPhone || 'Not Available'}</p>
              </div>
            </div>
            <div style={styles.detailRow}>
              <div style={styles.detailItem}>
                <p>Ambulance Number:</p>
                <p style={styles.phoneLink}>{isCanceled ? 'Not Available' : bookingDetails?.vehicle_number || 'Not Available'}</p>
              </div>
              <div style={styles.detailItem}>
                <p>Ambulance Type:</p>
                <p style={styles.phoneLink}>{isCanceled ? 'Not Available' : bookingDetails?.ambulanceTypeName || 'Not Available'}</p>
              </div>
            </div>
            <div style={styles.bottomContainer}>
              {isCanceled ? (
                <>
                  <p style={styles.bottomtitle}>Your booking has been canceled Successfully !!</p>
                  <button style={styles.backtohomebutton} onClick={handleBackToHome}>
                    BACK TO HOME
                  </button>
                </>
              ) : (
                <>
                  <p style={styles.bottomtitle}>Booked by mistake or change of plans?</p>
                  <button style={styles.cancelbutton} onClick={handleCancelBooking}>
                    CANCEL BOOKING
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#D3FFD8',
    minHeight: '100vh'
  },
  centerSection: {
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'red',
    margin: '3%'
  },
  subtitle: {
    color: 'green',
    fontSize: '20px',
    margin: '3%'
  },
  gradient: {
    background: 'linear-gradient(to right, #FFFFFF, #FFFFFF)',
    borderRadius: 15,
    width: '80%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '3%'
  },
  detailContainer: {
    width: '100%',
    fontSize: '18px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px'
  },
  detailItem: {
    flexDirection: 'column',
    marginRight: '30px',
  },
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    textAlign: 'center',
    width: '80%',
    maxWidth: 500,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
  },
  modalSubtext: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    textAlign: 'center',
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  secondaryButton: {
    backgroundColor: 'red',
  },
  noDataContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  noDataText: {
    color: 'red',
  },
  phoneLink: {
    color: 'red',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bottomtitle: {
    fontSize: '18px',
    textAlign: 'center',
  },
  cancelbutton: {
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    marginBottom: '2%'
  },
  backtohomebutton: {
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    marginBottom: '2%'
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  statusImage: {
    width: '40px', // Adjust size as needed
    height: '40px', // Adjust size as needed
    marginRight: '10px', // Space between image and text
  },
  statusText: {
    marginTop: '20px',
    fontSize: '25px',
    fontWeight: 'bold',
  },
};

export default DriverScreen;

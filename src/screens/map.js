import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import Geocode from 'react-geocode';
import { EMERGENCY_BOOK, BOOKING_BY_BOOKINGID, CANCEL_BOOKING } from './api';
import { useLocation, useNavigate } from 'react-router-dom';

Geocode.setApiKey('AIzaSyCLg_Oahf9q1keNmJoqHc_Uk4f0fu3YmxU'); // Replace with your actual API key

const containerStyle = {
  width: '100%',
  height: '100vh',
  marginRight: '2%',
};

const libraries = ['places'];

const MapScreen = () => {
  const location = useLocation();
  const { selectedButton, typeId } = location.state || { selectedButton: 'Emergency', typeId: null };
  const navigate = useNavigate();

  const [region, setRegion] = useState({
    lat: 12.971599,
    lng: 77.594566,
    zoom: 15,
  });

  const [markerPosition, setMarkerPosition] = useState({
    lat: 12.971599,
    lng: 77.594566,
  });

  const [currentAddress, setCurrentAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [bookingId, setBookingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [intervalActive, setIntervalActive] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(null); // New state to control the second interval
  const [isCanceled, setIsCanceled] = useState(false); 

  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  let interval;

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (bookingId && intervalActive && !isCanceled) {
      interval = setInterval(() => {
        fetchBookingDetails();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [bookingId, intervalActive, isCanceled]);

  useEffect(() => {
    console.log('Selected Address:', currentAddress);
  }, [currentAddress]);

  useEffect(() => {
    let interval;
    if (loading && timer > 0 && !isCanceled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setLoading(false);
      setIntervalActive(false);
      if (!bookingId || showModal) {
        setShowModal(true);
      }
    }
    return () => clearInterval(interval);
  }, [loading, timer, isCanceled]);

  useEffect(() => {
    if (bookingId && refreshInterval && !isCanceled) {
      interval = setInterval(() => {
        fetchBookingDetails();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [bookingId, refreshInterval, isCanceled]);

  // const getUserLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setRegion({
  //           lat: latitude,
  //           lng: longitude,
  //           zoom: 15,
  //         });
  //         setMarkerPosition({
  //           lat: latitude,
  //           lng: longitude,
  //         });
  //         fetchAddress(latitude, longitude).then(address => setCurrentAddress(address));
  //       },
  //       (error) => {
  //         console.error(error);
  //         setCurrentAddress('Error fetching location');
  //       }
  //     );
  //   } else {
  //     console.log('Geolocation is not supported by this browser.');
  //   }
  // };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setRegion({
            lat: latitude,
            lng: longitude,
            zoom: 15,
          });
          setMarkerPosition({
            lat: latitude,
            lng: longitude,
          });
          fetchAddress(latitude, longitude).then((address) => setCurrentAddress(address));
        },
        (error) => {
          console.error(error);
          setCurrentAddress('Error fetching location');
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };
  

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await Geocode.fromLatLng(latitude, longitude);
      const address = response.results[0].formatted_address;
      return address;
    } catch (error) {
      console.error(error);
      return 'Error fetching address';
    }
  };

  const onMarkerDragEnd = (e) => {
    const newMarkerPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setRegion({
      lat: newMarkerPosition.lat,
      lng: newMarkerPosition.lng,
      zoom: 15,
    });
    setMarkerPosition(newMarkerPosition);
    fetchAddress(newMarkerPosition.lat, newMarkerPosition.lng).then(address => setCurrentAddress(address));
  };

  const setCurrentLocationAddress = async () => {
    if (isCanceled) return; // Stop if canceled

    try {
      setLoading(true);
      setIntervalActive(true); // Ensure interval is active
      const { booking, ambulance } = await fetchEmergencyBooking(
        markerPosition.lat,
        markerPosition.lng,
        typeId,
        typeId ? undefined : 1
      );

      console.log('Booking response:', booking);
      console.log('Ambulance response:', ambulance);

      if (booking && booking.booking_id) {
        setBookingId(booking.booking_id);
        console.log('Booking ID set:', booking.booking_id);
      } else {
        throw new Error('No booking ID received');
      }

      setTimeout(() => {
        if (isCanceled) return; // Stop if canceled
        setLoading(false);
        setIntervalActive(false); // Stop interval after 2 minutes
        if (booking.status === 3) {
          setRefreshInterval(true); // Start the 30-second interval after status 3
          navigate('/driver', {
            state: {
              bookingId: booking.booking_id,
              driverName: ambulance.driverName,
              driverPhone: ambulance.driverPhone,
              vehicleNumber: ambulance.vehicle_number,
              emergencyTypeName: ambulance.emergencyTypeName,
              selectedButton: selectedButton,
            }
          });
        } else {
          console.log('Booking is stopped');
          setShowModal(true); // Display modal after 2 minutes if still processing
        }
      }, 120000);
    } catch (error) {
      if (isCanceled) return; // Stop if canceled
      setLoading(false);
      setIntervalActive(false); // Stop interval on error
      if (error.message === 'No ambulances available') {
        navigate('/driver', { state: { noAmbulanceMessage: 'No ambulances available. Please try again later.' } });
      } else {
        console.error('Error setting current location address:', error);
        alert('Error', 'Failed to set current location address.');
      }
    }
  };

  const fetchEmergencyBooking = async (latitude, longitude, typeId, branchId) => {
    if (isCanceled) return; // Stop if canceled
    try {
      const token = localStorage.getItem('token');
      const url = EMERGENCY_BOOK;
      const response = await axios.post(url, {
        latitude,
        longitude,
        emergency_type_id: typeId,
        branch_id: branchId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Emergency booking response:', response.data);

      const { data } = response.data;
      if (!data) {
        throw new Error('No data found in response');
      }

      const { booking, ambulances } = data;
      if (!ambulances || !ambulances.length) {
        throw new Error('No ambulances available');
      }

      const ambulance = ambulances[0];

      return { booking, ambulance };
    } catch (error) {
      console.error('Error fetching emergency booking:', error);
      throw error;
    }
  };

  const onPlaceChanged = () => {
    if (isCanceled) return; // Stop if canceled
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const newMarkerPosition = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setRegion({
        lat: newMarkerPosition.lat,
        lng: newMarkerPosition.lng,
        zoom: 15,
      });
      setMarkerPosition(newMarkerPosition);
      fetchAddress(newMarkerPosition.lat, newMarkerPosition.lng).then(address => setCurrentAddress(address));
    }
  };

  const fetchBookingDetails = async () => {
    if (!bookingId || isCanceled) return; // Stop if canceled

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authorization token not found');
      }

      const url = BOOKING_BY_BOOKINGID(bookingId);
      console.log('Fetching booking details from URL:', url);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response.data;

      if (data && data.booking) {
        const booking = data.booking;
        if (booking.booking_id) {
          if (booking.status === 3) {
            setLoading(false);
            setIntervalActive(false); // Stop interval on success
            setRefreshInterval(true); // Start the 30-second interval after status 3
            navigate('/driver', {
              state: {
                bookingId: booking.booking_id,
                driverName: booking.driverName,
                driverPhone: booking.driverPhone,
                vehicleNumber: booking.vehicle_number,
                emergencyTypeName: booking.emergencyTypeName,
                selectedButton: selectedButton,
              }
            });
          } else if (booking.status === 2) {
            console.log('Booking is stopped');
          } else if (booking.status === 8 || booking.status === 10) {
            setShowModal(true);
            setIntervalActive(false); // Stop interval on cancellation
          }else if (booking.status === 9) {
            console.log('Booking status is 9, stopping requests.');
            setIntervalActive(false); // Stop interval on status 9
          } 
           else {
            console.warn('Unknown status:', booking.status);
          }
        } else {
          console.error('API response does not contain booking_id');
        }
      } else {
        console.warn('No data found for the given booking ID');
      }
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimer(120);
    setBookingId(null);
  };

  const handleCancelBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = CANCEL_BOOKING;
      const response = await axios.post(
        url,
        {
          booking_id: bookingId,
          reason: 'Test'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Cancel booking response:', response.data);
      const canceledBookingId = response.data.booking_id; // Extract the booking ID from the response
      console.log('Canceled Booking ID:', canceledBookingId); // Print the canceled booking ID
      console.log('Booking Cancel Successfuly');
      setLoading(false);
      setIntervalActive(false);
      setShowModal(false);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel the booking. Please try again.');
    }
  };
  

  return (
    <div style={styles.container}>
      {loading && (
        <div style={styles.loader}>
          <div style={styles.loaderText}>Loading... {timer}s</div>
          <div style={styles.progressBarContainer}>
            <div style={{ ...styles.progressBar, width: `${((120 - timer) / 120) * 100}%` }}></div>
          </div>
          <button
            style={{ ...styles.cancelbutton, ...styles.secondaryButton }}
            onClick={handleCancelBooking}
          >
            CANCEL BOOKING
          </button>
        </div>
      )}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span style={styles.close} onClick={handleCloseModal}>&times;</span>
            <p>Booking has been cancelled. Please try again.</p>
            <div style={styles.buttonContainer}>
              <button style={styles.modelbutton} onClick={() => navigate('/YourPreferred')}>SHOW PREFERRED</button>
              <button style={{ ...styles.modelbutton, ...styles.secondaryButton }} onClick={handleCancelBooking}>BACK TO HOME</button>
            </div>
          </div>
        </div>
      )}
      <div style={styles.header}>
        <h1 style={styles.title}>{selectedButton}</h1>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyCLg_Oahf9q1keNmJoqHc_Uk4f0fu3YmxU" libraries={libraries}>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search location"
            value={currentAddress}
            style={styles.searchInput}
            onChange={(e) => setCurrentAddress(e.target.value)}
          />
        </Autocomplete>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={region}
          zoom={region.zoom}
          onClick={(e) => onMarkerDragEnd(e)}
        >
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={(e) => onMarkerDragEnd(e)}
          />
        </GoogleMap>
      </LoadScript>
      <div style={styles.buttonStyle}>
        <button onClick={setCurrentLocationAddress} style={styles.button} disabled={loading}>
          SELECT ADDRESS
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'black',
    position: 'relative',
  },
  header: {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    padding: '20px 0',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
  },
  searchInput: {
    width: '60%',
    padding: '10px',
    margin: '10px auto',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    display: 'block',
  },
  buttonStyle: {
    marginTop: '3%',
    marginLeft: '3%',
    marginRight: '3%',
    marginBottom: '3%',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  loaderText: {
    color: 'white',
    fontSize: '24px',
    marginBottom: '20px',
  },
  progressBarContainer: {
    width: '80%',
    height: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'red',
    transition: 'width 1s linear',
  },
  cancelbutton: {
    borderRadius: 8,
    padding: 15,
    margin: 10,
    textAlign: 'center',
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  modal: {
    display: 'block',
    position: 'fixed',
    zIndex: '1',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
  },
  close: {
    color: '#aaaaaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  modelbutton: {
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
};

export default MapScreen;

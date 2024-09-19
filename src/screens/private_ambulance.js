import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, DirectionsRenderer, Marker } from '@react-google-maps/api';
import axios from 'axios';

const libraries = ['places'];
const apiKey = 'AIzaSyCLg_Oahf9q1keNmJoqHc_Uk4f0fu3YmxU'; // Replace with your actual API key

const PrivateAmbulance = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [distance, setDistance] = useState(0);
  const [directions, setDirections] = useState(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState('Basic');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Offline');
  const [currentLocation, setCurrentLocation] = useState(null);

  const fromRef = useRef(null);
  const toRef = useRef(null);

  const getDirections = useCallback(async () => {
    if (!from || !to) return;
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&key=${apiKey}`);
      if (response.data.status === 'OK') {
        const routes = response.data.routes[0];
        const legs = routes.legs[0];
        setDistance(legs.distance.value / 1000); // Convert meters to kilometers
        setDirections(response.data);
      } else {
        console.error('Error fetching directions:', response.data.status);
      }
    } catch (error) {
      console.error('Network Error:', error);
    }
  }, [from, to]);

  const getGeocodeAddress = useCallback(async (location) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`);
      if (response.data.status === 'OK') {
        const address = response.data.results[0].formatted_address;
        setFrom(address);
      } else {
        console.error('Error fetching address:', response.data.status);
      }
    } catch (error) {
      console.error('Network Error:', error);
    }
  }, []);

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          console.log('Current location obtained:', location); // Debugging step
          setCurrentLocation(location);
          getGeocodeAddress(location);
        },
        error => {
          console.error('Error getting current location:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [getGeocodeAddress]);

  useEffect(() => {
    console.log('Requesting current location...');
    getCurrentLocation();
  }, [getCurrentLocation]);

  useEffect(() => {
    getDirections();
  }, [from, to, getDirections]);

  const handleBooking = () => {
    console.log('Book Now button pressed!');
    // Implement booking logic here
  };

  const handlePlaceChanged = (type) => {
    const place = type === 'from' ? fromRef.current.getPlace() : toRef.current.getPlace();
    if (place && place.formatted_address) {
      if (type === 'from') {
        setFrom(place.formatted_address);
      } else {
        setTo(place.formatted_address);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <div style={styles.container}>
        <h1 className="text-center my-4">Patient</h1>
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex flex-column flex-lg-row">
              <div className="col-lg-6 col-md-12">
                <div className="mb-3">
                  <div className="row mb-3">
                    <div className="col">
                      <Autocomplete
                        onLoad={ref => (fromRef.current = ref)}
                        onPlaceChanged={() => handlePlaceChanged('from')}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Source Address"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                        />
                      </Autocomplete>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <Autocomplete
                        onLoad={ref => (toRef.current = ref)}
                        onPlaceChanged={() => handlePlaceChanged('to')}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Destination Address"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                        />
                      </Autocomplete>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div style={styles.mapContainer}>
                      <GoogleMap
                        key={currentLocation ? `${currentLocation.lat},${currentLocation.lng}` : 'default'}
                        mapContainerStyle={styles.mapStyle}
                        center={currentLocation || { lat: 0, lng: 0 }}
                        zoom={currentLocation ? 16 : 2}
                        onLoad={map => {
                          if (currentLocation) {
                            map.panTo(currentLocation);
                          }
                        }}
                      >
                        {currentLocation && <Marker position={currentLocation} />}
                        {directions && <DirectionsRenderer directions={directions} />}
                      </GoogleMap>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Total Distance :</span>
                      <span>{distance.toFixed(2)} km</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h5>Amenities</h5>
                    <div className="d-flex">
                      <button className={`btn ${selectedVehicleType === 'Oxygen' ? 'btn-danger' : 'btn-secondary'}`} onClick={() => setSelectedVehicleType('Oxygen')}>Oxygen</button>
                      <button className={`btn ml-2 ${selectedVehicleType === 'ICU' ? 'btn-danger' : 'btn-secondary'}`} onClick={() => setSelectedVehicleType('ICU')}>ICU</button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="vehicleType">Choose your vehicle</label>
                    <select className="form-control" id="vehicleType" value={selectedVehicleType} onChange={(e) => setSelectedVehicleType(e.target.value)}>
                      <option value="Basic">Basic</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="paymentMode">Payment Mode</label>
                    <select className="form-control" id="paymentMode" value={selectedPaymentMode} onChange={(e) => setSelectedPaymentMode(e.target.value)}>
                      <option value="Offline">Offline</option>
                      <option value="Online">Online</option>
                    </select>
                  </div>

                  <div className="mt-3">
                    <div className="d-flex justify-content-between">
                      <span>Total Amount:</span>
                      <span>{(distance * 10).toFixed(2)} Rs</span>
                    </div>
                  </div>

                  <button className="btn btn-danger btn-block mt-3" onClick={handleBooking}>BOOK NOW</button>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#066951',
    backgroundImage: `url(${require('./assets/LyfGuardLogo.png')})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '600px 600px',
    padding: 20,
  },
  mapContainer: {
    width: '100%',
    height: '350px',
    marginRight: '2%',
  },
  mapStyle: {
    height: '100%',
    width: '100%',
  },
};

export default PrivateAmbulance;

import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, StandaloneSearchBox } from '@react-google-maps/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdCurrencyRupee } from 'react-icons/md';
import Basicimg from '../screens/assets/th.jpeg'; // Adjust the path to your actual image location
import freezerimg from '../screens/assets/Freezer.jpeg'; // Adjust the path to your actual image location
import advanceimg from '../screens/assets/Advance.jpeg';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './googlemap.css';
import styled from 'styled-components';

const libraries = ['places'];
const containerStyle = { width: '100%', height: '400px' };

const initialCenter = { lat: 0, lng: 0 }; // Use appropriate default coordinates
const ambulanceAmounts = {
  "Basic": 1000,
  "Freezer": 1500,
  "Advance": 2000,
};

function MapComponent() {
  const [sourcePosition, setSourcePosition] = useState(initialCenter);
  const [destinationPosition, setDestinationPosition] = useState(null);
  const [directions, setDirections] = useState(null);
  const [totalDistance, setTotalDistance] = useState('');
  const [totalDuration, setTotalDuration] = useState('');
  const [sourceInput, setSourceInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [searchBoxSource, setSearchBoxSource] = useState(null);
  const [searchBoxDestination, setSearchBoxDestination] = useState(null);
  const [ambulanceType, setAmbulanceType] = useState('');
  const [ammunitiesType, setAmmunitiesType] = useState('');
  const navigate = useNavigate();

  // Function to show alert and fetch current location
  const showAlertAndFetchLocation = () => {
    alert('Welcome to the Map Page! Click "Allow" to fetch your current location.');
  
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try{
          const { latitude, longitude } = position.coords;
          setSourcePosition({ lat: latitude, lng: longitude });
  
          // Geocode the coordinates to get the address
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
              const address = results[0].formatted_address;
              setSourceInput(address);
              console.log(`Location obtained: ${latitude}, ${longitude}`);
              console.log(`Address obtained: ${address}`);
            } else {
              console.error('Error fetching address:', status);
              setSourceInput('Address not found');
            }
          });
        } catch (error) {
          console.error('Error fetching geocode or address:', error.message);
        }
      },
        (error) => {
          console.error('Error fetching current location:', error.message);
          handleLocationError(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by this browser.');
    }
  };
  
const AmbulanceItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  margin: 5px 0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-decoration: none;
  color: #000;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &.active {
    background-color: #007bff;
    color: #fff;
  }
`;

const AmbulanceImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
   margin-bottom: 5px; /* Space below the image */
`;

const AmountText = styled.p`
  font-size: 14px;
  margin: 0;
  display: flex;
  align-items: center;
`;

const TotalDurationText = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
  margin-bottom: 5px; /* Space below the duration text */
`;

  const handleLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation. Please enable location services and refresh the page.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable. Please try again later.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out. Please try again.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred while trying to get location. Please try again.");
        break;
    }
  };

  useEffect(() => {
    showAlertAndFetchLocation();
  }, []);

  useEffect(() => {
    if (sourcePosition && destinationPosition) {
      try {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: sourcePosition,
          destination: destinationPosition,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);

            const route = result.routes[0];
            const totalDistance = route.legs[0].distance.text;
            const totalDuration = route.legs[0].duration.text;

            setTotalDistance(totalDistance);
            setTotalDuration(totalDuration);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }catch (error) {
      console.error('Error fetching directions:', error.message);
    }
  }
  }, [sourcePosition, destinationPosition]);

  const onLoadSource = useCallback((ref) => setSearchBoxSource(ref), []);
  const onLoadDestination = useCallback((ref) => setSearchBoxDestination(ref), []);

  const onSourceDragEnd = (event) => {
    const newPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setSourcePosition(newPosition);
  };

  const onDestinationDragEnd = (event) => {
    const newPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setDestinationPosition(newPosition);
  };

  const handlePlaceChange = (place, type) => {
    if (place && place.geometry && place.geometry.location) {
      const location = place.geometry.location;
      if (type === 'source') {
        setSourcePosition({ lat: location.lat(), lng: location.lng() });
        setSourceInput(place.formatted_address);
      } else if (type === 'destination') {
        setDestinationPosition({ lat: location.lat(), lng: location.lng() });
        setDestinationInput(place.formatted_address);
      }
    } else {
      console.warn(`No valid ${type} place found.`);
    }
  };

  const onSourcePlacesChanged = () => {
    if (searchBoxSource) {
      const places = searchBoxSource.getPlaces();
      if (places && places.length > 0) {
        handlePlaceChange(places[0], 'source');
      } else {
        console.warn('No source place found.');
      }
    }
  };

  const onDestinationPlacesChanged = () => {
    if (searchBoxDestination) {
      const places = searchBoxDestination.getPlaces();
      if (places && places.length > 0) {
        handlePlaceChange(places[0], 'destination');
      } else {
        console.warn('No destination place found.');
      }
    }
  };

  const handleAmbulanceTypeClick = (type) => {
    if (!sourceInput || !destinationInput || !ammunitiesType) {
      alert("Please fill out the source address, destination address, and ammunities before selecting an ambulance type.");
      return;
    }

    setAmbulanceType(type);

    const formData = {
      sourceInput,
      destinationInput,
      ambulanceType: type,
      ammunitiesType,
      totalDistance,
      totalDuration,
      sourcePosition,
      destinationPosition,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    navigate('/basic-ambulance');
  };
  return (
    <LoadScript googleMapsApiKey="AIzaSyCLg_Oahf9q1keNmJoqHc_Uk4f0fu3YmxU" libraries={['places']}>
    <div className="map-background">
      {/* Apply the background styles here */}
      <div className="map-container container-fluid p-0">
        <div className="row g-0 flex-lg-row-reverse flex-column-reverse flex-sm-column">
          {/* Map Column for Android (first column on smaller screens) */}
          <div className="col-lg-6 col-12 mt-3 order-1 order-lg-2">
          <StandaloneSearchBox onLoad={onLoadSource} onPlacesChanged={onSourcePlacesChanged}>
              <input
                type="text"
                placeholder="Enter source address"
                value={sourceInput}
                onChange={(e) => setSourceInput(e.target.value)}
                className="form-control mb-3"
                style={{ fontSize: '14px' }}
              />
            </StandaloneSearchBox>
            <StandaloneSearchBox onLoad={onLoadDestination} onPlacesChanged={onDestinationPlacesChanged}>
              <input
                type="text"
                placeholder="Enter destination address"
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                className="form-control mb-3"
                style={{ fontSize: '14px' }}
              />
            </StandaloneSearchBox>

            <div className="d-flex justify-content-between bg-light p-2" style={{ borderRadius: '0.30rem' }}>
              <p className="me-3 mb-0" style={{ fontSize: '14px' }}>Total Distance</p>
              <p className="mb-0" style={{ fontSize: '14px' }}>{totalDistance || ""} km</p>
            </div>

            <Form className="mt-2">
              <Form.Group controlId="AmmunitiesType">
                <select
                  className="form-select"
                  value={ammunitiesType}
                  onChange={(e) => setAmmunitiesType(e.target.value)}
                  required
                  style={{ fontSize: '14px' }}
                >
                  <option value="">Select an Ammunities</option>
                  <option value="1">Ac van</option>
                  <option value="2">Ice van</option>
                </select>
                <Form.Control.Feedback type="invalid" style={{ fontSize: '14px' }}>
                  Please select an Ammunities.
                </Form.Control.Feedback>
              </Form.Group>
            </Form>

            <Form className="mt-3 bg-white custom-form" style={{ borderRadius: '2px', overflow: 'hidden' }}>
              {Object.keys(ambulanceAmounts).map((type) => (
                <AmbulanceItem
                  href="#"
                  className={`ambulance-item ${ambulanceType === type ? "active" : ""}`}
                  onClick={() => handleAmbulanceTypeClick(type)}
                  key={type}
                >
                  <AmbulanceImage
                    src={type === "Basic" ? Basicimg : type === "Freezer" ? freezerimg : advanceimg}
                    alt={type}
                  />
                  <p className="mb-0" style={{ fontSize: '14px' }}>{type} Ambulance</p>
                  <AmountText className="me-4">
                    <MdCurrencyRupee className="me-1" />
                    {ambulanceAmounts[type]}
                  </AmountText>
                </AmbulanceItem>
              ))}
            </Form>
          </div>

          {/* Input Fields Column */}
          <div className="col-lg-6 col-12 d-flex flex-column p-3 order-2 order-lg-1">
          <GoogleMap mapContainerStyle={containerStyle} center={sourcePosition} zoom={14}>
              <Marker position={sourcePosition} draggable={true} onDragEnd={onSourceDragEnd} />
              {destinationPosition && (
                <Marker position={destinationPosition} draggable={true} onDragEnd={onDestinationDragEnd} />
              )}
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
           
          </div>
        </div>
      </div>
    </div>
  </LoadScript>
  );
}

export default MapComponent;

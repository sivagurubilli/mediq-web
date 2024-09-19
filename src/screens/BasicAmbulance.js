import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdCurrencyRupee } from 'react-icons/md';
import Basicimg from '../screens/assets/th.jpeg';
import freezerimg from '../screens/assets/Freezer.jpeg';
import advanceimg from '../screens/assets/Advance.jpeg';
import { Card, Form, Button } from 'react-bootstrap';
import './BasicAmbulance.css'; // Import the CSS file

const containerStyle = { width: '100%', height: '100%' };
const libraries = ['places'];

const ambulanceAmounts = {
  Basic: 1000,
  Freezer: 2000,
  Advance: 3000,
};
const amenityNames = {
  1: 'AC Van',
  2: 'Ice Van',
  3: 'Basic Van',
  // Add other mappings as needed
};


function BasicAmbulance() {
  const [formData, setFormData] = useState(null);
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  const handleScriptLoad = () => {
    setMapsLoaded(true);
  };

  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      setFormData(parsedFormData);

      if (parsedFormData.sourcePosition && parsedFormData.destinationPosition) {
        if (mapsLoaded) {
          try {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
              {
                origin: parsedFormData.sourcePosition,
                destination: parsedFormData.destinationPosition,
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                  setDirections(result);
                } else {
                  console.error(`Error fetching directions: ${status}`);
                }
                setLoading(false);
              }
            );
          } catch (error) {
            console.error('An unexpected error occurred:', error);
            setLoading(false);
          }
        } else {
          console.error('Google Maps API is not loaded.');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [mapsLoaded]);

  if (loading) {
    return <p className="font-size-small">Loading...</p>;
  }

  if (!formData) {
    return <p className="font-size-small">No form data found.</p>;
  }

  const getAmbulanceImage = () => {
    switch (formData.ambulanceType) {
      case 'Basic':
        return Basicimg;
      case 'Freezer':
        return freezerimg;
      case 'Advance':
        return advanceimg;
      default:
        return null;
    }
  };

  return (
    <div className="map-background">
      <div className="container-fluid">
        <div className="row">
          {/* Map Section */}
          <div className="col-lg-6 col-12 mt-0 order-1 order-lg-2">
            <div className="sticky-map">
              <LoadScript 
                googleMapsApiKey="AIzaSyCLg_Oahf9q1keNmJoqHc_Uk4f0fu3YmxU" 
                libraries={libraries} 
                onLoad={handleScriptLoad}
              >
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={formData.sourcePosition}
                  zoom={14}
                >
                  <Marker position={formData.sourcePosition} />
                  <Marker position={formData.destinationPosition} />
                  {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>

          {/* Details Section */}
          <div className="col-lg-6 col-12 d-flex flex-column p-3 order-2 order-lg-1">
            {/* Replace MainHeader with ambulance image and type */}
            <div className=' image mb-3 d-flex align-items-center'>
              <img
                src={getAmbulanceImage()}
                alt={formData.ambulanceType}
                style={{ width: '50px', height: '50px', marginRight: '10px' }}
              />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                {formData.ambulanceType}
              </h3>
            </div>

            <Card className="styled-card mb-3 w-100 mt-3">
              <Card.Body className="card-content">
                <div className="card-item">
                  <strong className="key">PICKUP</strong>
                  <span className="datapickup">{formData.sourceInput}</span>
                </div>
                <div className="card-item">
                  <strong className="key">DROP</strong>
                  <span className="datadrop">{formData.destinationInput}</span>
                </div>
                <div className="card-item">
                  <strong className="key">Amenity</strong>
                  <span className="dataamenity">
                    {amenityNames[formData.ammunitiesType] || 'Unknown'}
                  </span>
                </div>
                <div className="card-item">
                  <strong className="key">FARE</strong>
                  <span className="datafare">
                    <MdCurrencyRupee />
                    {ambulanceAmounts[formData.ambulanceType]}
                  </span>
                </div>
              </Card.Body>
            </Card>

            <Card className="styled-card mb-3 w-100">
              <Card.Body className="w-100">
                <Form.Group controlId="paymentMethod" className="mb-3 d-flex align-items-center w-100">
                  <Form.Label className="styled-form-label me-3 mb-0 mr-3">
                    <strong>PAY BY</strong>
                  </Form.Label>
                  <Form.Control as="select" className="styled-form-control custom-select-no-border" style={{ flex: '1' }}>
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="couponCode" className="mb-3 d-flex align-items-center w-100">
                  <Form.Label className="styled-form-label me-2">
                    <strong> COUPON </strong>
                  </Form.Label>
                  <div className="input-group flex-grow-1">
                    <Form.Control
                      type="text"
                      placeholder="Enter coupon code"
                      aria-label="Coupon Code"
                      aria-describedby="applyCouponButton"
                      className="styled-form-control"
                    />
                    <Button id="applyCouponButton" className="styled-button bg-danger">
                      Apply
                    </Button>
                  </div>
                </Form.Group>
              </Card.Body>
            </Card>

            <div className="row justify-content-center">
              {/* Adjust column size for different screen sizes */}
              <div className="col-md-6 col-sm-8 col-10 d-flex justify-content-center">
                <Button
                  variant="danger"
                  type="submit"
                  className="submit-button w-50"
                >
                  BOOK NOW
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicAmbulance;

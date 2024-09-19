import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import FooterScreen from "./footer";
import FloatingButton from "./FloatingButton";
import "bootstrap/dist/css/bootstrap.min.css";
import './Aboutus.css';
import { AiFillCustomerService } from "react-icons/ai";
import { MdOutlineSecurity } from "react-icons/md";
import { GiMassDriver } from "react-icons/gi";
import Navigation from './navbar';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};
const libraries = ["places"];

const Contactus = () => {
  const [hoveredStates, setHoveredStates] = useState([false, false, false]);
  const [selectedSection, setSelectedSection] = useState("user");
  const [currentPosition, setCurrentPosition] = useState(null);
  const [directions, setDirections] = useState(null);
  const [formData, setFormData] = useState({
    sourcePosition: { lat: 37.7749, lng: -122.4194 }, // Example source position
    destinationPosition: { lat: 37.7749, lng: -122.4194 }, // Example destination position
  });

  const sliderRef = useRef(null);
  const overViewRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);

  const location = useLocation();
  const handleScriptLoad = () => {
  // Add any logic you want to execute when the Google Maps script is loaded
  console.log("Google Maps script loaded");
};
useEffect(() => {
  if (contactRef.current) {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, []);



  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");
    if (section === "contact") {
      contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    // Get the current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");
    if (section) {
      setSelectedSection(section);
    }
  }, [location]);

  const handleMouseEnter = (index) => {
    const updatedHoveredStates = [...hoveredStates];
    updatedHoveredStates[index] = true;
    setHoveredStates(updatedHoveredStates);
  };

  const handleMouseLeave = (index) => {
    const updatedHoveredStates = [...hoveredStates];
    updatedHoveredStates[index] = false;
    setHoveredStates(updatedHoveredStates);
  };

  return (
    <div  ref={contactRef}>
      <FloatingButton />
      <Navigation
        sliderRef={sliderRef}
        overViewRef={overViewRef}
        teamRef={teamRef}
        contactRef={contactRef}
        
      />

      <section style={styles.section1}>
        <img
          src={require("./assets/LyfGurad-white-logo.png")} // Replace with your image path
          alt="Top Left"
          style={styles.topLeftImage}
        />
        <h1 style={styles.secheading}>Contact Us</h1>
      </section>
      <div ><h4 className="mt-5 ml-4" style={{ fontWeight: "700" }}>Reach the Appropriate Team</h4></div>
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {/* Card 1 */}
          <div className="col">
            <div className="card" style={{ borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", border: "none" }}>
              <div className="card-body d-flex align-items-center">
                <AiFillCustomerService style={{ fontSize: "80px", marginRight: "10px" }} />
                <div>
                  <h6 className="card-title">Customer Support</h6>
                  <p className="card-text" style={{ fontSize: "12px" }}>For support with your bookings, ONDC orders and other queries, click here or visit the Support section in the Lyfguard app.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col">
            <div className="card" style={{ borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", border: "none" }}>
              <div className="card-body d-flex align-items-center">
                <MdOutlineSecurity style={{ fontSize: "80px", marginRight: "10px" }} />
                <div>
                  <h6 className="card-title">Customer Security</h6>
                  <p className="card-text" style={{ fontSize: "12px" }}>If you have security concerns, please report your issues with Lyfguard at <a
                    href="mailto:support@lyfguard.in"
                    style={{
                      textDecoration: "none",
                      color: "blue",
                      fontWeight: "bold",
                    }}
                  >
                    <p style={styles.Section8textsub}>support@lyfguard.in</p>
                  </a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col">
            <div className="card" style={{ borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", border: "none" }}>
              <div className="card-body d-flex align-items-center">
                <GiMassDriver style={{ fontSize: "80px", marginRight: "10px" }} />
                <div>
                  <h6 className="card-title">Drive for Lyfguard</h6>
                  <p className="card-text" style={{ fontSize: "12px" }}>If you are a driver or a fleet manager and want to attach your vehicle with Lyfguard, click here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center">
        {/* Address Section */}
        <div className="mt-n3" style={{ marginTop: "-20px" }}>
          <h4 style={{ lineHeight: "2.5", fontWeight: "bold" }}>Address</h4>
          <h6>Bengaluru office</h6>
          <p style={{ lineHeight: "0.5", fontSize: "11px" }}>#120 3rd cross 8th main</p>
          <p style={{ lineHeight: "0.1", fontSize: "11px" }}>3rd phase jp nagar</p>
          <p style={{ lineHeight: "0.5", fontSize: "11px" }}>Bengaluru 560078</p>
          <p style={{ lineHeight: "0.1", fontSize: "11px", ...styles.Section8textsub }}>
            <a href="tel:18008891258" style={{ color: "blue", textDecoration: "none" }}>
              1800-889-1258
            </a>
          </p>
        </div>

        {/* Map Section */}
        <div className="col-lg-6 col-12 mb-5 order-1 order-lg-2" style={{ maxWidth: "400px" }}>
          <div className="">
            <LoadScript
              googleMapsApiKey="AIzaSyCLg_Oahf9q1keNmJoqHc_Uk4f0fu3YmxU"
              libraries={libraries}
              onLoad={handleScriptLoad}
            >
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "250px" }} // Reduce map size
                center={currentPosition || formData.sourcePosition}
                zoom={14}
              >
                {currentPosition && <Marker position={currentPosition} />}
                <Marker position={formData.sourcePosition} />
                <Marker position={formData.destinationPosition} />
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
      <FooterScreen />
    </div>
  );
};

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
    fontSize: "2.5rem",
    color: "#fff",
    marginTop: "60px",
    fontWeight: "bold",
  },
  topLeftImage: {
    position: "absolute",
    top: "15%",
    width: "100px",
    height: "auto",
    zIndex: 1,
  },
  Section8textsub: {
    fontSize: "14px",
  },
  
};

export default Contactus;

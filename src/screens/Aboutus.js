import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, contactRef } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import FooterScreen from "./footer";
import FloatingButton from "./FloatingButton";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from './navbar';
import './Aboutus.css';

const PrivacyScreen = () => {
  const [hoveredStates, setHoveredStates] = useState([false, false, false]);
  const [selectedSection, setSelectedSection] = useState("user");
  const location = useLocation();

  const sliderRef = useRef(null);
    const overViewRef = useRef(null);
    const teamRef = useRef(null);
    const contactRef = useRef(null);
    useEffect(() => {
      if (contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
      }
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
      teamRef={contactRef}
      contactRef={contactRef}
     
      />

      <section  style={styles.section1}>
        <img
          src={require("./assets/LyfGurad-white-logo.png")} // Replace with your image path
          alt="Top Left"
          style={styles.topLeftImage}
        />
        <h1 style={styles.secheading}>About Us</h1>
      </section>

     

<Container>
  <Row className="my-4">
    <Col xs={12} className="d-flex  mb-4">
      <button
        style={{
          backgroundColor: "rgb(6, 105, 81)",
          color: "white",
          border: "1px solid black",
          padding: "2px 10px",
          borderRadius: "25px",
          cursor: "pointer",
          borderColor: "azure",
        }}
      >
        About Us
      </button>
    </Col>
    <Col xs={12} md={4}>
      <h4>
        <span className="text-success">Introduction</span> TO Best Digital Agency!
      </h4>
    </Col>
    <Col xs={12} md={4}>
      <p style={{ fontSize: "14px" }}>
        May collect and use your information on the basis of your consent.
        You may revoke your consent at any time. If you revoke your consent, you will not be able to use any service or feature that requires{" "}
      </p>
    </Col>
    <Col xs={12} md={4}>
      <p style={{ fontSize: "14px" }}>
        May collect and use your information on the basis of your consent.
        You may revoke your consent at any time. If you revoke your consent, you will not be able to use any service or feature that requires{" "}
      </p>
    </Col>
  </Row>
</Container>

      <div className="container">
  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
    {/* Card 1 */}
    <div className="col">
      <div className="card" style={{ borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",border: "none" }}>
        <div className="card-body d-flex align-items-center">
          <img
            src="logo1.png"
            alt="Logo 1"
            className="me-2"
            style={{ width: "30px", height: "30px" }}
          />
          <div>
            <h6 className="card-title">Best Price Guaranteed</h6>
            <p className="card-text"style={{ fontSize: "14px" }}>This is some text for the first card use any service or feature.</p>
          </div>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="col">
      <div className="card" style={{ borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", border: "none" }}>
        <div className="card-body d-flex align-items-center">
          <img
            src="logo2.png"
            alt="Logo 2"
            className="me-2"
            style={{ width: "30px", height: "30px" }}
          />
          <div>
            <h6 className="card-title">Finance Analysis</h6>
            <p className="card-text" style={{ fontSize: "14px" }}>This is some text for the second card use any service or feature .</p>
          </div>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="col">
      <div className="card" style={{ borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", border: "none" }}>
        <div className="card-body d-flex align-items-center">
          <img
            src="./assets/Advance.jpeg"
            alt="Logo 3"
            className="me-2"
            style={{ width: "30px", height: "30px" }}
          />
          <div>
            <h6 className="card-title">Professional Team</h6>
            <p className="card-text" style={{ fontSize: "14px" }}>This is some text for the third card use any service or feature.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div style={{
      display: "flex",
      justifyContent: "center", // Centers images horizontally
      alignItems: "center", // Aligns images vertically
      position: "relative", // Allows absolute positioning of the overlay image
      width: "100%", // Ensure container takes full width
      maxWidth: "300px", // Container max width
      height: "auto", // Height adjusts automatically
      margin: "auto", // Center container horizontally
    }}>
      <img
        src={require("./assets/Build-Your-Teamwork-2.png")}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "300px", // Ensure base image does not exceed max width
          zIndex: 1, // Ensure this image is behind the overlay image
          marginRight: "90%",
          borderRadius: "10px",
        }}
        alt="Teamwork and Collaboration"
      />
      <img
        src={require("./assets/Collaboration-2.png")}
       // Bootstrap class for border
        style={{
          width: "80%", // Adjust width to control overlay size
          height: "auto",
          position: "absolute", // Allows image to overlap
          top: "12%", // Adjust top positioning to fit properly
          left: "35%", // Adjust left positioning to fit properly
          zIndex: 2, // Ensure this image is on top of the first image
          border: "3px solid #ffffff", // Customize border color and size as needed

         borderRadius: "10px",
          transform: "none", // Remove transform to avoid extra margin issues
        }}
        alt="Teamwork and Collaboration"
      />
    </div>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center", // Horizontally center
            alignItems: "center", // Vertically center if needed
            marginTop: "50px",
          }}
        >
          <button
            style={{
              backgroundColor: "rgb(6, 105, 81)",
              color: "white",
              border: "1px solid black",
              padding: "2px 10px",
              borderRadius: "25px",
              cursor: "pointer",
              borderColor: "azure",
            }}
          >
            About Us
          </button>
        </div>

        <div>
          <p style={styles.section2Text1}>
            <span className="text-success">Team</span> Members
          </p>
          <p style={styles.section2Text3}>
            There are many variations of passages of Lorem Ipsum available,
          </p>
          <p style={styles.section2Text3}>
            but the majority have suffered alteration in some form.
          </p>
        </div>
      </Container>

      <div className="container mt-5">
      {/* Flex container for cards */}
      <div className="row">
        {/* Card 1 */}
        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "100%", position: "relative", margin: "0 auto" }}>
            <div style={styles.container}>
              <img
                src={require("./assets/client image 3 .jpeg")}
                className="card-img-top"
                alt="Logo 4"
                style={styles.img}
              />
              <div className="card-body" style={styles.cardBody}>
                <h4 style={{ fontSize: "1rem", margin: "4px", color:"white" }}>.</h4>
                <p style={{ fontSize: "0.875rem", margin: "4px" ,color:"white" }}>.</p>
              </div>
              <div style={styles.overlay}>
                <h5 className="card-title" style={styles.cardTitle}>Shrinivas</h5>
                <p className="card-text" style={styles.cardText}>CEO</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "100%", position: "relative", margin: "0 auto" }}>
            <div style={styles.container}>
              <img
                src = {require("./assets/client image 2.jpeg")}
                className="card-img-top"
                alt="Logo 2"
                style={styles.img}
              />
              <div className="card-body" style={styles.cardBody}>
                <h4 style={{ fontSize: "1rem", margin: "4px", color:"white"  }}>.</h4>
                <p style={{ fontSize: "0.875rem", margin: "4px",color:"white"  }}>.</p>
              </div>
              <div style={styles.overlay}>
                <h5 className="card-title" style={styles.cardTitle}>Aishwarya</h5>
                <p className="card-text" style={styles.cardText}>Software Developer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "100%", position: "relative", margin: "0 auto" }}>
            <div style={styles.container}>
              <img
                  src={require("./assets/th (2).jpeg")}
                className="card-img-top"
                alt="Logo 1"
                style={styles.img}
              />
              <div className="card-body" style={styles.cardBody}>
                <h4 style={{ fontSize: "1rem", margin: "4px", color:"white"  }}>.</h4>
                <p style={{ fontSize: "0.875rem", margin: "4px", color:"white"  }}>.</p>
              </div>
              <div style={styles.overlay}>
                <h5 className="card-title" style={styles.cardTitle}>Samanvi</h5>
                <p className="card-text" style={styles.cardText}>Frontend Developer</p>
              </div>
            </div>
          </div>
        </div>

         {/* Card 4 */}
        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "100%", position: "relative", margin: "0 auto" }}>
            <div style={styles.container}>
              <img
                src={require("./assets/client image1.jpeg")}
                className="card-img-top"
                alt="Logo 3"
                style={styles.img}
              />
              <div className="card-body" style={styles.cardBody}>
                <h4 style={{ fontSize: "1rem", margin: "4px",color:"white"  }}>.</h4>
                <p style={{ fontSize: "0.875rem", margin: "4px",color:"white"  }}>.</p>
              </div>
              <div style={styles.overlay}>
                <h5 className="card-title" style={styles.cardTitle}>Dhanish</h5>
                <p className="card-text" style={styles.cardText}>UI Designer</p>
              </div>
            </div>
          </div>
        </div>

       
        
        
      
    

          
        </div>
        {/* <p style={{
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "20px",  // Adjust the size as needed
  fontFamily: " sans-serif",  // Change to your preferred font
  marginTop: "30px",
}}>
  www.DownloadNewThemes.com
</p> */}

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
    color: "white",
    fontSize: "35px", // Reduced font size
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
    fontSize: "16px", // Reduced font size
    fontWeight: "bold",
  },
  teamDescription: {
    fontSize: "14px", // Reduced font size
  },
  subteamDescription: {
    fontSize: "12px", // Reduced font size
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
    fontSize: "18px", // Reduced font size
    fontWeight: "700",
  },
  section2Text3: {
    color: "#4D4F4D",
    textAlign: "center",
    fontSize: "14px", // Reduced font size
  },
  overlay: {
    position: "absolute",
    bottom: "0", // Align to the bottom of the container
    left: "25px",
    right: "25px",
    backgroundColor: "#066951",
    color: "white",
    padding: "5px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25px",
    height: "auto", // Adjust height based on content
    marginBottom:"25px",
   
    
  },
  
  container: {
    position: "relative",
  },
  img: {
    width: '100%',
    height: '200px', // Set a fixed height
    objectFit: 'cover', // Ensure images cover the container while maintaining aspect ratio
  },
  cardBody: {
    padding: '0px',
  },
  
};


export default PrivacyScreen;

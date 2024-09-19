import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterScreen = () => {
  return (
    <div>
      <Container fluid style={styles.Section8container}>
        <Row>
          <img
            src={require("./assets/LyfGurad-white-logo.png")} // Replace with your image path
            alt="Top Left"
            style={styles.bottomRight}
          />
          <Col xs={12} md={3} lg={3}>
            <p style={styles.Section8text}>Contact</p>
            <div style={styles.section8subtext}>
              <a
                href="mailto:reach@lyfguard.in"
                style={{
                  textDecoration: "none",
                  color: "blue",
                  fontWeight: "bold",
                }}
              >
                <p style={styles.Section8textsub}>reach@lyfguard.in</p>
              </a>
              <a
                href="mailto:support@lyfguard.in"
                style={{
                  textDecoration: "none",
                  color: "blue",
                  fontWeight: "bold",
                }}
              >
                <p style={styles.Section8textsub}>support@lyfguard.in</p>
              </a>
              <p style={styles.Section8textsub}>
                <a
                  href="tel:18008891258"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  1800-889-1258
                </a>
              </p>
            </div>
          </Col>
          <Col xs={12} md={3} lg={3}>
            <p style={styles.Section8text}>Services</p>
            <div style={styles.section8subtext}>
              <Link
                to="/booking"
                state={{ fromEmergency: true }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <p style={styles.Section8textsub}>Emergency Ambulance</p>
              </Link>

              <Link
                to="/booking"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <p style={{...styles.Section8textsub, whiteSpace: 'nowrap'}}>Private Ambulance</p>
              </Link>
              <Link
                to=""
                style={{ textDecoration: "none", color: "inherit" }}
              >
              <p style={styles.Section8textsub} onClick={() => alert('Coming soon')}>
  Mortuary
</p>
</Link>

              <Link
  to="/firstaid"
  style={{ textDecoration: "none", color: "inherit" }}
>
  <p style={{ ...styles.Section8textsub, whiteSpace: 'nowrap' }}>First AID</p>
</Link>

            </div>
          </Col>
          <Col xs={12} md={3} lg={3} className="mb-4 mb-lg-8 mt-2">
  <p style={{ ...styles.Section8text, margin: '0' }}>Company</p>
  <div style={styles.section8subtext}>
  <Link
  to="/aboutus"
  style={{ textDecoration: "none", color: "inherit" }}
>
    <p style={{ ...styles.Section8textsub, margin: '0' }}>About Us</p></Link>
    <Link
  to="/contactus"
  style={{ textDecoration: "none", color: "inherit" }}
>
    <p style={{ ...styles.Section8textsub, margin: '0' }}>Contact us</p>
    </Link>
    <Link
  to="/join"
  style={{ textDecoration: "none", color: "inherit" }}
>
    <p style={{ ...styles.Section8textsub, margin: '0' }}>Join us</p>
    </Link>
    {/* <p style={styles.Section8textsub}>Contact Us</p> */}
  </div>
</Col>

          <Col xs={12} md={3} lg={3} className="mb-4 mb-lg-10">
            <p style={styles.Section8text}>Legal</p>
            <div style={styles.section8subtext}>
              <Link to="/tc" style={{ textDecoration: "none", color: "white" }}>
                Terms & Conditions
              </Link>
              <Link
  to="/privacy?section=user"
  style={{ textDecoration: "none", color: "white" }}
>
                Privacy Policy (user)
              </Link>
              <Link to="/privacy?section=client" style={{ textDecoration: "none", color: "white" }}>
                Privacy Policy (Client)
              </Link>
              
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const styles = {
  appgooglestorebutton: {
    display: "flex",
    justifyContent: "center",
  },
  Section8container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  Section8text: {
    color: "#A1EAFB",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 25,
    margin: "5%",
  },
  Section8textsub: {
    margin: "2.2%",
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  section8subtext: {
    marginTop: "6%",
    display: "flex",
    flexDirection: "column", // Align items vertically
    alignItems: "center", // Center items horizontally
  },
  footerlogo: {
    width: "10%",
    height: "auto",
  },
  bottomRight: {
    position: "absolute",
    top: "10%",
    left: "2%",
    width: "100px", // Adjust the width as needed
    height: "auto",
    zIndex: 1,
  },
};

export default FooterScreen;

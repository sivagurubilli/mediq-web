// src/Home.js
import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import { Link, } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button, Container, Row, Col, Overlay } from 'react-bootstrap';
import FloatingButton from './FloatingButton';
import Navigation from './navbar';
import FooterScreen from './footer';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const [isBooked, setIsBooked] = useState(false);
    const [hoveredStates, setHoveredStates] = useState([false, false, false]);
    const [showMore, setShowMore] = useState(false);
    const [showMores, setShowMores] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const sliderRef = useRef(null);
    const overViewRef = useRef(null);
    const teamRef = useRef(null);
    const contactRef = useRef(null);
    const homeRef = useRef(null);


    const getButtonWidth = () => {
        if (window.matchMedia('(max-width: 600px)').matches) {
          return '250px'; // Width for small screens
        }
        if (window.matchMedia('(min-width: 601px) and (max-width: 1024px)').matches) {
          return '220px'; // Width for medium screens
        }
        return '200px'; // Default width
      };
      
    

    const toggleShowMore = () => {
        setShowMore(prevShowMore => !prevShowMore);
    };

    const toggleShowMoreExplorebooking = () => {
        setShowMores(prevShowMores => !prevShowMores);
    };


    const handleBookNow = () => {
      };
    
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


    const handleMouseEnterbutton = (button) => setHoveredButton(button);
    const handleMouseLeavesbutton = () => setHoveredButton(null);

    

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };
    
    
      const imageStyle = {
        width: '20px',
        height: '20px',
       
      };
    
      const nestedContainerStyle = {
        position: 'relative',
        width: '10px', // Adjust size as needed
        height: '10px', // Adjust size as needed
        display: 'flex',
      };
    
      
    
      const overlayStyle = {
        opacity: 0.7 // Adjust opacity as needed
      };
      const buttonStyle = {
        backgroundColor: isHovered ? 'orange' : 'red', // Change color on hover
    color:isHovered ? 'black' : 'white',
    borderRadius: '25px',
    paddingRight: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    marginTop: '30px',
    boxShadow: 'background-color 0.5s ease',
   
  
   
    
      };
    
      const imageContainerStyle = {
        position: 'relative',
        display: 'flex', // Display images in a stack
        width: '40px', // Adjust width as needed
        height: '45px', // Adjust height as needed
        marginRight: '8px', // Space between images and text
      };
    
      const nestedImageStyle = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        objectFit: 'contain', // Ensures images cover the container
      };
    
      
    
      const textStyle = {
       
        fontWeight: 'bold',
        fontSize: '15px',
       
      };

    return (

        <div style={styles.container}>

      <FloatingButton />

      <Navigation
      sliderRef={sliderRef}
      overViewRef={overViewRef}
      teamRef={contactRef}
      contactRef={contactRef}
      />

        <section  style={styles.section1} ref={homeRef}>
                <img 
                    src={require('./assets/LyfGurad-white-logo.png')} // Replace with your image path
                    alt="Top Left"
                    style={styles.topLeftImage}
                />
                <div  style={styles.text}>
                    <h2 style={styles.section1Text1}>LYFGUARD: Your Lifeline, Our Priority</h2>
                    <p style={styles.section1Text2}>Free, fast-response ambulance service.</p>
                    <div style={styles.bookambulanceButton}>
                    <Link to="/booking"   state= {{ mapComponent: true }}>
                            
                            <button
                               onClick={handleBookNow}
                                style={{
                                    ...styles.button,
                                    backgroundColor: hoveredButton === 'ambulance' ? '#FFBB37' : 'red',
                                    color: hoveredButton === 'ambulance' ? 'black' : 'white',
                                    ...(isBooked && styles.bookedButton)
                                }}
                                onMouseEnter={() => handleMouseEnterbutton('ambulance')}
                                onMouseLeave={handleMouseLeavesbutton}
                            >
                                <span style={styles.bookambulanceButtonText}>BOOK NOW!</span>
                            </button>
                        </Link>
                    </div>
                    <div>
                    <a
                  href="tel:18008891258"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
      <button style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
        
        {/* Image Container for Overlay */}
        <div style={imageContainerStyle}>
          <img 
            src={require("./assets/Group 1.png")}
            alt="Background Image"
            style={nestedImageStyle}
          />
         
        </div>
        <span style={textStyle}>1800-889-1280</span>
      </button>
      </a>
    </div>
    


                </div>
                <img
        src={require('./assets/bannerimg.png')}
        alt="Ambulance service banner"
        style={styles.bannerimg}
    />
    
            </section>
            

            <Container >
                <Row className="align-items-center">
                    <Col xs={12} md={12} lg={12} sm={12}>
                        <div ref={overViewRef}>
                            <h2 style={styles.ourpartners}>OUR PARTNERS</h2>
                            <Slider {...settings} >
                                {/* <div className="swiper-slide" style={styles.slide}>
                                    <img
                                        src={require('./assets/amazon_img.webp')}
                                        alt="Amazon"
                                        style={styles.slideimage}
                                    />
                                </div> */}
                                <div className="swiper-slide mt-4" style={styles.slide}>
                                    <img
                                        src={require('./assets/company_img.png')}
                                        alt="Company"
                                        style={styles.slideimage}
                                    />
                                </div>
                                <div className="swiper-slide mt-4 20" style={styles.slide}>
                                    <img
                                        src={require('./assets/generic_img.png')}
                                        alt="Generic"
                                        style={styles.slideimage}
                                    />
                                </div>
                                <div className="swiper-slide mt-3" style={styles.slide}>
                                    <img
                                        src={require('./assets/meta_img.png')}
                                        alt="Meta"
                                        style={styles.slideimage}
                                    />
                                </div>
                                <div className="swiper-slide mt-2" style={styles.slide}>
                                    <img
                                        src={require('./assets/wing_img.png')}
                                        alt="Wing"
                                        style={styles.slideimage}
                                    />
                                </div>
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container>

           
            <Container fluid ref={sliderRef}  style={styles.section3}>
               <Col>
                <Row className="align-items-center">
                    <Col xs={12} md={6} sm={6} className="text-center text-md-start" style={styles.text}>
                        <img
                            src={require('./assets/care.png')}
                            style={styles.cardlogo2}
                            alt="Care Logo"
                        />
                        <p style={styles.section3Text1}>Your journey towards instant care is just a click away-</p>
                        <p style={styles.section3Text2}>
                            Collaborate over projects with your team and clients optimized for mobile and tablet.
                        </p>

                        <div className="d-flex flex-column align-items-center">

                        <Button style={styles.moreButton} onClick={toggleShowMore}>


                            {showMore ? (
                                <p style={styles.section3Text2}>
                                    Don't let slow page speeds drive. Our innovative platform empowers anyone to convert clicks. You'll publish your first landing page in minutes.
                                </p>
                            ) : (
                                'See More...'
                            )}
                        </Button>

                            <Button
                                style={{
                                    ...styles.downloadnowButton,
                                    backgroundColor: hoveredButton === 'download1' ? '#FFBB37' : 'red',
                                    color: hoveredButton === 'download1' ? 'black' : 'white',
                                    ...(isBooked && styles.bookedButton),
                                    // Default shadow
      }}
                            
                                onMouseEnter={() => handleMouseEnterbutton('download1')}
                                onMouseLeave={handleMouseLeavesbutton}
                            >
                                DOWNLOAD NOW!
                            </Button>
                        </div>

                    </Col>
                    <img
                        src={require('./assets/masterimage2.png')}
                        style={styles.image}
                        alt="Master"
                    />
                </Row>
                <Row className="align-items-center">
                    <img
                        src={require('./assets/masterimage2.png')}
                        style={styles.image}
                        alt="Master"
                    />

                    <Col xs={12} md={6} sm={6} className="text-center text-md-start" style={styles.text}>
                        <img
                            src={require('./assets/Bookingoptions.png')}
                            style={styles.cardlogo2}
                            alt="Booking Options Logo"
                        />
'
                        <p style={styles.section3Text1}>Explore the booking options now</p>
                        <p style={styles.section3Text2}>
                            Collaborate over projects with your team and clients optimized for mobile and tablet.
                        </p>

                        <div className="d-flex flex-column align-items-center">
                        <Button style={styles.moreButton} onClick={toggleShowMoreExplorebooking}>
                            {showMores ? (
                                <p style={styles.section3Text2}>
                                    Don't let slow page speeds drive. Our innovative platform empowers anyone to convert clicks. You'll publish your first landing page in minutes.
                                </p>
                            ) : (
                                'See More...'
                            )}
                        </Button>
                       
                            <Button
                                style={{
                                    ...styles.downloadnowButton,
                                    backgroundColor: hoveredButton === 'download' ? '#FFBB37' : 'red',
                                    color: hoveredButton === 'download' ? 'black' : 'white',
                                    ...(isBooked && styles.bookedButton),
                                    
                                }}
                                onMouseEnter={() => handleMouseEnterbutton('download')}
                                onMouseLeave={handleMouseLeavesbutton}
                            >
                                DOWNLOAD NOW!
                            </Button>

                            </div>
                    </Col>
                </Row>
                </Col> 
            </Container>

            <div style={styles.section5}>
                <p style={styles.section5Text1}>Witness the Impact</p>
                <p style={styles.section5Text2}>Hear from Our Valued Clients</p>
                <div style={styles.section5content}>
                    <div>
                        <p style={styles.section5contentText1}>100%</p>
                        <p style={styles.section5contentText2}>Satisfaction</p>
                    </div>
                    <div>
                        <p style={styles.section5contentText1}>120K</p>
                        <p style={styles.section5contentText2}>Happy Users</p>
                    </div>
                    <div>
                        <p style={styles.section5contentText1}>125k+</p>
                        <p style={styles.section5contentText2}>Downloads</p>
                    </div>
                </div>
            </div>

            <Container ref={overViewRef}>
                <div>
                    <h3 style={styles.section2Text1}>OVERVIEW</h3>
                    <h4 style={styles.section2Text2}>Discover Our Exceptional Features</h4>
                    <p style={styles.section2Text3}>Experience the future of emergency medical transport with LYFGUARD. Your lifeline, our priority.</p>
                </div>
            </Container>

            <Container style={styles.cardContainer}>
                <Row>
                    <Col lg={4} md={6} sm={12}>
                        <div
                            style={{
                                ...styles.card,
                                backgroundColor: hoveredStates[0] ? '#066951' : '#FFFFF7',
                            }}
                            onMouseEnter={() => handleMouseEnter(0)}
                            onMouseLeave={() => handleMouseLeave(0)}>
                            <img
                                src={require('./assets/Partnership.png')}
                                alt="Citywide Hospital partnerships"
                                style={styles.cardlogo}
                            />
                            <h3 style={{ ...styles.cardTitle, color: hoveredStates[0] ? '#FFFFFF' : '#000000' }}  >Citywide Hospital partnerships</h3>
                            <p style={{ ...styles.cardDescription, color: hoveredStates[0] ? '#FFFFFF' : '#000000' }}>Collaborating with City Hospitals for easy and seamless patient transfers.</p>
                        </div>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <div
                            style={{
                                ...styles.card,
                                backgroundColor: hoveredStates[1] ? '#066951' : '#FFFFF7',
                            }}
                            onMouseEnter={() => handleMouseEnter(1)}
                            onMouseLeave={() => handleMouseLeave(1)}>
                            <img
                                src={require('./assets/Partnership.png')} // Assuming this is the correct path to your image
                                alt="Instant Ambulance"
                                style={styles.cardlogo}
                            />
                            <h3 style={{ ...styles.cardTitle, color: hoveredStates[1] ? '#FFFFFF' : '#000000' }}>Instant Ambulance</h3>
                            <p style={{ ...styles.cardDescription, color: hoveredStates[1] ? '#FFFFFF' : '#000000' }}>Booking a private ambulance is now as quick and easy as ordering a ride.</p>
                        </div>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <div
                            style={{
                                ...styles.card,
                                backgroundColor: hoveredStates[2] ? '#066951' : '#FFFFF7',
                            }}
                            onMouseEnter={() => handleMouseEnter(2)}
                            onMouseLeave={() => handleMouseLeave(2)}>
                            <img
                                src={require('./assets/Zerocost.png')} // Assuming this is the correct path to your image
                                alt="Zero-cost"
                                style={styles.cardlogo}
                            />
                            <h3 style={{ ...styles.cardTitle, color: hoveredStates[2] ? '#FFFFFF' : '#000000' }}>Zero-cost</h3>
                            <p style={{ ...styles.cardDescription, color: hoveredStates[2] ? '#FFFFFF' : '#000000' }}>Instantly book Budget-Friendly Ambulance Services.</p>
                        </div>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <div style={{
                            ...styles.card,
                            backgroundColor: hoveredStates[3] ? '#066951' : '#FFFFF7',
                        }}
                            onMouseEnter={() => handleMouseEnter(3)}
                            onMouseLeave={() => handleMouseLeave(3)}>
                            <img
                                src={require('./assets/emergencyconnect.png')}
                                alt="Citywide Hospital partnerships"
                                style={styles.cardlogo}
                            />
                            <h3 style={{ ...styles.cardTitle, color: hoveredStates[3] ? '#FFFFFF' : '#000000' }}>Emergency connect</h3>
                            <p style={{ ...styles.cardDescription, color: hoveredStates[3] ? '#FFFFFF' : '#000000' }}>Easily access nearby hospitals and contact the Police and Fire departments.
                            </p>
                        </div>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <div style={{
                            ...styles.card,
                            backgroundColor: hoveredStates[4] ? '#066951' : '#FFFFF7',
                        }}
                            onMouseEnter={() => handleMouseEnter(4)}
                            onMouseLeave={() => handleMouseLeave(4)}>
                            <img
                                src={require('./assets/Mobileintegratedhealthcare.png')}
                                alt="Instant Ambulance"
                                style={styles.cardlogo}
                            />
                            <h3 style={{ ...styles.cardTitle, color: hoveredStates[4] ? '#FFFFFF' : '#000000' }}>Mobile integrated healthcare</h3>
                            <p style={{ ...styles.cardDescription, color: hoveredStates[4] ? '#FFFFFF' : '#000000' }}>Sneak Peek into Future Medical Actions and Protocols</p>
                        </div>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <div style={{
                            ...styles.card,
                            backgroundColor: hoveredStates[5] ? '#066951' : '#FFFFF7',
                        }}
                            onMouseEnter={() => handleMouseEnter(5)}
                            onMouseLeave={() => handleMouseLeave(5)}>
                            <img
                                src={require('./assets/AutoDOC.png')}
                                alt="Zero-cost"
                                style={styles.cardlogo}
                            />
                            <h3 style={{ ...styles.cardTitle, color: hoveredStates[5] ? '#FFFFFF' : '#000000' }}>Autodoc/ Smartdoc</h3>
                            <p style={{ ...styles.cardDescription, color: hoveredStates[5] ? '#FFFFFF' : '#000000' }}>Future Medical Actions and Protocols Unveiled exclusively.</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container fluid ref={contactRef} style={styles.section7}>
                <Row>
                    <Col lg={12}>
                        <p style={styles.section5Text1}>Install LyfGuard and Start Using</p>
                        <p style={styles.section7Text2}>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className="d-flex justify-content-center">
                        <Button
                            style={{
                                ...styles.downloadnowButton,
                                backgroundColor: hoveredButton === 'app button' ? '#FFBB37' : 'red',
                                color: hoveredButton === 'app button' ? 'black' : 'white',
                                ...(isBooked && styles.bookedButton),
                                marginRight: '10px',
                            }}
                            onMouseEnter={() => handleMouseEnterbutton('app button')}
                            onMouseLeave={handleMouseLeavesbutton}
                        >
                            App Store
                        </Button>
                        <Button
                            style={{
                                ...styles.downloadnowButton,
                                backgroundColor: hoveredButton === 'google button' ? '#FFBB37' : 'red',
                                color: hoveredButton === 'google button' ? 'black' : 'white',
                                ...(isBooked && styles.bookedButton),
                            }}
                            onMouseEnter={() => handleMouseEnterbutton('google button')}
                            onMouseLeave={handleMouseLeavesbutton}
                        >
                            Google Play
                        </Button>
                    </Col>
                </Row>
            </Container>

            <FooterScreen/>

        </div>
    );
}

const styles = {

    container :{
         overflowY: 'scroll'
    },
    section1: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '500px',
        padding: '20px',
        backgroundColor: '#066951',
        backgroundImage: `url(${require('./assets/LyfGuardLogo.png')})`,
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    topLeftImage: {
        position: 'absolute',
        top: '15%',
        right: '2%',
        width: '100px', // Adjust the width as needed
        height: 'auto',
        zIndex: 1,
    },
    text: {
        flex: 1,
        margin: '5%',
        zIndex: 2,
        maxWidth: '100%',
        marginTop: '5%'
    },
    section1Text1: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    section1Text2: {
        fontSize: 18,
        color: 'white',
    },
    bookambulanceButton: {
        marginTop: '6%',
        flexDirection: 'row',
        cursor: 'pointer',
    },
    hoveredButton: {
        backgroundColor: 'blue',
    },
    button: {
        color: 'white',
        borderRadius: 5,
        textAlign: 'center',
        fontWeight: '700',
        padding: 7,
        background: 'none',
        fontSize: 18,
        cursor: 'pointer',
    },
    image: {
        marginRight: '6%',
        marginTop: '6%',
        marginLeft: '4%',
        width: 180,
        height: 350,
        resizeMode: 'contain',
    },
    bannerimg: {
        zIndex: 1,
        objectFit: 'contain',
        height: 500,
        width:'50%',
        resizeMode: 'contain',
        marginTop: '0'
    },
    
    ourpartners: {
        marginTop: '3%',
        textAlign: 'center',
        color: 'black',
        fontSize: 22,
        fontWeight: '600',
    },
    slide: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideimage: {
        width: '70%',
        height: '50%',
        objectFit: 'cover',
        marginTop: '5%'
    },
    section2Text1: {
        color: "black",
        textAlign: "center",
        marginTop: "7%",
        fontSize: 28,
        fontWeight: '700'
    },
    section2Text2: {
        color: "black",
        textAlign: "center",
        fontSize: 24,
        fontWeight: "500"
    },
    section2Text3: {
        color: "#4D4F4D",
        textAlign: "center",
        fontSize: 18,
        marginBottom: '3%'
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        marginTop: 20,
        cursor: 'pointer',
    },
    card: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.2s ease',
        marginTop: '4%'
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 10,
        color: 'black',
       
    },
    cardDescription: {
        fontSize: 15,
        color: 'black',
    },
    cardlogo: {
        height: 80,
        width: 68,
        marginBottom: '5%',
    },
    section3: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '4%',
        backgroundColor: '#066951',
        backgroundImage: `url(${require('./assets/LyfGuardLogo.png')})`,
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardlogo2: {
        height: 100,
        width: 100,
        objectFit: 'contain',
    },
    section3Text1: {
        color: 'white',
        fontSize: '170%',
        fontWeight: '900',
        // marginBottom: '4%',
        marginTop: '4%',
    },
    section3Text2: {
        fontSize: 18,
        marginBottom: '1.75%',
        color: 'white',
    },
    moreButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: 0,
        marginBottom: '20px',
    },
    downloadnowButton: {
        padding: 10,
        color: 'white',
        borderRadius: 8,
        textAlign: 'center',
        fontWeight: '700',
        cursor: 'pointer',
        margin: '2%',
        background: 'none',
        fontSize: 15,
       
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', // Default lighter shadow
        borderBottom: '2px solid black', // Black border on bottom
    borderRight: '2px solid black', 
       
        boxShadow: 'background-color 0.5s ease'
        
        
    },
    bookedButton: {
        backgroundColor: '#B8B8B8', // Example for booked state
      },
    section5: {
       backgroundColor: '#066951',
       marginTop:'0.1%',
    },
    section5Text1: {
        color: 'white',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        padding: 10
    },
    section5Text2: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
    section5content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: '3%',
    },
    section5contentText1: {
        fontSize: 22,
        fontWeight: '900',
        color: 'white',
    },
    section5contentText2: {
        fontSize: 16,
        color: 'white',
        marginBottom:'50%'
    },
    cardContainerSection2: {
        display: 'flex',
        flexDirection: 'row',
    },
    cardsction2: {
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '5%',
        marginBottom: '3%',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    teamName: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    teamDescription: {
        fontSize: '16px',
        color: '#666666',
        fontWeight: '500',
    },
    subteamDescription: {
        fontSize: '14px',
        color: '#666666',
    },
    section7: {
        backgroundColor: '#066951',
        backgroundImage: `url(${require('./assets/LyfGuardLogo.png')})`,
        backgroundSize: '200px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    section7Text2: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    number:{
        margin: '2%',
        padding: '5px 10px', // Adjust padding as needed
        color: 'white',
       
        fontSize: '200%',
        fontWeight: 'bold',
        position: 'relative', // To allow overlapping with the image
        left: '-20px',
    },
    phone:{
        display: 'flex',
        alignItems: 'center',
    margin: 0,
    padding: 0,
    position: 'relative',
    left: '-20px',
    
    
   


    },
    callimg:{
        width: '80px',
        height: '80px',
        marginTop: '4%',
        padding: 0,
        position: 'relative', 

    },
    phone:{
        backgroundColor:'red',
        borderRadius: '10%',
        color: 'white',
        marginTop: '10%'

    }
};

export default Home;

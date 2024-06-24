// src/Home.js
import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [hoveredStates, setHoveredStates] = useState([false, false, false]);
    const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [isToggleOpen, setIsToggleOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showMores, setShowMores] = useState(false);

    const sliderRef = useRef(null);
    const overViewRef = useRef(null);
    const teamRef = useRef(null);
    const contactRef = useRef(null);

    const menuItems = ['HOME', 'SERVICES', 'OVERVIEW', 'TEAM', 'CONTACT'];

    const handleBookAmbulance = () => {
        setIsBooked(true);
    };

    const handlePressIn = () => {
        setIsHovered(true);
    };

    const handlePressOut = () => {
        setIsHovered(false);
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

    const handleMouseEnterMenu = (item) => {
        setHoveredMenuItem(item);
    };

    const handleMouseLeaveMenu = () => {
        setHoveredMenuItem(null);
    };
    const handleMouseEnterbutton = (button) => {
        setHoveredButton(button);
    };

    const handleMouseLeavesbutton = () => {
        setHoveredButton(null);
    };


    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const toggleShowMoreExplorebooking = () => {
        setShowMores(!showMores);
    };


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    return (

        <div style={styles.container}>
            <Navbar bg="dark" variant="dark" expand="md sm lg " style={styles.appBar}>
                <Navbar.Brand style={styles.companyName}>LyfGuard </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsToggleOpen(!isToggleOpen)} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={`mr-auto ${isToggleOpen ? 'bg-primary position-relative' : ''}`} style={isToggleOpen ? { zIndex: 1000 } : {}}>
                        {menuItems.map((item, index) => (
                            <Nav.Link
                                key={index}
                                href="#"
                                style={{
                                    ...styles.menuItem,
                                    textDecoration: hoveredMenuItem === item ? 'underline' : 'none',
                                    color: hoveredMenuItem === item ? '#FFBB37' : 'white',
                                    backgroundColor: isToggleOpen ? 'rgba(0, 0, 0, 0.8)' : 'transparent', // Transparent background color
                                }}
                                onMouseEnter={() => handleMouseEnterMenu(item)}
                                onMouseLeave={handleMouseLeaveMenu}
                                onClick={() => {
                                    if (item === 'SERVICES') {
                                        sliderRef.current.scrollIntoView({ behavior: 'smooth' });
                                    } else if (item === 'OVERVIEW') {
                                        overViewRef.current.scrollIntoView({ behavior: 'smooth' });
                                    } else if (item === 'TEAM') {
                                        teamRef.current.scrollIntoView({ behavior: 'smooth' });
                                    } else if (item === 'CONTACT') {
                                        contactRef.current.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                {item}
                            </Nav.Link>
                        ))}
                    </Nav>
                    <Nav className={`ml-auto align-items-center ${isToggleOpen ? 'd-flex flex-row justify-content-center position-relative' : 'd-flex'}`} style={isToggleOpen ? { zIndex: 1000 } : {}}>
                        <Button
                            onClick={() => { }}
                            style={{
                                ...styles.joinUsButton,
                                backgroundColor: hoveredButton === 'Join Now' ? '#FFBB37' : 'red',
                                color: hoveredButton === 'Join Now' ? 'black' : 'white',
                                backgroundColor: isToggleOpen === 'Join Now' ? 'red' : '#FFBB37',
                                color: isToggleOpen === 'Join Now' ? 'black' : 'red',
                            }}
                            onMouseEnter={() => handleMouseEnterbutton('Join Now')}
                            onMouseLeave={handleMouseLeavesbutton}
                        >
                            JOIN NOW
                        </Button>
                        <Button
                            onClick={() => { }}
                            style={{
                                ...styles.joinUsButton,
                                backgroundColor: hoveredButton === 'Sign Up' ? '#FFBB37' : 'red',
                                color: hoveredButton === 'Sign Up' ? 'black' : 'white',
                                backgroundColor: isToggleOpen === 'Sign Up' ? 'red' : '#FFBB37',
                                color: isToggleOpen === 'Sign Up' ? 'black' : 'red',
                                marginLeft: '5px', // Adjust margin for spacing
                            }}
                            onMouseEnter={() => handleMouseEnterbutton('Sign Up')}
                            onMouseLeave={handleMouseLeavesbutton}
                        >
                            SIGN UP
                        </Button>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>

            <section style={styles.section1}>
                <div style={styles.text}>
                    <h2 style={styles.section1Text1}>LYFGUARD: Your Lifeline, Our Priority</h2>
                    <p style={styles.section1Text2}>Zero-cost, lightning fast ambulance Service</p>
                    <div style={styles.bookambulanceButton}>
                        <Link to="/booking" >
                            <button
                                onClick={handleBookAmbulance}
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
                </div>
                <img
                    src={require('./assets/bannerimg.png')}
                    alt="Master Image"
                    style={styles.bannerimg}
                />
            </section>

            <Container >
                <Row className="align-items-center">
                    <Col xs={12} md={12} lg={12} sm={12}>
                        <div ref={sliderRef}>
                            <h2 style={styles.ourpartners}>OUR PARTNERS</h2>
                            <Slider {...settings} >
                                <div className="swiper-slide" style={styles.slide}>
                                    <img
                                        src={require('./assets/amazon_img.webp')}
                                        alt="Amazon"
                                        style={styles.slideimage}
                                    />
                                </div>
                                <div className="swiper-slide" style={styles.slide}>
                                    <img
                                        src={require('./assets/company_img.png')}
                                        alt="Company"
                                        style={styles.slideimage}
                                    />
                                </div>
                                <div className="swiper-slide" style={styles.slide}>
                                    <img
                                        src={require('./assets/generic_img.png')}
                                        alt="Generic"
                                        style={styles.slideimage}
                                    />
                                </div>
                                <div className="swiper-slide" style={styles.slide}>
                                    <img
                                        src={require('./assets/meta_img.png')}
                                        alt="Meta"
                                        style={styles.slideimage}
                                    />
                                </div>
                                <div className="swiper-slide" style={styles.slide}>
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

            <Container>
                <div>
                    <h3 style={styles.section2Text1}>SERVICES</h3>
                    <h4 style={styles.section2Text2}>Experience Our Distinctive Traits</h4>
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
                            <p style={{ ...styles.cardDescription, color: hoveredStates[0] ? '#FFFFFF' : '#000000' }}>Strategic Alliances with Private City Hospitals, Guaranteeing Seamless Patient Transfers.</p>
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
                            <p style={{ ...styles.cardDescription, color: hoveredStates[1] ? '#FFFFFF' : '#000000' }}>Summoning a private ambulance is now as swift and straightforward as booking a ride.</p>
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
                            <p style={{ ...styles.cardDescription, color: hoveredStates[2] ? '#FFFFFF' : '#000000' }}>Instantly Reserve Budget-Friendly, Non-Critical Ambulance Services.</p>
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
                            <p style={{ ...styles.cardDescription, color: hoveredStates[3] ? '#FFFFFF' : '#000000' }}>Located nearby hospitals, access Police and Fire department contact effortlessly.</p>
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
                            <p style={{ ...styles.cardDescription, color: hoveredStates[4] ? '#FFFFFF' : '#000000' }}>Comprehensive first aid videos guiding you through emergency situations.</p>
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

            <Container fluid ref={overViewRef} style={styles.section3}>
                <Row className="align-items-center">
                    <Col xs={12} md={6} sm={6} className="text-center text-md-start" style={styles.text}>
                        <img
                            src={require('./assets/care.png')}
                            style={styles.cardlogo2}
                            alt="Care Logo"
                        />
                        <p style={styles.section3Text1}>Your journey towards instant care just a click away-</p>
                        <p style={styles.section3Text2}>
                            Collaborate over projects with your team and clients optimized for mobile and tablet.
                        </p>
                        <Button style={styles.moreButton} onClick={toggleShowMore}>


                            {showMore ? (
                                <p style={styles.section3Text2}>
                                    Don't let slow page speeds drive. Our innovative platform empowers anyone to convert clicks. You'll publish your first landing page in minutes.
                                </p>
                            ) : (
                                'See More...'
                            )}
                        </Button>

                        <div style={styles.getstartContainer}>
                            <Button
                                style={{
                                    ...styles.downloadnowButton,
                                    backgroundColor: hoveredButton === 'download1' ? '#FFBB37' : 'red',
                                    color: hoveredButton === 'download1' ? 'black' : 'white',
                                    ...(isBooked && styles.bookedButton),
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
                        alt="Master Image"
                    />
                </Row>

            </Container>

            <Container fluid style={styles.section4}>
                <Row className="align-items-center">
                    <img
                        src={require('./assets/masterimage2.png')}
                        style={styles.image}
                        alt="Master Image"
                    />

                    <Col xs={12} md={6} sm={6} className="text-center text-md-start" style={styles.text}>
                        <img
                            src={require('./assets/Bookingoptions.png')}
                            style={styles.cardlogo2}
                            alt="Booking Options Logo"
                        />


                        <p style={styles.section3Text1}>Explore the booking options now</p>
                        <p style={styles.section3Text2}>
                            Collaborate over projects with your team and clients optimized for mobile and tablet.
                        </p>
                        <Button style={styles.moreButton} onClick={toggleShowMoreExplorebooking}>
                            {showMores ? (
                                <p style={styles.section3Text2}>
                                    Don't let slow page speeds drive. Our innovative platform empowers anyone to convert clicks. You'll publish your first landing page in minutes.
                                </p>
                            ) : (
                                'See More...'
                            )}
                        </Button>

                        <div style={styles.getstartContainer}>
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

            <Container>
                <div ref={teamRef}>
                    <p style={styles.section2Text1}>Meat Our Team</p>
                    <p style={styles.section2Text3}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                </div>
            </Container>
            <Container fluid style={styles.cardContainer}>
                <Row>
                    <Col lg={3} md={6} sm={12}>
                        <div
                            style={{
                                ...styles.cardsction2,
                                backgroundColor: hoveredStates[6] ? '#066951' : '#FFFFF7',

                            }}
                            onMouseEnter={() => handleMouseEnter(6)}
                            onMouseLeave={() => handleMouseLeave(6)}
                        >
                            <img
                                src={require('./assets/Partnership.png')}
                                style={styles.avatar}
                                alt="User"
                            />
                            <p style={{ ...styles.teamName, color: hoveredStates[6] ? '#FFFFFF' : '#000000' }}>Shrinivas</p>
                            <p style={{ ...styles.teamDescription, color: hoveredStates[6] ? '#FBB040' : 'red' }}>CEO of LyfGuard</p>
                            <p style={{ ...styles.subteamDescription, color: hoveredStates[6] ? '#FFFFFF' : '#000000' }}>As we move forward, let's continue to build upon our achievements and strive for even greater milestones. Together, we have the potential to reach new heights and solidify our position as a leader in the industry.</p>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <div style={{
                            ...styles.cardsction2,
                            backgroundColor: hoveredStates[7] ? '#066951' : '#FFFFF7',

                        }}
                            onMouseEnter={() => handleMouseEnter(7)}
                            onMouseLeave={() => handleMouseLeave(7)}>
                            <img
                                src={require('./assets/Partnership.png')}
                                style={styles.avatar}
                                alt="User"
                            />
                            <p style={{ ...styles.teamName, color: hoveredStates[7] ? '#FFFFFF' : '#000000' }}>Aishvarya</p>
                            <p style={{ ...styles.teamDescription, color: hoveredStates[7] ? '#FBB040' : 'red' }}>Senior Developer</p>
                            <p style={{ ...styles.subteamDescription, color: hoveredStates[7] ? '#FFFFFF' : '#000000' }}>As we move forward, let's continue to build upon our achievements and strive for even greater milestones. Together, we have the potential to reach new heights and solidify our position as a leader in the industry.</p>

                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <div
                            style={{
                                ...styles.cardsction2,
                                backgroundColor: hoveredStates[8] ? '#066951' : '#FFFFF7',

                            }}
                            onMouseEnter={() => handleMouseEnter(8)}
                            onMouseLeave={() => handleMouseLeave(8)}
                        >
                            <img
                                src={require('./assets/Partnership.png')}
                                style={styles.avatar}
                                alt="User"
                            />
                            <p style={{ ...styles.teamName, color: hoveredStates[8] ? '#FFFFFF' : '#000000' }}>Nikhil S G </p>
                            <p style={{ ...styles.teamDescription, color: hoveredStates[8] ? '#FBB040' : 'red' }}>Frontend Developer</p>
                            <p style={{ ...styles.subteamDescription, color: hoveredStates[8] ? '#FFFFFF' : '#000000' }}>As we move forward, let's continue to build upon our achievements and strive for even greater milestones. Together, we have the potential to reach new heights and solidify our position as a leader in the industry.</p>

                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <div style={{
                            ...styles.cardsction2,
                            backgroundColor: hoveredStates[9] ? '#066951' : '#FFFFF7',

                        }}
                            onMouseEnter={() => handleMouseEnter(9)}
                            onMouseLeave={() => handleMouseLeave(9)}>
                            <img
                                src={require('./assets/Partnership.png')}
                                style={styles.avatar}
                                alt="User"
                            />
                            <p style={{ ...styles.teamName, color: hoveredStates[9] ? '#FFFFFF' : '#000000' }}>Danish suhail</p>
                            <p style={{ ...styles.teamDescription, color: hoveredStates[9] ? '#FBB040' : 'red' }}>UI/UX</p>
                            <p style={{ ...styles.subteamDescription, color: hoveredStates[9] ? '#FFFFFF' : '#000000' }}>As we move forward, let's continue to build upon our achievements and strive for even greater milestones. Together, we have the potential to reach new heights and solidify our position as a leader in the industry.</p>

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

            <Container fluid style={styles.Section8container}>
                <Row >
                    {/* <img
                        src={require('./assets/LyfGuardLogo.png')}
                        style={styles.footerlogo}
                        alt="LyfGuard Logo"
                    /> */}
                    <Col xs={12} md={3} lg={3} >

                        <p style={styles.Section8text}>Contact</p>
                        <div style={styles.section8subtext}>
                            <p style={styles.Section8textsub}>reach@lyfguard.in</p>
                            <p style={styles.Section8textsub}>support@lyfguard.in</p>
                            <p style={styles.Section8textsub}>'1800-889-1258'</p>
                        </div>
                    </Col>
                    <Col xs={12} md={3} lg={3} >
                        <p style={styles.Section8text}>Services</p>
                        <div style={styles.section8subtext}>
                            <p style={styles.Section8textsub}>Emergency Ambulance</p>
                            <p style={styles.Section8textsub}>Private Ambulance</p>
                            <p style={styles.Section8textsub}>Mortuary</p>
                            <p style={styles.Section8textsub}>First AID</p>
                        </div>
                    </Col>
                    <Col xs={12} md={3} lg={3} className="mb-4 mb-lg-8">
                        <p style={styles.Section8text}>Company</p>
                        <div style={styles.section8subtext}>
                            <p style={styles.Section8textsub}>About Us</p>
                            <p style={styles.Section8textsub}>Jobs</p>
                            <p style={styles.Section8textsub}>Join us</p>
                            {/* <p style={styles.Section8textsub}>Contact Us</p> */}
                        </div>
                    </Col>
                    <Col xs={12} md={3} lg={3} className="mb-4 mb-lg-10">
                        <p style={styles.Section8text}>Legal</p>
                        <div style={styles.section8subtext}>
                            <p style={styles.Section8textsub}>Terms & Conditions</p>
                            <p style={styles.Section8textsub}>Privacy Policy</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const styles = {

    appBar: {
        justifyContent: 'space-around',
        height: 60,
        backgroundColor: '#066951',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderBottom: '1px solid #E0E0E0',
        display: 'flex',
        flexDirection: 'row',
        padding: '0 10px',
    },
    companyName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginRight: '23%'
    },
    joinUsButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'red',
        textAlign: 'center',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
    },
    menuItem: {
        textAlign: 'center',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
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
    text: {
        flex: 1,
        margin: '5%',
        zIndex: 2,
        maxWidth: '100%',
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
        marginLeft: '6%',
        width: 180,
        height: 350,
        resizeMode: 'contain',
    },
    bannerimg: {
        zIndex: 1,
        width: '50%',
        objectFit: 'contain',
        height: 440,
        resizeMode: 'contain',
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
        fontSize: 24,
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
        backgroundColor: '#035541',
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
        fontSize: 28,
        fontWeight: '900',
        marginBottom: '4%',
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
        fontSize: 15
    },
    section4: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#035541',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section5: {
        backgroundColor: '#035541',
        marginTop: '3%',

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
    },
    cardContainerSection2: {
        display: 'flex',
        flexDirection: 'row',
        padding: '2%',
    },
    cardsction2: {
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '5%',
        marginBottom: '3%',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        marginRight: '5%'
    },
    cardTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '4%',
    },
    teamName: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '4%',
    },
    teamDescription: {
        fontSize: '16px',
        color: '#666666',
        fontWeight: '500',
        margin: '4%',
    },
    subteamDescription: {
        fontSize: '14px',
        color: '#666666',
        margin: '4%',
    },
    section7: {
        backgroundColor: '#035541',
    },
    section7Text2: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    appgooglestorebutton: {
        display: 'flex',
        justifyContent: 'center',
    },
    Section8container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },

    Section8text: {
        color: '#A1EAFB',
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 25,
        margin: '5%'
    },
    Section8textsub: {
        margin: '2.2%',
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
    },
    section8subtext: {
        marginTop: '6%'

    },
    footerlogo: {
        width: '10%',
        height: 'auto',
    }
};

export default Home;

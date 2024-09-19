
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";

const Navigation = ({ sliderRef, overViewRef, teamRef, contactRef,homeRef }) => {
  const navigate = useNavigate();
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const menuItems = ['HOME', 'SERVICES', 'OVERVIEW', 'ABOUT US', 'CONTACT US'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Ref is not set or element is not available');
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMenuItemClick = (item) => {
    
    
    switch (item) {
      case 'HOME':
       navigate('/');
        handleClick(homeRef);
        break;
      case 'SERVICES':
        navigate('/');
        handleScrollToSection(sliderRef);
        break;
      case 'OVERVIEW':
        navigate('/');
        handleScrollToSection(overViewRef);
        break;
      case 'ABOUT US':
        navigate('/');
        navigate('/aboutus');
        break;
      case 'CONTACT US':
        navigate('/');
        navigate('/contactus');
        break;
      default:
        break;
    }
  
    setIsToggleOpen(false); // Close the menu after clicking a menu item
  };

  return (
    <>
      {!isToggleOpen && (
        <Navbar expand="lg" style={styles.appBar} className={isScrolled ? 'fixed-top' : ''}>
          <Link
        to="/"
        state={{ fromEmergency: true }}
        style={{ textDecoration: 'none', color: 'inherit', marginLeft: '20px' }}
        onClick={() => handleClick(homeRef)} // Add onClick handler here
      >
        <Navbar.Brand style={styles.companyName}>LYFGUARD</Navbar.Brand>
      </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsToggleOpen(!isToggleOpen)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" style={styles.menuContainer}>
              {menuItems.map((item, index) => (
                <Nav.Link
                  key={index}
                  href="#"
                  style={{
                    ...styles.menuItem,
                    textDecoration: hoveredMenuItem === item ? 'underline' : 'none',
                    color: hoveredMenuItem === item ? '#FFBB37' : 'white',
                    backgroundColor: 'transparent', // No background when toggle is closed
                  }}
                  onMouseEnter={() => setHoveredMenuItem(item)}
                  onMouseLeave={() => setHoveredMenuItem(null)}
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item}
                </Nav.Link>
              ))}
            </Nav>
            <Nav className="ml-auto align-items-center" style={styles.buttonContainer}>
              <Button
                onClick={() => navigate('/join')}
                style={{
                  ...styles.joinUsButton,
                  backgroundColor: hoveredButton === 'Join Now' ? '#FFBB37' : 'red',
                  color: hoveredButton === 'Join Now' ? 'black' : 'white',
                }}
                onMouseEnter={() => setHoveredButton('Join Now')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                JOIN US!
              </Button>
              <Button
                onClick={() => { }}
                style={{
                  ...styles.joinUsButton,
                  backgroundColor: hoveredButton === 'Sign Up' ? '#FFBB37' : 'red',
                  color: hoveredButton === 'Sign Up' ? 'black' : 'white',
                  marginLeft: '5px',
                }}
                onMouseEnter={() => setHoveredButton('Sign Up')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                CLIENT LOGIN
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
      {isToggleOpen && (
        <Nav className="flex-column" style={styles.toggleMenu}>
          {menuItems.map((item, index) => (
            <Nav.Link
              key={index}
              href="#"
              style={{
                ...styles.menuItem,
                textDecoration: hoveredMenuItem === item ? 'underline' : 'none',
                color: hoveredMenuItem === item ? '#FFBB37' : 'white',
              }}
              onMouseEnter={() => setHoveredMenuItem(item)}
              onMouseLeave={() => setHoveredMenuItem(null)}
              onClick={() => handleMenuItemClick(item)}
            >
              {item}
            </Nav.Link>
          ))}
          <div style={styles.buttonContainerToggle}>
            <Button
              onClick={() => navigate('/join')}
              style={{
                ...styles.joinUsButton,
                backgroundColor: hoveredButton === 'Join Now' ? '#FFBB37' : 'red',
                color: hoveredButton === 'Join Now' ? 'black' : 'white',
              }}
              onMouseEnter={() => setHoveredButton('Join Now')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              JOIN US!
            </Button>
            <Button
              onClick={() => { }}
              style={{
                ...styles.joinUsButton,
                backgroundColor: hoveredButton === 'Sign Up' ? '#FFBB37' : 'red',
                color: hoveredButton === 'Sign Up' ? 'black' : 'white',
                marginLeft: '5px',
              }}
              onMouseEnter={() => setHoveredButton('Sign Up')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              CLIENT SIGN UP
            </Button>
          </div>
        </Nav>
      )}
      <div>
        {/* Your first section content here */}
      </div>
    </>
  );
};

const styles = {
  appBar: {
    height: 60,
    backgroundColor: '#066951',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderBottom: '1px solid #E0E0E0',
    display: 'flex',
    flexDirection: 'row',
    padding: '0 0px',
    
  },
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginLeft:"1.5%"
  },
  menuContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '20px'
  },
  buttonContainerToggle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
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
    width: '150px',
    marginLeft: '5px',
    boxShadow: 'background-color 0.3s ease'
  },
  menuItem: {
    textAlign: 'center',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
    margin: '0 0px',
  },
  toggleMenu: {
    // position: 'absolute',
    top: '60px', // Adjust this based on the height of your navbar
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999,
    padding: '10px',
  },
};

export default Navigation;
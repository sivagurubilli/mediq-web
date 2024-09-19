import FooterScreen from './footer';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect, useRef , contactRef} from 'react';
import { useLocation } from 'react-router-dom';
import FloatingButton from './FloatingButton';
import Navigation from './navbar';
// import Navigation from './navbar';

const PrivacyScreen = () => {

    const [hoveredStates, setHoveredStates] = useState([false, false, false]);
    const [selectedSection, setSelectedSection] = useState('user');
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
        const section = params.get('section');
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
        <div ref={contactRef}>
            {/* <Navigation/> */}
            <FloatingButton />
            <Navigation
      sliderRef={sliderRef}
      overViewRef={overViewRef}
      teamRef={contactRef}
      contactRef={contactRef}
      />


            <section style={styles.section1}>
                <img
                    src={require('./assets/LyfGurad-white-logo.png')} // Replace with your image path
                    alt="Top Left"
                    style={styles.topLeftImage}
                />

                <h3 style={styles.secheading} >Privacy Policy</h3>
                <div style={styles.row}>
                    <h5>Home</h5>
                    <h5>Privacy Policy</h5>
                </div>
            </section>

            <div style={styles.heading} >
                <h3>Privacy Policy</h3>

            </div>

            {/* for User */}
            {selectedSection === 'user' && (
                <div style={{ margin: '60px', }}>
                    <p
      style={{
        fontSize: '14px', // Default font size for web
        textAlign: 'justify', // Justify text alignment
        lineHeight: '1.6', // Line height for readability
      }}
    >
                        Welcome to LYFGUARD (User Privacy Policy) (LYFGUARD, “We”, “us” or “our”,). LYFGUARD is an emergency ambulance app wherein we crater to the needs of Ambulance services. Our priorities are to protect a life. Our objective is to provide ambulance assistance to everyone during any medical, accidental or patient emergencies. Our Application (“App) is a platform between an individual and the ambulance service providers (“SP”). The LYFGUARD is a proprietary trademark in the name of LYFGUARD. All contents on this website or App are subject to copyright protections ©.
                        By engaging with the Site and/or App, you acknowledge you have read and understood this privacy policy.
                        For the purposes of the data protection laws, (the " Data Protection Law"), the data controller is:
                        • LYFGUARD, a brand under Medicloq Services Pvt Ltd , registered at #120 3rd cross 8th main 3rd phase JP Nagar Bengaluru - 560 078, Karnataka, India.
                        Information we collect about you
                        We will collect the following personal data from you:
                        Information you give us:
                        1.User information: We collect and process information when you create or update your LYFGUARD account. This may include your name, email, phone number, login name and password, address, payment or banking information (including related payment verification information), government identification numbers for example PAN card, AADHAR number if required by law, date of birth, photo and signature (digital or wet), photograph (an optional feature).
                        2.Demographic data: We may collect demographic information about you, including through user surveys. We might also receiver demographic information about you from any third party resources. This is pertinent to mention that such an information collected is strictly for the purpose of serving you better and more efficiently.
                        3.Contents of the User: We may collect information that you submit when you contact our customer support, such information is collected for training and quality purposes so as to enhance the efficiency of our services.
                        Information created by usage of our services
                        1.Information of the location: It is very pertinent to mention that to reach to any certain location at a stipulated point of time, we need the tracing of the geolocation of you. Therefore, depending upon your app settings or device permissions and satellite map settings, we may collect your approximate location information which can be procured through data such as GPS, IP address and Wifi or Mobile data connection.
                        2.Transaction information: We collect each transaction details related to your usage of our services, including the category of services you requested, your order details, delivery information, date and time the service was provided to you, the amount charged, distance traveled, and payment method. Additionally, if a user uses any promotional code wherein your recommendation was shared, we may associate your name with that new user.
                        3.Cookie Policy: Cookie enables us to provide our services to you better by collecting data files with respect to your behavior-based surfing through our App/Site. The following are the major reasons as to why we associate with any third part cookies:
                        To optimize the App interface and your user experience
                        To prepare statistical records on the usage of the App by you and other using your App.
                        To analyze such statistical data with the objective of improving products services and technologies
                        For marketing purposes to make our services and offers as relevant to you as possible
                        To adhere to compliances of applicable legislation (e.g. the Information Technology Act, 2000, the Contract Act, 1872, Information Technology (Procedures and Safeguards for Blocking for Access of Information) rules, 2009, etc.)
                        And lastly, it is to make you aware that the sessions of the Cookies are depended on the type of cookies stored in your mobile or computer i.e. session cookies or persistent cookies. You always have the right to choose whether you want to accept cookies. However, it is with these cookies we are able to improve the performance of our App much better and therefore refusing to let the cookies sink in, might impact the functionality of the Services. Also, to emphasis on the premise that removing or rejecting browser cookies do not necessarily implicate any third-party flash cookies which may be used by us or our partners in connection with our Services.
                        4.Additional Usage of Data Collection: Besides the specific usage of information that we elucidated in this Privacy Policy, we may use information that we have collected for the following purposes:
                        Help you efficiently access your information after you sign in
                        Storing information on your login so that you can login to our App during your visit to our portal.
                        Provide, improve, test and monitor the effectiveness of our Services
                        Develop and test new products or features or change the interface of the App or the website.
                        Monitoring the matrix to understand traffic, number of visitors and demographic patterns
                        To fix bugs and errors and diagnose any technology problems
                        Automatically update the interface, features or the App in itself.
                        5.Sharing of your information: We will not sell or rent information to any third party outside MediLoq without your consent, except as noted in this Policy.
                        6.Parties to whom the information can be shared: Strictly for the purpose of complying with the rules and regulations in India, we may share the information so requested by Government bodies or authorities. For legal reasons or in the event of a dispute we may share your information if we believe it is required by applicable law, regulation, operating agreement, legal process or governmental request, or where the disclosure is otherwise appropriate due to safety or similar concerns. This includes sharing your information with law enforcement officials, government authorities, airports (if required by the airport authorities as a condition of operating on airport property), or other third parties as necessary to enforce our Terms of Service, user agreements, or other policies, to protect LYFGUARD’s rights or property or the rights, safety or property of others, or in the event of a claim or dispute relating to your use of our services. If you use another person’s credit card, we may be required by law to share information with that credit card holder, including trip information. This also includes sharing your information with others in connection with, or during negotiations of, any merger, sale of company assets, consolidation or restructuring, financing, or acquisition of all or a portion of our business by or into another company.
                        7.We may collect and use your information on the basis of your consent. You may revoke your consent at any time. If you revoke your consent, you will not be able to use any service or feature that requires collection or use of the information we collected or used on the basis of consent.
                        8.Uber relies on consent in connection with data collections or uses that are necessary to enhance the user experience, to enable optional services or features, or to communicate with you. Location Information (Riders), Share Live Location (Riders), Notifications: Account and Trip Updates, Notifications: Discounts and News.
                        9.We may occasionally update this policy. If we make significant changes, we will notify you of the changes through our App or through others means, such as email or sms (Short Messing Services). To the extent permitted under applicable law, by using our services after such notice, you consent to our updates to this policy. We encourage you to periodically review this policy for the latest information on our privacy practices. We will also make prior versions of our privacy policies available for review.
                        10.All information you provide to us is stored on our secure servers. Where we have given you (or where you have chosen) a password which enables you to access certain parts of the Services, you are responsible for keeping this password confidential. We ask you not to share a password with anyone. Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your personal data, we cannot guarantee the security of your data transmitted to the services; any transmission is at your own risk. Once we have received your information, we will use strict procedures and security features to try to prevent unauthorized access. Our Site may, from time to time, contain links to external sites. We are not responsible for the privacy policies or the content of such sites.
                        11.For the purpose of resolving any disputes
                    </p>
                </div>
            )}


            {/* for Client */}

            {selectedSection === 'client' &&  (
                
                <div style={{ margin: '60px', }} ref={contactRef}>
                    <p
      style={{
        fontSize: '14px', // Default font size for web
        textAlign: 'justify', // Justify text alignment
        lineHeight: '1.6', // Line height for readability
      }}
    >
                        Welcome to LYFGUARD (Client Privacy Policy)  (LYFGUARD, “We”, “us” or “our”,). LYFGUARD is an emergency ambulance app wherein we crater to the needs of Ambulance services. Our priorities are to protect a life. Our objective is to provide ambulance assistance to everyone during any medical, accidental or patient emergencies. Our Application (“App) is a platform between an individual and the ambulance service providers (“SP”). The LYFGUARD is a proprietary trademark in the name of LYFGUARD. All contents on this website or App are subject to copyright protections ©.
                        By engaging with the Site and/or App, you acknowledge you have read and understood this privacy policy.
                        For the purposes of the data protection laws, (the " Data Protection Law"), the data controller is:
                        • LYFGUARD, a brand under Medicloq Services Pvt Ltd , registered at #120 3rd cross 8th main 3rd phase JP Nagar Bengaluru - 560 078, Karnataka, India.
                        Information we collect about you
                        We will collect the following personal data from you:
                        Information you give us:
                        1.User information: We collect and process information when you create or update your LYFGUARD account. This may include your name, email, phone number, login name and password, address, payment or banking information (including related payment verification information), government identification numbers for example PAN card, AADHAR number if required by law, date of birth, photo and signature (digital or wet), photograph (an optional feature).
                        2.Demographic data: We may collect demographic information about you, including through user surveys. We might also receiver demographic information about you from any third party resources. This is pertinent to mention that such an information collected is strictly for the purpose of serving you better and more efficiently.
                        3.Contents of the User: We may collect information that you submit when you contact our customer support, such information is collected for training and quality purposes so as to enhance the efficiency of our services.
                        Information created by usage of our services
                        1.Information of the location: It is very pertinent to mention that to reach to any certain location at a stipulated point of time, we need the tracing of the geolocation of you. Therefore, depending upon your app settings or device permissions and satellite map settings, we may collect your approximate location information which can be procured through data such as GPS, IP address and Wifi or Mobile data connection.
                        2.Transaction information: We collect each transaction details related to your usage of our services, including the category of services you requested, your order details, delivery information, date and time the service was provided to you, the amount charged, distance traveled, and payment method. Additionally, if a user uses any promotional code wherein your recommendation was shared, we may associate your name with that new user.
                        3.Cookie Policy: Cookie enables us to provide our services to you better by collecting data files with respect to your behavior-based surfing through our App/Site. The following are the major reasons as to why we associate with any third part cookies:
                        To optimize the App interface and your user experience
                        To prepare statistical records on the usage of the App by you and other using your App.
                        To analyze such statistical data with the objective of improving products services and technologies
                        For marketing purposes to make our services and offers as relevant to you as possible
                        To adhere to compliances of applicable legislation (e.g. the Information Technology Act, 2000, the Contract Act, 1872, Information Technology (Procedures and Safeguards for Blocking for Access of Information) rules, 2009, etc.)
                        And lastly, it is to make you aware that the sessions of the Cookies are depended on the type of cookies stored in your mobile or computer i.e. session cookies or persistent cookies. You always have the right to choose whether you want to accept cookies. However, it is with these cookies we are able to improve the performance of our App much better and therefore refusing to let the cookies sink in, might impact the functionality of the Services. Also, to emphasis on the premise that removing or rejecting browser cookies do not necessarily implicate any third-party flash cookies which may be used by us or our partners in connection with our Services.
                        4.Additional Usage of Data Collection: Besides the specific usage of information that we elucidated in this Privacy Policy, we may use information that we have collected for the following purposes:
                        Help you efficiently access your information after you sign in
                        Storing information on your login so that you can login to our App during your visit to our portal.
                        Provide, improve, test and monitor the effectiveness of our Services
                        Develop and test new products or features or change the interface of the App or the website.
                        Monitoring the matrix to understand traffic, number of visitors and demographic patterns
                        To fix bugs and errors and diagnose any technology problems
                        Automatically update the interface, features or the App in itself.
                        5.Sharing of your information: We will not sell or rent information to any third party outside MediLoq without your consent, except as noted in this Policy.
                        6.Parties to whom the information can be shared: Strictly for the purpose of complying with the rules and regulations in India, we may share the information so requested by Government bodies or authorities. For legal reasons or in the event of a dispute we may share your information if we believe it is required by applicable law, regulation, operating agreement, legal process or governmental request, or where the disclosure is otherwise appropriate due to safety or similar concerns. This includes sharing your information with law enforcement officials, government authorities, airports (if required by the airport authorities as a condition of operating on airport property), or other third parties as necessary to enforce our Terms of Service, user agreements, or other policies, to protect LYFGUARD’s rights or property or the rights, safety or property of others, or in the event of a claim or dispute relating to your use of our services. If you use another person’s credit card, we may be required by law to share information with that credit card holder, including trip information. This also includes sharing your information with others in connection with, or during negotiations of, any merger, sale of company assets, consolidation or restructuring, financing, or acquisition of all or a portion of our business by or into another company.
                        7.We may collect and use your information on the basis of your consent. You may revoke your consent at any time. If you revoke your consent, you will not be able to use any service or feature that requires collection or use of the information we collected or used on the basis of consent.
                        8.Uber relies on consent in connection with data collections or uses that are necessary to enhance the user experience, to enable optional services or features, or to communicate with you. Location Information (Riders), Share Live Location (Riders), Notifications: Account and Trip Updates, Notifications: Discounts and News.
                        9.We may occasionally update this policy. If we make significant changes, we will notify you of the changes through our App or through others means, such as email or sms (Short Messing Services). To the extent permitted under applicable law, by using our services after such notice, you consent to our updates to this policy. We encourage you to periodically review this policy for the latest information on our privacy practices. We will also make prior versions of our privacy policies available for review.
                        10.All information you provide to us is stored on our secure servers. Where we have given you (or where you have chosen) a password which enables you to access certain parts of the Services, you are responsible for keeping this password confidential. We ask you not to share a password with anyone. Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your personal data, we cannot guarantee the security of your data transmitted to the services; any transmission is at your own risk. Once we have received your information, we will use strict procedures and security features to try to prevent unauthorized access. Our Site may, from time to time, contain links to external sites. We are not responsible for the privacy policies or the content of such sites.
                        11.For the purpose of resolving any disputes
                    </p>
                </div>
            )}

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
                                alt="Address"
                                style={styles.cardlogo}
                            />
                            <h3 style={{ ...styles.cardTitle, color: hoveredStates[0] ? '#FFFFFF' : '#000000' }}  >Address</h3>
                            <p style={{ ...styles.cardDescription, color: hoveredStates[0] ? '#FFFFFF' : '#000000' }}># 120 3rd Cross 8th Main 3rd Phase Jp Nagar Bangaluru - 560078, Karnataka, India.</p>
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
                            <h3 style={{ ...styles.cardTitle, color: hoveredStates[1] ? '#FFFFFF' : '#000000' }}>Call us on</h3>
                            <p style={{ ...styles.cardDescription, color: hoveredStates[1] ? '#FFFFFF' : '#000000' }}>+1800 889 1280 (Toll free)</p>
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
                            <h3 style={{ ...styles.cardTitle, color: hoveredStates[2] ? '#FFFFFF' : '#000000' }}>Mail at</h3>
                            <p style={{ ...styles.cardDescription, color: hoveredStates[2] ? '#FFFFFF' : '#000000' }}>reach@lyfguard.in (For Business)
                                support@lyfguard.in (For Help Center)</p>
                        </div>
                    </Col>

                </Row>
            </Container>

            <FooterScreen />
        </div>

    );
};

const styles = {
    section1: {
        display: 'flex',
        flexDirection: 'column', // Align items vertically
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        height: '300px',
        padding: '20px',
        backgroundColor: '#066951',
        backgroundImage: `url(${require('./assets/LyfGuardLogo.png')})`,
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    secheading: {
        color: "white",
        fontSize: "45px",
        marginTop: '5%'
    },
    topLeftImage: {
        position: 'absolute',
        top: '15%',
        // right: '2%',
        width: '100px',
        height: 'auto',
        zIndex: 1,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '10px',
        color: 'white',
    },
    heading: {
        marginTop: "8%",
        textAlign: 'center',
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
        marginTop: '4%',
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
};


export default PrivacyScreen;

import FooterScreen from './footer';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useRef, contactRef , useEffect} from 'react';
import FloatingButton from './FloatingButton';
import Navigation from './navbar';
// import Navigation from './navbar';

const TermsandConditionScreen = () => {

    const [hoveredStates, setHoveredStates] = useState([false, false, false]);
    
    const sliderRef = useRef(null);
    const overViewRef = useRef(null);
    const teamRef = useRef(null);
    const contactRef = useRef(null);
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
    useEffect(() => {
        if (contactRef.current) {
          contactRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, []);
      
      
      
       
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


            <section  style={styles.section1}>
                <img
                    src={require('./assets/LyfGurad-white-logo.png')} // Replace with your image path
                    alt="Top Left"
                    style={styles.topLeftImage}
                />

                <h3 style={styles.secheading} >Terms & Condition</h3>
                <div style={styles.row}>
                    <h5>Home</h5>
                    <h5 >Terms & Condition</h5>
                </div>
            </section>

            <div style={styles.heading}>
                <h3>Terms & Conditions</h3>
            </div>

            <div style={{ margin: '60px', }}>
            <p
      style={{
        fontSize: '14px', // Default font size for web
        textAlign: 'justify', // Justify text alignment
        lineHeight: '1.6', // Line height for readability
      }}
    >
                    These terms and conditions (“User Terms”) apply to Your visit to and use, of the Site whether through a computer or a mobile phone, the Service and the Application, as well as to all information, recommendations and or services provided to You on or through the Site, the Service and the Application. This document is an electronic record in terms of Information Technology Act, 2000 and rules thereunder as applicable and the provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000
                    Your acceptance of the User Terms shall be deemed to include your acceptance of the privacy policy available at https//www.lyfguard.in. By accepting these User Terms, you also allow Lyfguard to send you promotional emails and SMS alerts from time to time.
                    1. DEFINITIONS
                    All of the defined and capitalized terms in these User Terms will have the meaning assigned to them here below:
                    (i) “Account” shall mean the account created by the Customer on the Application for availing the Services provided by Lyfguard.
                    (ii) “Additional Fee” shall mean any toll duty, inter-state taxes, etc. as may not be included in the Fare or not already paid as a part of the Total Ride Fee but payable to any third party / government authorities for undertaking the Ride under Applicable Law.
                    (iii) “Applicable Laws” shall mean and include all applicable statutes, enactments, acts of legislature or parliament, laws, ordinances, rules, by-laws, regulations, notifications, guidelines, policies, directions, directives and orders of any governmental authority, tribunal, or a court of India.
                    (iv) “Application” shall mean the mobile application “Lyfguard” updated by Lyfguard from time to time.
                    (v) “Convenience Fee”/” Access Fee” shall mean the fee payable by the Customer to Lyfguard for the Service i.e., for availing the technology services offered by Lyfguard Convenience Fee shall be chargeable on every booking made through the Site. The Convenience Fee shall be exclusive of all applicable taxes on the Convenience Fee, if any.
                    (vi) “Cancellation Fee” shall mean the Fare and Convenience Fee payable towards cancellation of a booking by a Customer in terms of Clause 7 of these User Terms and the Cancellation Terms and Conditions. The Cancellation Fee shall be exclusive of all applicable taxes on the Cancellation Fee, if any.
                    (vii) “Customer/ You” means a person who has an Account on the Application.
                    (viii) “Fare” shall mean such amount in Indian Rupees, which is reflected on the Application, as the fare payable for the specific Ride performed by a Driver. The Fare shall be exclusive of all applicable taxes on the Fare, if any.
                    (ix) “Force Majeure Event” shall mean any event arising due to any cause beyond the reasonable control of Lyfguard.
                    (x) “LYFGUARD” or “us” or “we” or “our” shall mean a brand under Medicloq Services Private Limited, a company incorporated under the provisions of the Companies Act, 2013 and having its corporate office at #120 3rd cross 8th main 3rd Phase JP Nagar Bengaluru-560078 Karnataka, India, which expression shall, unless it be repugnant to the context or meaning thereof, be deemed to mean and include all its successors, affiliates and permitted assigns.
                    (xi) “Ride” shall mean the travel in the Vehicle by the Customer facilitated through the Site.
                    (xii) “Service(s)” means the facilitation of transportation service by Lyfguard through the Application, within the City of Operation.
                    (xiii) “Total Ride Fee” shall mean and include the Fare, the Convenience Fee or Access Fee, the Cancellation Fee and Additional Fee and taxes as may be applicable from time to time.
                    (xiv) “T&Cs” and “User Terms” shall mean these Customer terms and conditions.
                    (xv) “Vehicle” shall mean a motor cab as defined under the Motor Vehicles Act,1988.
                    2. ELIGIBILITY
                    You will be “Eligible” to use the Services only when You fulfil all the following conditions:
                    (i)You are at least 18 (eighteen) years of age.
                    (ii)You are competent to enter into a contract under the Applicable Laws.
                    If You reside in a jurisdiction that restricts the use of the Service because of age or restricts the ability to enter into contracts such as this User Terms due to age, You must abide by such age limits.
                    3. REGISTRATION AND ACCOUNT
                    3.1 You are solely responsible for maintaining the confidentiality of Your Registration Data. Your Account cannot be transferred, assigned or sold to a third party. We shall not be liable for any loss that You may incur as a result of someone else using Your password or Account, either with or without Your knowledge.
                    3.2 We reserve the right to suspend or terminate Your Account with immediate effect without any prior notice.
                    4. SERVICES
                    4.1. The Site permits you to avail the ambulance services offered by third party ambulance providers.
                    4.2. Lyfguard reserves the right to immediately terminate the Service and the use of the Application in the event of non-compliance with any of the above requirements.
                    4.3. You agree to grant Lyfguard a non-exclusive, worldwide, perpetual, irrevocable, royalty- free, sub-licensable (through multiple tiers) right to exercise the copyright, publicity, database rights or any other rights You have in your information, in any media now known or not currently known, with respect to Your information. YOU AGREE AND PERMIT Lyfguard TO SHARE YOUR INFORMATION AND/OR PERMITTED INFORMATION, WITH THIRD PARTIES.
                    4.4. We bear no responsibility and liability for delays and losses suffered by You or caused to You as a consequence of the breakdown of the Vehicle.
                    5. CONFIRMATION OF BOOKING
                    5.1. We shall, upon receiving the booking request from You in the manner set out above, proceed to confirm or decline the booking based on the availability of Ambulances at the pickup time, which shall be informed to You vide an SMS or email. In the event the booking is confirmed, You shall check the booking details including but not limited to pick up time and pick up place, and if there is incorrect detail, the same needs to be informed to us immediately by calling our support team.
                    5.2. You shall bear the consequences and damages for any delay that may be caused to You due to Your failure to check the confirmation SMS or email or failure to inform “us” of the incorrect details immediately.
                    6. PAYMENT
                    6.1. Lyfguard shall charge Convenience Fee or Access Fee for the Service which shall be determined and amended at the sole and absolute discretion of Lyfguard. The Convenience Fee or Access Fee shall be payable by you to Lyfguard and shall be informed to you before you begin your ride.
                    6.2. You shall be required to pay such Cancellation Fee in, which will form part of the receipt of the Total Ride Fee. In addition to the Total Ride Fee, You may be required to pay such other charges incurred by you during the Ride in cash i.e. Additional Fee, which are not included in the receipt of the Total Ride Fee.
                    6.3. Furthermore, all the booking/service requests will have to be in prepayment mode.
                    6.4. All applicable taxes in respect of the Fare, Convenience Fee, Additional Fee, Cancellation Fee shall be borne and payable by You to Lyfguard, as the case may be.
                    7. CANCELLATION POLICY
                    7.1. You agree and acknowledge that You may cancel Your request for a Vehicle from a Driver at any point of time subject to a Cancellation Fee as explained below:
                    You shall be notified and charged with the Cancellation Fee in advance whenever You attempt to cancel a booking/service request. The Cancellation Fee charged will be half the total Fee of the booking/service request.
                    8. USER VIOLATION OF USER TERMS
                    8.1. You shall not smoke and drink in the Vehicles or misbehave with the Driver or distract the Driver or act in violation of Applicable Law. In the event You are found to be involved in the activities set out above, You shall be liable to pay a fine to us and we shall also have the right to terminate the Ride.
                    9. CUSTOMER RELATIONSHIP MANAGEMENT
                    9.1. All issues, opinions, suggestions, questions and feedback while availing our Services shall be communicated to us through email address reach@lyfguard.in
                    9.2. Reporting of any issue needs to be within 7 (seven) days of the happening of the issue, failing which, such issue will not be addressed.
                    10. FORCE MAJEURE
                    10.1 We shall not be liable for any failure to perform any obligations under this User Terms, if the performance is prevented, hindered or delayed by a Force Majeure Event and in such case our obligations under this User Terms shall be suspended for so long as the Force Majeure Event continues.
                    11. INDEMNIFICATION
                    11.1 By accepting these User Terms and using the Service, You agree that You shall defend, indemnify and hold Lyfguard, its affiliates, their licensors, and each of its officers, directors, other users, employees, attorneys and agents harmless from and against any and all claims, costs, damages, losses, liabilities and expenses (including attorneys' fees and costs) arising out of or in connection with: (a) Your violation or breach of any term of these User Terms or any Applicable Law or regulation, whether or not referenced herein; (b) Your violation of any rights of any third party, (c) Your use or misuse of the Application or Service.
                    12. LIABILITY
                    12.1. The information, recommendations and/or Services provided to You on or through the Site, the Application and Lyfguard support center are for general information purposes only and does not constitute advice. Lyfguard will reasonably keep the Site and its contents correct and up to date but does not guarantee that (the contents of) the Site is free of errors, defects, malware and viruses or that the Site is correct, up to date and accurate.
                    12.2. Lyfguard shall not be liable for any death, critical heart failure, cardiac arrest, paralysis, brain damage, coma or any such critical medical situation that might occur during the scope of the trip. Medical emergency requires the assistance of a professional help and Lyfguard does not guarantee nor shall be liable for any medical critical situation arising during the course of the trip. Lyfguard is solely responsible for providing a platform for a fast transfer of patient from one place to the hospitals/clinic or emergency centers.
                    12.3. Lyfguard shall not be liable for any damages resulting from the use of or inability to use the Site, including damages caused by wrong usage of the Site, error in support center number, network issues, malware, viruses or any incorrectness or incompleteness of the Information or the or Application.
                    12.4. IN NO EVENT SHALL Lyfguard BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES OR FOR ANY DAMAGES WHATSOEVER, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF Lyfguard HAS BEEN ADVISED OF THE POSSIBILITY THEREOF.
                    12.5. IN ADDITION, AND WITHOUT LIMITING THE FOREGOING, TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL Lyfguard’s AGGREGATE LIABILITY ARISING OUT OF OR IN CONNECTION WITH THESE USER TERMS OR THE SERVICES RENDERED HEREUNDER, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE, PRODUCT LIABILITY, OR OTHER THEORY), WARRANTY, OR OTHERWISE, EXCEED THE AMOUNT OF Rs. 2000/- (Rupees Two Thousand only).
                    13. APPLICATION LICENSE
                    13.1. Subject to Your compliance with these User Terms, Lyfguard grants You a limited, revocable, non-exclusive, non-transferable and non-sub-licensable license to download and install a copy of the Application on a single mobile device that You own or control and to run such copy of the Application solely for Your own personal use and to use the Site.
                    14. INTELLECTUAL PROPERTY OWNERSHIP
                    14.1. Lyfguard alone (and its licensors, where applicable) shall own all right, title and interest, including all related intellectual property rights, in and to (i) the Site, Application, product, Service and any suggestions, ideas, enhancement requests, feedback, recommendations or any other offering; (ii) text, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork and computer code; or (iii) other information provided by You or any other party relating to the Site, Application or the Service. Third party trademarks may appear on this Site/ Application and all rights therein are reserved to the registered owners of those trademarks. For use of any third party's intellectual property, You need to get permission directly from the owner of the intellectual property for any use.
                    14.2. These User Terms do not constitute a sale and do not convey to You any rights of ownership in or related to the Site, the Application or the Service, or any intellectual property rights owned by Lyfguard. You shall be solely responsible for any violations of any laws and for any infringements of any intellectual property rights caused by use of the Services or the Site/ Application.
                    15. MODIFICATION OF THE SERVICE AND USER TERMS
                    15.1. Lyfguard reserves the right, at its sole discretion, to modify or replace, in part or full, any of these User Terms, or change, suspend, block, discontinue or restrict your use to all or any feature of the Service or Application at any time.
                    15.2. Lyfguard shall not be required to notify You of any changes made to these User Terms. The revised User Terms shall be made available on the Site. You are requested to regularly visit the Site to view the most current User Terms.
                    16. APPLICABLE LAW AND DISPUTE RESOLUTION
                    These User Terms are subject to the laws of India. Any dispute, claim or controversy arising out of or relating to these User Terms or the breach, termination, enforcement, interpretation or validity thereof or the use of the Site, the Service or the Application (collectively, “Disputes”) the parties shall attempt to settle the same amicably, through negotiation and consultation at such offices of Lyfguard as we may designate. In the event the dispute is not resolved internally between after at least 30 (thirty) days of negotiation, in good faith, the same shall be subject to binding and final arbitration in accordance with the Arbitration and Conciliation Act, 1996 as amended from time to time or in case the Arbitration and Conciliation Act, 1996 is no longer in force, as per any law relating to arbitration in force at the time of such reference. The reference shall be made to a sole arbitrator mutually appointed by Lyfguard and You. The place of the arbitration shall be Bengaluru, Karnataka, unless otherwise mutually agreed by Lyfguard and You in writing. Subject to the above, any Dispute will be subject to the exclusive jurisdiction of courts in Bangalore, India.
                </p>
            </div>

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
    '@media (min-width: 769px)': {
    topLeftImage: {
      top: '10%'
    },
  },
};


export default TermsandConditionScreen;

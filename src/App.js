import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import BookingScreen from './screens/login';
import OTPScreen from './screens/otp';
import ServiceScreen from './screens/services';
import Moreservices from './screens/moreservices';
import EmergencyScreen from './screens/emergency';
import Map from './screens/map';
import DriverScreen from './screens/driver';
import ServiceDetail from './screens/policedetailes';
import PreferredHospitalsScreen from './screens/preferredhospitl';
import ProfileScreen from './screens/profile';
import JoinUsScreen from './screens/joinus';
import FirstAidservices from './screens/firstaidcategory';
import FirstAidServiceDetail from './screens/firstaidcategorybyid';
import PrivacyScreen from './screens/policy';
import TermsandConditionScreen from './screens/terms&condition';
// import PrivateAmbulance from './screens/private_ambulance';
import MapComponent from './screens/googlemap';
import BasicAmbulance from './screens/BasicAmbulance';
import Aboutus from './screens/Aboutus';
import Modal from './screens/modal';
// import Contact from './screens/Contact'
import Contactus from './screens/Contactus'


function App() {
  return (
    <Router>
      <Routes>
      
        <Route exact path="/" element={<Home />} />
        <Route path="/booking" element={<BookingScreen />} />
        <Route path="/otp" element={<OTPScreen />} />
        <Route path="/services" element={<ServiceScreen />} />
        <Route path="/moreServices" element={<Moreservices />} />
        <Route path="/SelectEmergency" element={<EmergencyScreen />} />
        <Route path="/map" element={<Map />} />
        <Route path="/driver" element={<DriverScreen />} />
        <Route path="/service-detail/:id/:slug" element={<ServiceDetail />} />
        <Route path="/YourPreferred" element={<PreferredHospitalsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/join" element={<JoinUsScreen />} />
        <Route path="/firstaid" element={<FirstAidservices />} />
        <Route path="/firstaidservice/:id/:slug" element={<FirstAidServiceDetail />} />
        <Route path="/privacy" element={<PrivacyScreen/>} />
        <Route path="/tc" element={<TermsandConditionScreen/>} />
        {/* <Route path="/private" element={<PrivateAmbulance/>} /> */}
        <Route path="/private" element={<MapComponent />} />
        <Route path="/basic-ambulance" element={<BasicAmbulance />} />
        <Route path="/firstaid" element={<FirstAidservices />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/modal" element={<Modal />} />
        {/* <Route path="/contact" element={<Contact/>} /> */}
        <Route path="/contactus" element={<Contactus/>} />

      </Routes>
    </Router>
  );
}

export default App;

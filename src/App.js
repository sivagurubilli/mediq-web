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
import ServiceDetail from './screens/policedetailes'
import PreferredHospitalsScreen from './screens/preferredhospitl'

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
        <Route path="/police" element={<ServiceDetail />} />
        <Route path="/YourPreferred" element={<PreferredHospitalsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;

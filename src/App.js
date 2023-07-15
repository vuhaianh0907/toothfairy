import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import Navigation from './Home/header';
import Banner from './BodyContent/banner/banner.js';
import Login from './BodyContent/accout/login/LoginBar';
import Doctor from './BodyContent/Doctor';
import Register from './BodyContent/accout/Register/Register';
import ForgotPassword from './BodyContent/accout/ForgotPassword/ForgotPassword';
import Footer from './Footer/footer';
import DocDetail from './BodyContent/DocDetail';
import Worksheet from './BodyContent/Worksheet';
import ViewTreatmentProfile from './BodyContent/Doctor/ViewTreatmentProfile/ViewTreatmentProfile';
import ViewTreatementList from './BodyContent/Doctor/ViewTreatmentList/ViewTreatementList';
import CreateTreatementIn from './BodyContent/Doctor/CreateTreatementIn/CreateTreatmentIn';
import Doctorviewbooking from './BodyContent/Doctor/Doctorviewbooking/viewBooking';
import DoctorViewPatientProfile from './BodyContent/Doctor/ViewPatientProfile/PatientProfile';
import DoctorTimeSlotPages from './BodyContent/Doctor/TimeSlotsPage/TimeSlotsPage';
import DoctorRebook from './BodyContent/Doctor/RebookAppointment/RebookAppointment';
import CreateDoctor from './BodyContent/Admin/CreateDoctor/CreateDoctor';
import CreateSlot from './BodyContent/Admin/CreateSlot/AdminCreateSlot';
import DoctorList from './BodyContent/Admin/ViewDoctorList/DoctorList';
import DoctorDetail from './BodyContent/Admin/ViewDocDetail/DoctorDetail';
import DoctorUpdate from './BodyContent/Admin/UpdateDoctor/UpdateDoctor';
import Transaction from './BodyContent/Admin/Transaction/Transaction';
import ChangePass from './BodyContent/accout/ChangePass/ChangePass';
import AddAmountPage from './BodyContent/Admin/AddAmountPage/AddAmountPage';
import AmountPage from './BodyContent/Admin/UpdateAmountPage/UpdateAmountPage';
import Cancellation from './BodyContent/Admin/CancellationRequests/CancellationRequests';
import CustomerViewBooking from './BodyContent/customer/CustomerViewBooking/CustomerViewBooking';
import CustomerViewDoctor from './BodyContent/customer/CustomerViewDoctor/CustomerViewDoctor';
import ViewDocDetail from './BodyContent/customer/ViewDocDetail/ViewDocDetail';
import CustomerProfile from './BodyContent/customer/ViewProfile/UserProfile';
import CustomerEditProfile from './BodyContent/customer/EditProfile/EditProfile';
import CustomerViewTreatmentIn from './BodyContent/customer/ViewTreatmentIn/TreatmentProcess';
import CustomerViewProfileTreatment from './BodyContent/customer/ViewProFileTreatment/MedicalRecord';
import CustomerWriteAppointment from './BodyContent/customer/WriteAppointment/AppointmentForm';
import CustormerViewBookingDetail from './BodyContent/customer/ViewBookingDetail/ViewBookingDetail';
import CustormerViewTreatmentProfileList from './BodyContent/customer/treatmentprofilelist/treatmentprofilelist';
import CustormerWallet from './BodyContent/customer/TopUpWallet/TopUpWallet';

import DoctorViewprofile from './BodyContent/Doctor/Viewprofile/Viewprofile';
import DoctorUpdateprofile from './BodyContent/Doctor/UpdateProfile/UpdateProfile';

// import testthu from './BodyContent/Admin/test/test';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Thực hiện các hành động cần thiết khi logout
  };

  return (

    <div>
      <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path='/doctor' exact element={<Doctor />} />
        {/* customer/doctor */}
        <Route path='/doctor/:id' element={<DocDetail />} />
        {/* trang detail bs sẽ xem đc bằng cả guest và cust, id ko nên đc hiện trên đường dẫn*/}

        <Route path='/Login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/' exact element={<Banner />} />
        <Route path='/Worksheet' element={<Worksheet />} />
        <Route path='/changepass' element={<ChangePass />} />

        {/* admin */}
        <Route path='/admin/createdoctor' element={<CreateDoctor />} />
        <Route path='/admin/createslot' element={<CreateSlot />} />
        <Route path='/admin/doctorlist' element={<DoctorList />} />
        <Route path='/admin/doctordetail/:doctorId' element={<DoctorDetail />} />
        <Route path='/admin/doctor/update/:doctorId' element={<DoctorUpdate />} />
        
        <Route path='/admin/cancellation' element={<Cancellation />} />
        <Route path='/admin/transaction' element={<Transaction />} />
        <Route path='/admin/addamount' element={<AddAmountPage />} />
        <Route path='/admin/amount' element={<AmountPage />} />


        {/* custormer */}
        <Route path='/customer/profile/:id' element={<CustomerProfile />} />
        <Route path='/customer/profile/edit/:id' element={<CustomerEditProfile />} />
        <Route path='/customer/treatmentprofile/treatment' element={<CustomerViewTreatmentIn />} />
        <Route path='/customer/treatmentprofile/:id' element={<CustomerViewProfileTreatment />} />
        <Route path='/customer/treatmentprofilelist/:id' element={<CustormerViewTreatmentProfileList />} />
        <Route path='/customer/slot/appointment/:id' element={<CustomerWriteAppointment />} />
        <Route path='/customer/booking/:id' element={<CustomerViewBooking />} />
        <Route path='/customer/booking/detail/:id' element={<CustormerViewBookingDetail />} />
        <Route path='/customer/listdoctor' element={<CustomerViewDoctor />} />
        <Route path='/customer/doctordetail/:id' element={<ViewDocDetail />} />
        <Route path='/customer/topupwallet/:id' element={<CustormerWallet />} />




        <Route path='/doctor/viewTreatmentProfile/:id' element={<ViewTreatmentProfile />} />
        {/* doc/treatment/detail */}
        <Route path='/doctor/treatmentlist' element={<ViewTreatementList />} />
        <Route path='/doctor/writetreatmentin/:id' element={<CreateTreatementIn />} />
        <Route path='/doctor/profile/:id' element={<DoctorViewprofile />} />
        <Route path='/doctor/updateprofile/:id' element={<DoctorUpdateprofile />} />
        <Route path='/Doctorviewbooking/:id' element={<Doctorviewbooking />} />
        <Route path='/Doctor/viewpatientprofile/:id' element={<DoctorViewPatientProfile />} />
        <Route path='/Doctor/doctorbook' element={<DoctorTimeSlotPages />} />
        <Route path='/Doctor/rebook/:id' element={<DoctorRebook />} />
    


        {/* customer */}
        
        

      </Routes>
      <Footer />
    </div>

  );
}

export default App;

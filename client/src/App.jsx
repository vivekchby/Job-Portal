import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';
import RecruiterLogin from './components/RecruiterLogin';
import { AppContext } from './context/AppContext.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddJob from './pages/AddJob.jsx';
import ManageJobs from './pages/ManageJobs.jsx';
import ViewApplications from './pages/ViewApplications.jsx';
import 'quill/dist/quill.snow.css'

function App() {
  const { showRecruiterLogin } = React.useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />

        {/* Dashboard Nested Routes */}
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='add-job' element={<AddJob />} />
          <Route path='manage-jobs' element={<ManageJobs />} />
          <Route path='view-applications' element={<ViewApplications />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

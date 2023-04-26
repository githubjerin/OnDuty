import FacultyHome from './pages/facultyHome.page.jsx';
import StudentHome from './pages/studentHome.page.jsx';
import Landing from './pages/landing.page.jsx';
import ProtectedRoutes from './protectedRoutes.js';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  useNavigate
} from "react-router-dom";
import React from 'react';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={ <Landing navigate={useNavigate}/> }/>
          <Route element={ <ProtectedRoutes/> }>
            <Route path="/faculty-home" element= { <FacultyHome/> }/>
            <Route path="/student-home" element= { <StudentHome/> }/>
          </Route>
        </Routes>
    </Router>
  );
}


export default App;
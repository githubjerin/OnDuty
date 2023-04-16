import FacultyHome from './components/pages/facultyHome.page.jsx';
import StudentHome from './components/pages/studentHome.page.jsx';
import Landing from './components/pages/landing.page.jsx';
import ProtectedRoutes from './components/protectedRoutes.js';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  useNavigate
} from "react-router-dom";


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

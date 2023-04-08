import Landing from './components/landing/landing.page.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={ <Landing/> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

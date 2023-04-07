import './App.css';
import Landing from './components/landing/landing.page.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Landing/> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

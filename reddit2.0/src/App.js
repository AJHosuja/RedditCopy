import Content from "./componets/Content";
import Navbar from "./componets/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubmitPost from "./componets/submitPost/SubmitPost";



function App() {
  return (
    <Router>
    
    <Navbar/>
      <Routes>
      <Route path="/" element= {
        <Content />
      } />

      <Route path="/submit" element= {
        <SubmitPost />
      } />

    </Routes>
    </Router>
  );
}

export default App;

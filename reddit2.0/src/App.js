import Content from "./componets/Content";
import Navbar from "./componets/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubmitPost from "./componets/submitPost/SubmitPost";
import PostWithComments from "./componets/postWithComments.jsx/PostWithComments";



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

      <Route path="/post/:postID" element= {
        <PostWithComments />
      } />
    </Routes>
    </Router>
  );
}

export default App;

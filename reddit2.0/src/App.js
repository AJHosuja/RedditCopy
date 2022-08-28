import Content from "./componets/Content";
import Navbar from "./componets/navbar/Navbar";
import { BrowseRouter as Router, Route } from "react-router-dom"


function App() {
  return (
    <>
    <Navbar/>
    <Content />
    </>
  );
}

export default App;

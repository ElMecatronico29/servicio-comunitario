import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import imagenPlaza from "../assets/unet-plaza.png"
import News from "../components/News";

const Home = () => {
  return (
    <>
      <Header position="relative" />
      <Navbar/>
      <img src={imagenPlaza} className='h-72 w-full '  />
      <News />
    </>
  );
};

export default Home;

import Topbar from "../../components/Topbar/Topbar";
import Footer from "../../components/Footer";
import Image from "../../images/plep.png";

const Main = () => {
  return (
    <main>
      <Topbar />
      <img className="bg-img" src={Image} alt="" />
      <Footer />
    </main>
  );
};

export default Main;

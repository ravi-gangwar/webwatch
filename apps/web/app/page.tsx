import Background from "../lib/ui/Background";
import MainPage from "../components/Landing/MainPage";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <Background type="landing">
      <Navbar />
      <MainPage />
    </Background>
  );
}

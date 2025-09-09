import Background from "../lib/ui/Background";
import MainPage from "../components/Landing/MainPage";
import Navbar from "../components/Navbar";
import QuickMonitor from "../components/Landing/quickmonitor/MainPage";

export default function Home() {
  return (
    <Background type="landing">
      <Navbar />
      <MainPage />
      <QuickMonitor />
    </Background>
  );
}

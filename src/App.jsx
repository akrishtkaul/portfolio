import { NavigationBar } from "./components/NavigationBar";
import AboutMe from "./components/AboutMe";
import Experiences from "./components/Experiences";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import BackgroundMusic from "./components/BackgroundMusic";

export default function App() {
  return (
    <>
      <BackgroundMusic />

      <NavigationBar />
      <main>
        <section id="about"><AboutMe /></section>
        <section id="experience"><Experiences /></section>
        <section id="projects"><Projects /></section>
        <section id="footer"><Footer /></section>
      </main>
    </>
  );
}

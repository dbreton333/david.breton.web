'use client'
import styles from "./page.module.css";
import NavBar from "./components/NavBar";
import Introduction from "./components/home_sections/IntroductionSection";
import AwardsSection from "./components/home_sections/AwardsSection";
import InfiniteCarousel from "./components/molecules/InfiniteCarousel";
import EducationSection from "./components/home_sections/EducationSection";
import ExperienceSection from "./components/home_sections/ExperienceSection";
import SkillSection from "./components/home_sections/SkillSection";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function Home() {

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    })
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <NavBar/>
        <Introduction/>
      </div>
      <div className={styles.second_container}>
        <AwardsSection/>
      </div>
      <InfiniteCarousel/>
      <div className={styles.container}>
        <EducationSection/>   
      </div>
      <div className={styles.second_container}>
        <ExperienceSection/>
      </div>
      <div className={styles.container}>
        <SkillSection/>
      </div>
      <Footer/>
    </div>  
  );
}

'use client'
import styles from "./page.module.css";
import NavBar from "./components/NavBar";
import Introduction from "./components/home_page_sections/IntroductionSection";
import AwardsSection from "./components/home_page_sections/AwardsSection";
import InfiniteCarousel from "./components/molecules/InfiniteCarousel";
import EducationSection from "./components/home_page_sections/EducationSection";
import ExperienceSection from "./components/home_page_sections/ExperienceSection";
import SkillSection from "./components/home_page_sections/SkillSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={`${styles.container} ${styles.dark}`}>
        <NavBar/>
        <Introduction/>
      </div>
      <div className={`${styles.section} ${styles.light}`}>
        <AwardsSection/>
      </div>
      <div className={styles.dark}>
        <InfiniteCarousel/>
      </div>
      <div className={`${styles.section} ${styles.light}`}>
        <EducationSection/>
      </div>
      <div className={`${styles.section} ${styles.dark}`}>
        <ExperienceSection/>
      </div>
      <div className={`${styles.section} ${styles.light}`}>
        <SkillSection/>
      </div>
      <Footer/>
    </div>
  );
}

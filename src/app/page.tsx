import styles from "./page.module.css";
import NavBar from "./components/NavBar";
import Introduction from "./components/sections/IntroductionSection";
import AwardsSection from "./components/sections/AwardsSection";
import InfiniteCarousel from "./components/molecules/InfiniteCarousel";
import EducationSection from "./components/sections/EducationSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import SkillSection from "./components/sections/SkillSection";
import Footer from "./components/Footer";

export default function Home() {

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
      <div className={styles.container}>
        <Footer/>
      </div>
    </div>  
  );
}

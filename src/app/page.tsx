import styles from "./page.module.css";
import HeaderV1 from "./components/HeaderV1";
import Introduction from "./components/IntroductionSection";
import AwardsSection from "./components/AwardsSection";
import CarouselSection from "./components/CarouselSection";
import EducationSection from "./components/EducationSection";

export default function Home() {
  
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <HeaderV1/>   
        <Introduction/>
      </div>
      <div className={styles.second_container}>
        <AwardsSection/>
      </div>
      <CarouselSection/>
      <div className={styles.container}>
        <EducationSection/>   
      </div>
    </div>  
  );
}

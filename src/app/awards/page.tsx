'use client'
import styles from "../page.module.css";
import NavBar from "../components/NavBar";
import { AwardContent } from "../components/award_sections/AwardContent";
import Footer from "../components/Footer";
import { AnimatedBackgoundAmongUs } from "../components/molecules/AnimatedBackgroundAmongUs";


export default function Awards() {
  return (
    <div className={styles.main}>
       <AnimatedBackgoundAmongUs/>
      <div className={styles.container}>
          <NavBar/>   
      </div> 
      <div className={styles.container}>
        <AwardContent/>
      </div>
      <Footer/>
    </div>  
  );
}

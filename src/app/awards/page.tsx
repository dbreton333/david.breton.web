'use client'
import styles from "../page.module.css";
import NavBar from "../components/NavBar";
import { AwardContent } from "../components/award_page_sections/AwardContent";
import Footer from "../components/Footer";
import { AnimatedBackgound } from "../components/molecules/AnimatedBackground";


export default function Awards() {
  return (
    <div className={styles.main}>
       <AnimatedBackgound/>
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

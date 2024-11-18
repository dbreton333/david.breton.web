import Image from "next/image";
import styles from "../page.module.css";
import NavBar from "../components/NavBar";
import { AwardContent } from "../components/award_sections/AwardContent";
import Footer from "../components/Footer";

export default function Awards() {
  return (
    <div className={styles.main}>
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

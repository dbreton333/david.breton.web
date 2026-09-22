'use client'
import styles from "../page.module.css";
import NavBar from "../components/NavBar";
import { AwardContent } from "../components/award_page_sections/AwardContent";
import Footer from "../components/Footer";


export default function Awards() {
  return (
    <div className={styles.main}>
      <div className={`${styles.container} ${styles.light}`}>
          <NavBar/>
          <div className={styles.section} style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}>
            <AwardContent/>
          </div>
      </div>
      <Footer/>
    </div>
  );
}

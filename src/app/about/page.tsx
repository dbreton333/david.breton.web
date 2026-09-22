'use client'
import styles from "../page.module.css";
import NavBar from "../components/NavBar";
import {ComingSoon} from "../components/molecules/ComingSoon";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className={styles.main}>
      <div className={`${styles.container} ${styles.light}`} style={{ minHeight: '100vh' }}>
          <NavBar/>
          <ComingSoon/>
      </div>
      <Footer/>
    </div>
  );
}

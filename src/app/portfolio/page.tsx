'use client'
import styles from "../page.module.css";
import NavBar from "../components/NavBar";
import { ComingSoon } from "../components/molecules/ComingSoon";
import { AnimatedBackgound } from "../components/molecules/AnimatedBackground";

export default function Home() {
  return (
    <div className={styles.main}>
      <AnimatedBackgound/>
      <div className={styles.container}>
        <NavBar/>   
      </div>  
      <ComingSoon/>
    </div>  
  );
}

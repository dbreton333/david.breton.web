import Image from "next/image";
import styles from "../page.module.css";
import NavBar from "../components/NavBar";

export default function About() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
          <NavBar/>   
      </div>
    </div>  
  );
}

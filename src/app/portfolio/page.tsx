import Image from "next/image";
import styles from "../page.module.css";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <NavBar/>   
      </div>  
    </div>  
  );
}

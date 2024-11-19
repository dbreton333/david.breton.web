import styles from "../page.module.css";
import NavBar from "../components/NavBar";
import { ComingSoon } from "../components/molecules/ComingSoon";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <NavBar/>   
      </div>  
      <ComingSoon/>
    </div>  
  );
}

import Image from "next/image";
import styles from "../page.module.css";
//headerV1
import HeaderV1 from "../components/HeaderV1";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <HeaderV1/>   
      </div>  
    </div>  
  );
}

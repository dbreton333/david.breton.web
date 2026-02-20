'use client'
import styles from "../page.module.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { GameRules } from "../components/colosseum/GameRules";
import dynamic from 'next/dynamic';

const ColosseumGame = dynamic(
  () => import("../components/colosseum/ColosseumGame").then(mod => ({ default: mod.ColosseumGame })),
  {
    ssr: false,
    loading: () => (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        fontSize: '1.2rem',
        color: '#c3cad5',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Loading Colosseum Survival...
      </div>
    )
  }
);

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <NavBar/>
      </div>
      <div className={styles.portfolioContent}>
        <ColosseumGame/>
        <GameRules/>
      </div>
      <Footer/>
    </div>
  );
}

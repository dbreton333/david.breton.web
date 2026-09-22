import styles from "./SkillSection.module.css";
import SkillsCarousel from "../molecules/SkillsCarousel";
import { Reveal } from "../atoms/Reveal";
import data from "../../data/skillsData.json";


const SkillSection = () => {
    return (
        <div className={styles.content}>
            <Reveal className={styles.intro}>
                <h2 className={`${styles.title} h1 font-semibold`}>Skills</h2>
            </Reveal>
            <SkillsCarousel skills={data.skills}/>
        </div>
    );
}

export default SkillSection;

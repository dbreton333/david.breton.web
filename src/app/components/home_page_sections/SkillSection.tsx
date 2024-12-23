import styles from "./SkillSection.module.css";
import Header from "../molecules/Header";
import SkillsCarousel from "../molecules/SkillsCarousel";
import data from "../../data/skillsData.json";


const SkillSection = () => {
    return (
        <div className={styles.content}>
            <Header hidden={true} header="MY SKILLS" sub_header="My list of technical skills"/>
            <SkillsCarousel skills={data.skills}/>
        </div>
    );
}

export default SkillSection;
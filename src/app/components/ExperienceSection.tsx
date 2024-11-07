import styles from "./ExperienceSection.module.css";


const ExperienceSection = () => {
    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <h2 className={`${styles.slash} h4 font-sem-bold`}>
                    / &nbsp;
                </h2>
                <h2 className={`h4 font-sem-bold`}>
                    MY EXPERIENCE
                </h2>
            </div>
            <div className={styles.sub_header}>
                <h2 className={`h2 font-sem-bold`}>
                    I've worked with some amazing companies
                </h2>
            </div>
            <div className={`${styles.devider}`}/>
        </div>
    );
}

export default ExperienceSection;
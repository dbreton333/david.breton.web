import styles from "./EducationSection.module.css";


const EducationSection = () => {
    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <h2 className={`${styles.slash} h4 font-sem-bold`}>
                    / &nbsp;
                </h2>
                <h2 className={`h4 font-sem-bold`}>
                    MY EDUCATION
                </h2>
            </div>
            <div className={styles.sub_header}>
                <h2 className={`h2 font-sem-bold`}>
                    Past education <br />
                    & diplomas
                </h2>
            </div>
            <div className={`${styles.devider}`}/>

            <div className={styles.education_content}>
                <div className={styles.left_content}>
                    
                </div>

                <div className={styles.right_content}>
                    
                </div>
            </div>
        </div>
    );
}

export default EducationSection;
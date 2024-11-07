import SchoolSection from "./molecules/SchoolSection";
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
                    Past education & diplomas
                </h2>
            </div>
            <div className={`${styles.devider}`}/>

            <div className={styles.education_content}>
                <div className={styles.left_content}>
                    <SchoolSection schoolName="MCGILL UNIVERSITY" 
                    date="DEC 2024" topic="B.Eng. Computer Engineering" 
                    paragraph="I am currently pursuing a Bachelor's degree in 
                    Computer Engineering at McGill University. I have taken courses 
                    in computer science, electrical engineering, and mathematics."/>
                    <div className={`${styles.vertical_devider}`}/>
                    <SchoolSection schoolName="MCGILL UNIVERSITY" 
                    date="DEC 2024" topic="B.Eng. Computer Engineering" 
                    paragraph="I am currently pursuing a Bachelor's degree in 
                    Computer Engineering at McGill University. I have taken courses 
                    in computer science, electrical engineering, and mathematics."/>
                </div>
                <div className={`${styles.horizontal_devider}`}/>
                <div className={styles.right_content}>
                    <SchoolSection schoolName="MCGILL UNIVERSITY" 
                        date="DEC 2024" topic="B.Eng. Computer Engineering" 
                        paragraph="I am currently pursuing a Bachelor's degree in 
                        Computer Engineering at McGill University. I have taken courses 
                        in computer science, electrical engineering, and mathematics."/>
                    <div className={`${styles.vertical_devider}`}/>
                    <SchoolSection schoolName="MCGILL UNIVERSITY" 
                        date="DEC 2024" topic="B.Eng. Computer Engineering" 
                        paragraph="I am currently pursuing a Bachelor's degree in 
                        Computer Engineering at McGill University. I have taken courses 
                        in computer science, electrical engineering, and mathematics."/>
                </div>
            </div>
        </div>
    );
}

export default EducationSection;
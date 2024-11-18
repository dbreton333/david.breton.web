import Header from "../molecules/Header";
import SchoolSection from "../molecules/SchoolSection";
import styles from "./EducationSection.module.css";


const EducationSection = () => {
    return (
        <div className={styles.content}>
            <Header header="MY EDUCATION" sub_header="Past education & Diploma"/>
            <div className={styles.education_content}>
                    <SchoolSection schoolName="MCGILL UNIVERSITY" 
                    date="DEC 2024" topic="B.Eng. Computer Engineering" 
                    paragraph="I am currently pursuing a Bachelor's degree in 
                    Computer Engineering at McGill University. I have taken courses 
                    in computer science, software engineering, electrical engineering, and mathematics. CGPA: 3.75 / 4.0"/>
                    <SchoolSection schoolName="COLLEGE JEAN-DE-BREBEUF" 
                    date="MAY 2020" topic="Pure and Applied Science" 
                    paragraph="Eureka Program (The program is intended for students with a keen 
                    interest in science, mathematics, and technology) R-Score: 33.8"/>
                    <SchoolSection schoolName="LIGHTHOUSE LABS" 
                        date="SEP 2021" topic="Computer Science Diploma" 
                        paragraph="Intensive 3 months Data Science program, 
                        gaining hands-on expertise in data analysis, 
                        cleaning and visualization, 
                        machine learning, feature engineering, clustering and classification"/>
                    <SchoolSection schoolName="STANDSTEAD COLLEGE" 
                        date="APR 2018" topic="High School Diploma" 
                        paragraph="Boarding school with international student. 
                        Part of my identity and is where I made the most long lasting friends.
                        Headmaster's List - Average above 85%"/>
                </div>
        </div>
    );
}

export default EducationSection;
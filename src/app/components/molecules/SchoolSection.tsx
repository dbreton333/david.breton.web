import styles from "./SchoolSection.module.css";


interface SchoolSectionProps {
    schoolName: string,
    date: string,
    topic: string,
    paragraph: string
}

const SchoolSection = (props: SchoolSectionProps) => {
    return (
        <div className={styles.school_section}>
            <div className={styles.title}>
                <h1 className={` h6`}>{props.schoolName}</h1>
                <h1 className={`${styles.slash} h6`}>&nbsp; / &nbsp; </h1>
                <h1 className={`${styles.date} h6`}>{props.date}</h1>
            </div>
            <h2 className={`${styles.topic} h5`}>{props.topic}</h2>
            <h2 className={`${styles.paragraph} h8 font-light`}>{props.paragraph}</h2>
        </div>
    );
};

export default SchoolSection;
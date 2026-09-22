import styles from "./SchoolSection.module.css";
import { Reveal } from "../atoms/Reveal";

interface SchoolSectionProps {
    schoolName: string,
    date: string,
    topic: string,
    paragraph: string
}

const SchoolSection = (props: SchoolSectionProps) => {
    return (
        <Reveal as="div" className={styles.school_section}>
            <div className={styles.title}>
                <h1 className="h6">{props.schoolName}</h1>
                <h1 className={`${styles.slash} h6`}>&nbsp; / &nbsp;</h1>
                <h1 className={`${styles.date} h6`}>{props.date}</h1>
            </div>
            <h2 className={`${styles.topic} h5`}>{props.topic}</h2>
            <h2 className={`${styles.paragraph} p font-light`}>{props.paragraph}</h2>
        </Reveal>
    );
};

export default SchoolSection;

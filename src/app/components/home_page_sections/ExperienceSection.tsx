'use client'
import styles from "./ExperienceSection.module.css";
import Experience from "../molecules/Experience";
import { Reveal } from "../atoms/Reveal";
import data from '../../data/experienceData.json';


const ExperienceSection = () => {
    return (
        <div className={styles.content}>
            <Reveal className={styles.intro}>
                <h2 className={`${styles.title} h1 font-semibold`}>
                    Experience
                </h2>
                <p className={`${styles.paragraph} p font-light`}>
                    I&apos;ve worked with amazing companies and on amazing projects.
                </p>
            </Reveal>
            <div className={styles.experience_content}>
                {data.experiences.map((experience, index) => (
                    <Experience
                        key={index}
                        CompanyName={experience.CompanyName}
                        ref={experience.ref}
                        CompanyLogo={experience.CompanyLogo}
                        StartingDate={experience.StartingDate}
                        EndingDate={experience.EndingDate}
                        topic={experience.topic}
                        paragraph={experience.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default ExperienceSection;

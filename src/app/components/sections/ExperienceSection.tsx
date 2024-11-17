'use client'
import styles from "./ExperienceSection.module.css";
import Experience from "../molecules/Experience";
import Header from "../molecules/Header";
import data from '../../data/experienceData.json';
import React from "react";


const ExperienceSection = () => {
    return (
        <div className={styles.content}>
            <Header header="MY EXPERIENCE" sub_header="I’ve worked with amazing companies and on amazing projects"/>
            <div className={styles.experience_content}>
                {data.experiences.map((experience, index) => (
                    <React.Fragment key={index}>
                        <Experience
                            CompanyName={experience.CompanyName}
                            ref={experience.ref}
                            CompanyLogo={experience.CompanyLogo}
                            StartingDate={experience.StartingDate}
                            EndingDate={experience.EndingDate}
                            topic={experience.topic}
                            paragraph={experience.description}
                        />
                        {index < data.experiences.length - 1 && <div className={styles.devider} />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default ExperienceSection;
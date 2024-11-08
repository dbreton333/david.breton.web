'use client'
import styles from "./ExperienceSection.module.css";
import CompanySection from "../molecules/CompanySection";
import Header from "../molecules/Header";


const ExperienceSection = () => {
    return (
        <div className={styles.content}>
            <Header header="MY EXPERIENCE" sub_header="I’ve worked with amazing companies and on amazing projects"/>
            <div className={styles.experience_content}>
                <CompanySection ref="https://bodycad.com/en-ca/" CompanyLogo="/images/bodycad.png"
                StartingDate="MAY 2022" EndingDate="SEP 2022" topic="Software Engineer Intern"
                paragraph="During my tenure at Inovestor, I contributed to the development of several key Core APIs, an Initializer program, and various data Importers using the .NET Framework. Working within Agile methodologies, I actively participated in bi-weekly sprint reviews, where I presented my progress to the team, provided detailed reports, and engaged in code reviews."/>
                <div className={`${styles.devider}`}/>
                <CompanySection ref="https://www.inovestor.com/en-ca/" CompanyLogo="/images/inovestor.png"
                StartingDate="MAY 2020" EndingDate="SEP 2020" topic="Software Developer Intern"
                paragraph="At BodyCad, I played a key role in automating the supply chain by streamlining the process of label generation for custom implant orders. I also developed a React.js user interface that allows medical professionals to efficiently place orders for BodyCad implants that was directly integrated into the automated label proccess. "/>
                <div className={`${styles.devider}`}/>
                <CompanySection ref="https://www.brp.com/en/" CompanyLogo="/images/brp.png"
                StartingDate="MAY 2019" EndingDate="SEP 2019" topic="3D Modeler Intern"
                paragraph="I am currently working as a Software Developer at IBM. I am part of the IBM Cloud team, working on the development of the IBM Cloud platform."/>
            </div>
        </div>
    );
}

export default ExperienceSection;
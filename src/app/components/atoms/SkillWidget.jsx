'use client'
import styles from "./SkillWidget.module.css";
import Image from "next/image";

const SkillWidget = ({ item }) => {
    return (
        <div className={styles.skill_widget_container}>
            <div className={styles.skill_widget}>
                <div className={styles.top}>
                    <div className={styles.icon}>
                        <Image src={item.icon} alt={item.alt} fill={true} />
                    </div>
                    <h2 className={`${styles.header} font-sem-bold`}>
                        {item.skill}
                    </h2>
                    <p className={`${styles.paragraph}`}>
                        {item.skill_info}
                    </p>
                </div>
                <div className={styles.bottom}>
                    <p className={`${styles.years} font-sem-bold`}>
                        {item.number_of_years} years
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SkillWidget;
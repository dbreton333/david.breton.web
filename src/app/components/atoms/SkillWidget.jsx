'use client'
import styles from "./SkillWidget.module.css";
import Image from "next/image";

const SkillWidget = ({ item, itemsPerView }) => {
    return (
        <div className={styles.skill_widget_container}>
            <div className={styles.skill_widget}>
                <div className={styles.icon}>
                    <Image src={item.icon} alt={item.alt} fill={true} />
                </div>
                <h2 className={`h2 font-sem-bold`}>
                    {item.skill}
                </h2>
                <p className={`${styles.paragraph} p font-light`}>
                    {item.skill_info}
                </p>
            </div>
        </div>
    );
};

export default SkillWidget;
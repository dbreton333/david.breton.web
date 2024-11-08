
'use client'
import styles from "./SkillsCarousel.module.css";
import SkillWidget from "../atoms/SkillWidget";
import ArrowButton from "../atoms/ArrowButton";

import { useState } from "react";

const SkillsCarousel = ({skills}) => {
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex + 1 < skills.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className={styles.carousel_container}>
            <div className={styles.controls}>
                <ArrowButton onClick={handlePrev} disabled={currentIndex === 0} icon="/icons/chevron_left.svg" direction="left" />
                <ArrowButton onClick={handleNext} disabled={currentIndex + 2 >= skills.length} icon="/icons/chevron_right.svg" direction="right"/>
            </div>
            <div className={styles.carousel}>
        <div className={styles.carouselTrack}
                    style={{
                        transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                    }}>
            {skills.map((item, index) => (
               <SkillWidget key={index} item={item}/>
            ))}
            </div>
        </div>
        </div>

    )
}

export default SkillsCarousel;
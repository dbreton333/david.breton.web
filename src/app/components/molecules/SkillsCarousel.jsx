'use client'
import React, { useState, useEffect } from 'react';
import styles from './SkillsCarousel.module.css';
import SkillWidget from '../atoms/SkillWidget';
import ArrowButton from '../atoms/ArrowButton';

const SkillsCarousel = ({ skills }) => {
    const [itemsPerView, setItemsPerView] = useState(3);
    const [currentIndex, setCurrentIndex] = useState(0);

    const updateItemsPerView = () => {
        if (window.innerWidth >= 1000) {
            setItemsPerView(3); // Desktop
        } else if (window.innerWidth >= 700) {
            setItemsPerView(2); // Tablet
        } else {
            setItemsPerView(1); // Mobile
        }
    };

    useEffect(() => {
        updateItemsPerView(); // Initial check
        window.addEventListener('resize', updateItemsPerView); // Update on resize

        return () => window.removeEventListener('resize', updateItemsPerView); // Cleanup listener
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, skills.length - itemsPerView));
    };

    return (
        <div className={styles.carousel_container}>
            <div className={styles.controls}>
                <ArrowButton onClick={handlePrev} disabled={currentIndex === 0} icon="/icons/chevron_left.svg" direction="left" />
                <ArrowButton onClick={handleNext} disabled={currentIndex + itemsPerView >= skills.length} icon="/icons/chevron_right.svg" direction="right" />
            </div>
            <div className={styles.carousel}>
                <div className={styles.carouselTrack}
                    style={{
                        transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                    }}>
                    {skills.map((item, index) => (
                        <SkillWidget key={index} item={item} itemsPerView={itemsPerView} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsCarousel;
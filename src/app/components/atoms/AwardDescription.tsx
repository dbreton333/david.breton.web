'use client'
import React, { useRef, useEffect } from 'react';
import styles from './AwardDescription.module.css';

interface awardProps {
    position: number,
    title: string,
    description: string

}

export const AwardDescription = (props: awardProps) => {
    const sectionDeviderRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.animate);
                        entry.target.classList.add(styles.visible);
                    } else {
                        entry.target.classList.remove(styles.animate);
                        entry.target.classList.remove(styles.visible);
                    }
                });
            },
            { threshold: 0.15 }
        );

        if (sectionDeviderRef.current) {
            observer.observe(sectionDeviderRef.current);
        }

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => {
            if (sectionDeviderRef.current) {
                observer.unobserve(sectionDeviderRef.current);
            }
            if (contentRef.current) {
                observer.unobserve(contentRef.current);
            }
        };
    }, []);

    const first = props.position == 1;
    return (
        <div className={styles.award_frame}>
            <div ref={sectionDeviderRef} className={styles.section_devider} />
            <div ref={contentRef} className={styles.content}>
                <h1 className={`${first ? styles.first_position : styles.second_position} h3`}>
                    {first ? "1ST PLACE" : "2ND PLACE"}
                </h1>
                <h1 className={`${styles.title} h3`}>{props.title}</h1>
                <p className={`${styles.paragraph} p`}>{props.description}</p>
            </div>
        </div>
    );
};
'use client'
import { useRef, useState, useEffect } from "react";
import styles from "./SchoolSection.module.css";

interface SchoolSectionProps {
    schoolName: string,
    date: string,
    topic: string,
    paragraph: string
}

const SchoolSection = (props: SchoolSectionProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of the component is visible
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div 
            ref={ref} 
            className={`${styles.school_section} ${isVisible ? styles.visible : ""}`}
        >
            <div className={styles.title}>
                <h1 className="h6">{props.schoolName}</h1>
                <h1 className={`${styles.slash} h6`}>&nbsp; / &nbsp;</h1>
                <h1 className={`${styles.date} h6`}>{props.date}</h1>
            </div>
            <h2 className={`${styles.topic} h5`}>{props.topic}</h2>
            <h2 className={`${styles.paragraph} p font-light`}>{props.paragraph}</h2>
        </div>
    );
};

export default SchoolSection;

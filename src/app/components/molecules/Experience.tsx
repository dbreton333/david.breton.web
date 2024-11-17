'use client'
import { useRef, useState, useEffect } from "react";
import styles from "./Experience.module.css";
import Image from "next/image";
import Link from "next/link";


interface ExperienceSectionProps {
    CompanyName: string,
    CompanyLogo: any,
    StartingDate: string,
    EndingDate: string,
    topic: string,
    paragraph: string
    ref: string
}

const Experience = (props: ExperienceSectionProps) => {

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
        <div ref={ref}  className={`${styles.experience_section} ${isVisible ? styles.visible : ""}`}>
            <div className={styles.logo_frame}>
                <div className={styles.logo}>
                    <Link href={props.ref}>
                        <Image src={props.CompanyLogo} fill={true} alt="Company Logo"/>
                    </Link>
                </div>
            </div>
            <div className={styles.content_frame}>
                <div className={styles.topic_and_date_frame}>
                    <h1 className={`${styles.topic} h5`}>
                        {props.CompanyName} - {props.topic}
                    </h1>
                    <div className={styles.date_frame}>
                        <h2 className={`${styles.date} p`}>{props.StartingDate}</h2>
                        <h2 className={`${styles.slash} p`}> &nbsp; / &nbsp; </h2>
                        <h2 className={`${styles.date} p`}> {props.EndingDate}</h2>
                    </div>
                </div>
                <p className={`${styles.paragraph} p font-light`}>
                 {props.paragraph}   
                </p>
            </div>
            
        </div>
    );
};

export default Experience;
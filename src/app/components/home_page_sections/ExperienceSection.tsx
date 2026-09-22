'use client'
import { useEffect, useRef, useState } from "react";
import styles from "./ExperienceSection.module.css";
import Experience from "../molecules/Experience";
import { Reveal } from "../atoms/Reveal";
import data from '../../data/experienceData.json';

const ExperienceSection = () => {
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        // A thin band right across the vertical center of the viewport: a
        // row only counts as "centered" while it's crossing that band, so
        // scrolling naturally hands focus from one row to the next as they
        // pass through the middle of the screen, carousel-style.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const index = rowRefs.current.indexOf(entry.target as HTMLDivElement);
                    if (index === -1) return;
                    setActiveIndex(index);
                    // Scrolling to a new row closes whatever was open — expansion
                    // only ever follows the row currently centered.
                    setExpandedIndex((prev) => (prev !== null && prev !== index ? null : prev));
                });
            },
            { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
        );

        rowRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // The intersection band above only changes `activeIndex` once
        // scroll has moved a whole row's worth of distance — far too
        // coarse for "close the panel as soon as the user starts
        // scrolling away". This watches scroll position directly instead,
        // independent of which row it lands on, and collapses as soon as
        // the page has moved more than a few pixels from where it was
        // when the panel opened.
        if (expandedIndex === null) return;

        const scrollYAtExpand = window.scrollY;
        const onScroll = () => {
            if (Math.abs(window.scrollY - scrollYAtExpand) > 20) {
                setExpandedIndex(null);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [expandedIndex]);

    const handleToggle = (index: number) => {
        // Only the centered row can be expanded.
        if (index !== activeIndex) return;
        setExpandedIndex((prev) => (prev === index ? null : index));
    };

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
                    <div key={index} ref={(el) => { rowRefs.current[index] = el; }}>
                        <Experience
                            CompanyName={experience.CompanyName}
                            ref={experience.ref}
                            CompanyLogo={experience.CompanyLogo}
                            StartingDate={experience.StartingDate}
                            EndingDate={experience.EndingDate}
                            topic={experience.topic}
                            paragraph={experience.description}
                            isActive={index === activeIndex}
                            isExpanded={index === expandedIndex}
                            onToggle={() => handleToggle(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExperienceSection;

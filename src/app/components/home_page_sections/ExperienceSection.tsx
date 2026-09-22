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
        // pass through the middle of the screen, carousel-style. This only
        // drives the highlight/dim treatment now — expanding a row no
        // longer requires it to be the centered one, so this doesn't touch
        // `expandedIndex` at all.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const index = rowRefs.current.indexOf(entry.target as HTMLDivElement);
                    if (index === -1) return;
                    setActiveIndex(index);
                });
            },
            { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
        );

        rowRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Opening a row scrolls it to the middle of the screen, then — once
        // that settles — watches for the user scrolling away and closes the
        // panel once they've moved a reasonable distance from where it
        // came to rest. Arming the watch only after settling (rather than
        // at the moment of the click) matters: the scrollIntoView call
        // below fires its own scroll events, which would otherwise trip
        // the "moved away" check the instant the panel opens.
        if (expandedIndex === null) return;

        const el = rowRefs.current[expandedIndex];
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        let armed = false;
        let scrollYAtSettle = 0;

        const onScroll = () => {
            if (!armed) return;
            if (Math.abs(window.scrollY - scrollYAtSettle) > 120) {
                setExpandedIndex(null);
            }
        };

        const arm = () => {
            if (armed) return;
            armed = true;
            scrollYAtSettle = window.scrollY;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('scrollend', arm, { once: true });
        // Fallback for the case scrollIntoView doesn't actually move
        // anything (the row's already centered) — "scrollend" then never
        // fires, so this arms the watch anyway after a beat.
        const fallback = window.setTimeout(arm, 700);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('scrollend', arm);
            window.clearTimeout(fallback);
        };
    }, [expandedIndex]);

    const handleToggle = (index: number) => {
        // Any row can be expanded now — only the highlight/dim treatment
        // stays tied to which one is actually centered.
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

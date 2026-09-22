'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "./Experience.module.css";

interface ExperienceSectionProps {
    CompanyName: string,
    CompanyLogo: string,
    StartingDate: string,
    EndingDate: string,
    topic: string,
    paragraph: string
    ref: string
    isActive: boolean
    isExpanded: boolean
    onToggle: () => void
}

const Experience = (props: ExperienceSectionProps) => {
    const { isActive, isExpanded, onToggle } = props;

    return (
        <div className={styles.row} data-active={isActive}>
            <div className={styles.row_head}>
                <Link
                    href={props.ref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.logo_frame}
                    aria-label={`Visit ${props.CompanyName}'s website`}
                >
                    <Image src={props.CompanyLogo} fill sizes="96px" alt={`${props.CompanyName} logo`} style={{ objectFit: 'contain' }} />
                </Link>

                <button
                    type="button"
                    className={styles.trigger}
                    onClick={onToggle}
                    aria-expanded={isExpanded}
                    aria-disabled={!isActive}
                >
                    <span className={`${styles.name} h1 font-semibold`}>{props.CompanyName}</span>

                    <span className={styles.meta}>
                        <span className={`${styles.topic} p`}>{props.topic}</span>
                        <span className={`${styles.date} sub`}>{props.StartingDate} &mdash; {props.EndingDate}</span>
                    </span>

                    <svg className={`${styles.chevron} ${isExpanded ? styles.chevron_open : ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className={styles.panel} data-open={isExpanded}>
                <div className={styles.panel_inner}>
                    <p className={`${styles.paragraph} p font-light`}>
                        {props.paragraph}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Experience;

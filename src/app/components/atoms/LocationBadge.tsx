import styles from "./LocationBadge.module.css";

interface LocationBadgeProps {
    location: string;
    className?: string;
}

export const LocationBadge = ({ location, className = "" }: LocationBadgeProps) => (
    <div className={`${styles.badge} ${className}`}>
        <span className={`${styles.text} sub font-medium`}>Located<br />in {location}</span>
        <span className={styles.globe_wrap} aria-hidden="true">
            <svg className={styles.globe_svg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.2" />
                <g className={styles.rock}>
                    <path className={styles.lat} d="M2.75 9.25C6 7.7 18 7.7 21.25 9.25" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    <path className={styles.lat} d="M2.75 14.75C6 16.3 18 16.3 21.25 14.75" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    <g className={styles.spin}>
                        <ellipse cx="12" cy="12" rx="4" ry="9.25" stroke="currentColor" strokeWidth="1.1" />
                    </g>
                </g>
            </svg>
        </span>
    </div>
);

export default LocationBadge;

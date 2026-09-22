'use client'
import Link from "next/link";
import styles from "./LinkButton.module.css";

interface LinkButtonProps {
    href: string;
    text: string;
    textSize: string;
}

const LinkButton = (props: LinkButtonProps) => {
    return (
        <Link href={props.href} className={styles.link_button}>
            <div className={styles.direction}>
                <h1 className={`${props.textSize} font-semibold`}>
                    {props.text}
                </h1>
                <svg className={styles.arrow} width="1em" height="1em" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.0605 3.96918L21.874 12.7826L13.0605 21.596" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
                    <path d="M21.1446 12.7826L3.125 12.7826" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
                </svg>
            </div>
            <div className={styles.underline} />
        </Link>
    );
}

export default LinkButton;

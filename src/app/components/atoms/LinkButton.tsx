'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./LinkButton.module.css";

interface LinkButtonProps {
    href: string;
    text: string;
    textSize: string;
}

const LinkButton = (props: LinkButtonProps) => {
    const textRef = useRef<HTMLHeadingElement>(null);
    const [arrowSize, setArrowSize] = useState<string>("");

    useEffect(() => {
        if (textRef.current) {
            const computedStyle = getComputedStyle(textRef.current);
            const fontSize = computedStyle.fontSize;
            setArrowSize(fontSize);
        }
    }, [props.textSize]);

    return (
        <Link href={props.href}>
            <div className={styles.link_button}>
                <div className={styles.direction}>
                    <h1 ref={textRef} className={`${props.textSize} font-semibold`}>
                        {props.text}
                    </h1>
                    <img
                        src="/icons/arrow_right.svg"
                        alt="Arrow"
                        style={{ width: arrowSize, height: arrowSize }}
                        className={styles.arrow}
                    />
                </div>
                <div className={styles.underline}/>
            </div>
        </Link>
    );
}

export default LinkButton;
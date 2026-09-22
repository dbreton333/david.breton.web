'use client'
import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProjectRow.module.css";
import type { Project } from "../../data/projects";

interface ProjectRowProps {
    project: Project;
    index: number;
}

export const ProjectRow = ({ project, index }: ProjectRowProps) => {
    const rowRef = useRef<HTMLAnchorElement | null>(null);
    const [hovering, setHovering] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
        const rect = rowRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <Link
            href={`/portfolio/${project.slug}`}
            ref={rowRef}
            className={styles.row}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onMouseMove={handleMove}
        >
            <span className={`${styles.index} sub`}>{String(index + 1).padStart(2, "0")}</span>
            <span className={`${styles.name} h3 font-semibold`}>{project.name}</span>
            <span className={`${styles.stack} p`}>{project.stack}</span>
            <span className={`${styles.year} p`}>{project.year}</span>

            {project.thumbnail && (
                <div
                    className={styles.preview}
                    style={{
                        opacity: hovering ? 1 : 0,
                        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -115%) scale(${hovering ? 1 : 0.92})`,
                    }}
                >
                    <Image src={project.thumbnail} alt="" fill sizes="320px" style={{ objectFit: "cover" }} />
                </div>
            )}
        </Link>
    );
};

export default ProjectRow;

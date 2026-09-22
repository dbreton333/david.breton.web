'use client'
import { useEffect, useState } from "react";

interface LocalTimeProps {
    className?: string;
}

export const LocalTime = ({ className = "" }: LocalTimeProps) => {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const update = () => {
            setTime(
                new Intl.DateTimeFormat("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "America/Toronto",
                }).format(new Date())
            );
        };
        update();
        const id = setInterval(update, 30000);
        return () => clearInterval(id);
    }, []);

    return <span className={className}>{time ?? "––:––"} &middot; Montreal</span>;
};

export default LocalTime;

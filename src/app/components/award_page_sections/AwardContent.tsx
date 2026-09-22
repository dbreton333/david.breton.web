import { AwardDescription } from "../atoms/AwardDescription";
import styles from "./AwardContent.module.css";
import { Photo } from "../atoms/Photo";
import { Reveal } from "../atoms/Reveal";

export const AwardContent = () => {
    return (
        <div className={styles.container}>
            <Reveal className={styles.intro}>
                <h1 className={`${styles.intro_title} h1 font-semibold`}>
                    Five podiums. Three first-place finishes.
                </h1>
                <p className={`${styles.intro_paragraph} p font-light`}>
                    A few years spent flying across the country for 8-to-20-hour hackathon-style
                    engineering competitions &mdash; theoretical exams, live-coded challenges, and
                    the odd sleepless night. I encourage any enthusiastic programmer to dive into
                    these: there&apos;s no better way to prepare for real-life problems and deadlines.
                </p>
            </Reveal>

            <div className={`${styles.award_frame}`}>
                <div className={`${styles.left_content} ${styles.stacked}`}>
                    <AwardDescription position={1} title="McGill Engineering Competition" description="My team and I won first place in the programming category of the McGill Engineering Competition, where we had 12 hours to tackle five computer science challenges and present our work in front of five judges."/>
                    <AwardDescription position={1} title="Computer Science Games" description="The Computer Science Games is the largest computer science competition in Quebec, with more than 10 universities fielding teams of 10 each year across every corner of computing. I won 1st place in the machine learning competition, where students were tasked with building the best model against a given dataset within 10 hours."/>
                </div>
                <Reveal delay={120} className={`${styles.right_content}`} >
                    <div style={{aspectRatio: 0.75, width: '100%', position: 'relative'}}>
                        <Photo src="/images/victory1.png" alt="Presenting at the McGill Engineering Competition"/>
                    </div>
                </Reveal>
            </div>

            <div className={`${styles.award_frame}`}>
                <Reveal delay={120} className={`${styles.right_content}`}>
                    <div style={{aspectRatio: 1.36, width: '100%', position: 'relative'}}>
                        <Photo src="/images/victory2.png" alt="Team photo at the Canadian Engineering Competition in Calgary"/>
                    </div>
                </Reveal>
                <div className={`${styles.left_content}`}>
                    <AwardDescription position={2} title="Canadian Engineering Competition" description="My team and I achieved 2nd place at the Canadian Engineering Competition in Calgary, where we had 12 hours to develop a program optimizing a rig station extraction over time. The challenge involved adapting to different materials that changed daily across a mapped area. We also created an interactive visual interface to prioritize materials and track the rig's movement across the map. Yes I look tired!"/>
                </div>
            </div>

            <div className={`${styles.award_frame}`}>
                <div className={`${styles.left_content}`}>
                    <AwardDescription position={2} title="Quebec Engineering Competition" description="My team and I secured 2nd place at the Quebec Engineering Competition, held in Quebec, where we had 20 hours to code spaceship bots for a live-streamed game, competing in real-time against universities from across the province. The challenge involved programming multiple bots to navigate a map, collect items, and communicate across shared channels used by all teams to complete tasks. Each spaceship had unique features and values, adding an extra layer of complexity."/>
                </div>
                <Reveal delay={120} className={`${styles.right_content}`}>
                    <div style={{aspectRatio: 1.36, width: '100%', position: 'relative'}}>
                        <Photo src="/images/victory3.png" alt="Team at the Quebec Engineering Competition"/>
                    </div>
                </Reveal>
            </div>

            <div className={`${styles.award_frame}`}>
                <Reveal delay={120} className={`${styles.right_content}`}>
                    <div style={{aspectRatio: 1.36, width: '100%', position: 'relative'}}>
                        <Photo src="/images/victory4.png" alt="Team at the Quebec Engineering Games"/>
                    </div>
                </Reveal>
                <div className={`${styles.left_content}`}>
                    <AwardDescription position={1} title="Quebec Engineering Games" description="My team and I won first place in the programming competition at the Engineering Games. We had 8 hours to tackle a theoretical exam and solve five coding challenges focused on AI and data structures."/>
                </div>
            </div>
        </div>
    );
}

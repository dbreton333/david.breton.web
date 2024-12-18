import { AwardDescription } from "../atoms/AwardDescription";
import styles from "./AwardContent.module.css";
import { Photo } from "../atoms/Photo";
 
export const AwardContent = () => {
    return (
        <div className={styles.container}>
            <div className={`${styles.award_frame}`}>
                <div className={`${styles.left_content}`}>
                    <AwardDescription position={1} title="Mcgill Engineering Competition" description="My team and I won first place in the programming category of the McGill Engineering Competition, where we had 12 hours to tackle five computer science challenges."/>
                    <AwardDescription position={1} title="Computer Science Games" description="The Computer Science Games are a collegiate  competition that includes challenges from all aspects of computing and  that includes 10+ universities with teams of 10 computer scientists. I  won 1st place in the machine learning competition where students were  task to develop the best machine learning model based on a given dataset within 10 hours."/>
                </div>
                <div className={`${styles.right_content}`} style={{aspectRatio: 0.75}}>
                    <Photo src="/images/victory1.png" alt="awards"/>
                </div>
            </div>

            <div className={`${styles.award_frame}`}>
                <div className={`${styles.right_content}`} style={{aspectRatio: 1.36}}>
                    <Photo src="/images/victory2.png" alt="awards"/>
                </div>
                <div className={`${styles.left_content}`}>
                    <AwardDescription position={2} title="Canadian Engineering Competition" description="My team and I achieved 2nd place at the Canadian Engineering Competition in Calgary, where we had 12 hours to develop a program optimizing a rig station extraction over time. The challenge involved adapting to different materials that changed daily across a mapped area. We also created an interactive visual interface to prioritize materials and track the rig's movement across the map. Yes I look tired!"/>
                </div>
            </div>

            <div className={`${styles.award_frame}`}>
                <div className={`${styles.left_content}`}>
                    <AwardDescription position={2} title="Quebec Engineering Competition" description="My team and I secured 2nd place at the Quebec Engineering Competition, held in Quebec, where we had 20 hours to code spaceship bots for a live-streamed game, competing in real-time against universities from across the province. The challenge involved programming multiple bots to navigate a map, collect items, and communicate across shared channels used by all teams to complete tasks. Each spaceship had unique features and values, adding an extra layer of complexity."/>
                </div>

                <div className={`${styles.right_content}`} style={{aspectRatio: 1.36}}>
                    <Photo src="/images/victory3.png" alt="awards"/>
                </div>
            </div>

            <div className={`${styles.award_frame}`}>
                <div className={`${styles.right_content}`} style={{aspectRatio: 1.36}}>
                    <Photo src="/images/victory4.png" alt="awards"/>
                </div>
                <div className={`${styles.left_content}`}>
                    <AwardDescription position={1} title="Quebec Engineering Games" description="My team and I won first place in the programming competition at the Engineering Games. We had 8 hours to tackle a theoretical exam and solve five coding challenges focused on AI and data structures."/>
                </div>
            </div>
            <div className={styles.space_between}/>
        </div>
    );
}
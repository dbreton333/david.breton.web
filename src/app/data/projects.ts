export interface Project {
    slug: string;
    name: string;
    role: string;
    stack: string;
    year: string;
    summary: string;
    description: string[];
    thumbnail?: string;
    tags: string[];
    liveHref?: string;
    codeHref?: string;
}

export const projects: Project[] = [
    {
        slug: "colosseum-survival",
        name: "Colosseum Survival",
        role: "Game",
        stack: "React, TypeScript",
        year: "2024",
        summary: "A territory-control board game built for a McGill AI course, played against a custom minimax agent with alpha-beta pruning.",
        description: [
            "Colosseum Survival is a turn-based board game: move, place a wall, and try to seal off more territory than your opponent before the board splits in two. Built from scratch — board rendering, movement and wall-placement rules, and the AI opponent.",
            "The AI was originally built for McGill's COMP 424 (Artificial Intelligence) course: it uses minimax search with alpha-beta pruning to look several moves ahead, weighing territory control against how boxed-in each player is.",
        ],
        tags: ["Game", "Web App"],
        codeHref: "https://github.com/dbreton333",
    },
];

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);

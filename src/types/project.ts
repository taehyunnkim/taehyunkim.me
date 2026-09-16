export interface Project {
    id: string;
    title: string;
    thumbnail?: string; // optional
    shortDescription: string;
    tags: ProjectTag[];
    skills: string[]; // skill names that match our skills data
    featured?: boolean;
    hasContent: boolean;
    date: string;
    link?: string;
    github?: string;
    figma?: string;
}

export type ProjectTag = 'professional' | 'personal' | 'open-source' | 'academic' | 'freelance' | 'startup' | 'design' | 'ongoing' | 'archived' | 'completed';
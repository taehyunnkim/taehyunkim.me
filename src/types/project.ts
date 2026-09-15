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
}

export type ProjectTag = 'professional' | 'personal' | 'open-source' | 'academic' | 'freelance' | 'startup' | 'ongoing' | 'archived' | 'completed';
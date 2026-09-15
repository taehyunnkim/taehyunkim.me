import { getCollection, type CollectionEntry } from 'astro:content';
import type { Project } from '@/types/project';
import { resolveThumbnailPath } from '@/utils/thumbnails';

export async function getAllProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  
  return projects.map((project: CollectionEntry<'projects'>) => {
    const projectId = project.id.split('/').pop() || project.id;
    const thumbnailPath = resolveThumbnailPath(projectId, project.data.thumbnail);

    return {
      id: projectId,
      title: project.data.title,
      thumbnail: thumbnailPath,
      shortDescription: project.data.description,
      tags: project.data.tags,
      skills: project.data.skills,
      featured: project.data.featured || false,
      hasContent: (project.body ? project.body.trim().length > 0 : false) || !!project.data.link,
      date: project.data.date,
      link: project.data.link,
      github: project.data.github
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter(project => project.featured);
}

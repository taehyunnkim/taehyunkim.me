import styles from './ProjectCard.module.css';
import type { Project } from '@/types/project';
import { useLayoutEffect, useRef, useState } from 'react';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const [imageError, setImageError] = useState(false);
    const skillsRef = useRef<HTMLDivElement>(null);
    const [hiddenCount, setHiddenCount] = useState(0);

    // Show as many skill chips as fit on one row; collapse the rest into "+N more".
    useLayoutEffect(() => {
        const row = skillsRef.current;
        if (!row) return;

        const layout = () => {
            const chips = Array.from(row.querySelectorAll<HTMLElement>('[data-skill]'));
            const more = row.querySelector<HTMLElement>('[data-more]');

            chips.forEach((c) => (c.style.display = ''));
            if (more) more.style.display = 'none';

            const available = row.clientWidth;
            if (row.scrollWidth <= available) {
                setHiddenCount(0);
                return;
            }

            if (more) more.style.display = 'inline-block';
            let hidden = 0;
            for (let i = chips.length - 1; i >= 0; i--) {
                if (row.scrollWidth <= available) break;
                chips[i].style.display = 'none';
                hidden++;
            }
            setHiddenCount(hidden);
        };

        layout();
        const observer = new ResizeObserver(layout);
        observer.observe(row);
        return () => observer.disconnect();
    }, [project.skills]);

    const handleClick = () => {
        if (!project.hasContent) return;
        window.location.href = `/project/${project.id}`;
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const getPlaceholderColor = (title: string) => {
        const colors = [
            '#4f62d9',
            '#cc59c5',
            '#ff639c'
        ];
        
        return colors[Math.abs(title.length) % colors.length];
    };

    return (
        <div
            className={`${styles.projectCard} ${project.hasContent ? styles.clickable : ''}`}
            onClick={project.hasContent ? handleClick : undefined}
        >
            <div className={styles.projectThumbnail}>
                {project.thumbnail && !imageError ? (
                    <img 
                        src={project.thumbnail} 
                        alt={project.title}
                        onError={handleImageError}
                    />
                ) : (
                    <div 
                        className={styles.placeholderThumbnail}
                        style={{ backgroundColor: getPlaceholderColor(project.title) }}
                    >
                        <span className={styles.placeholderText}>
                            {project.title}
                        </span>
                    </div>
                )}
            </div>
            <div className={styles.projectContent}>
                <div className={styles.projectHeader}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <div className={styles.projectTags}>
                        {project.tags.map((tag) => (
                            <span key={tag} className={`${styles.projectTag} ${styles[tag]}`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <p className={styles.projectDescription}>{project.shortDescription}</p>
                <div className={styles.projectFooter}>
                    <div className={styles.projectSkills} ref={skillsRef}>
                        {project.skills.map((skill) => (
                            <span key={skill} data-skill className={styles.skillTag}>
                                {skill}
                            </span>
                        ))}
                        <span data-more className={styles.moreSkills}>
                            +{hiddenCount} more
                        </span>
                    </div>
                    {project.hasContent && (
                        <span className={styles.readMore}>Read more →</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;

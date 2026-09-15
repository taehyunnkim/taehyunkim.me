import { useState, useEffect } from 'react';
import { skills, type SkillItem } from '@/data/skills';
import type { Project } from '@/types/project';
import styles from './SkillsWithProjects.module.css';
import SkillsFilterModal from './SkillsFilterModal';
import SkillCard from './SkillCard';
import ProjectCard from '@/components/projects/ProjectCard';
import SectionLabel from '@/components/text/SectionLabel';
import { IoFilterSharp } from "react-icons/io5";
import TextButton from '../TextButton';
import { FaXmark } from 'react-icons/fa6';

interface SkillsWithProjectsProps {
    projects: Project[];
}

const SkillsWithProjects: React.FC<SkillsWithProjectsProps> = ({ projects }) => {
    const [selectedSkills, setSelectedSkills] = useState<Set<SkillItem>>(new Set());
    const [isOpen, setIsOpen] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
    const [contentOnly, setContentOnly] = useState(false);

    useEffect(() => {
        // Check URL parameters for pre-selected skill
        const urlParams = new URLSearchParams(window.location.search);
        const skillName = urlParams.get('skill');
        
        if (skillName) {
            // Find the skill in our skills data
            let foundSkill: SkillItem | null = null;
            
            for (const category of Object.values(skills)) {
                const skill = category.find(item => item.name === skillName);
                if (skill) {
                    foundSkill = skill;
                    break;
                }
            }
            
            if (foundSkill) {
                const newSelectedSkills = new Set<SkillItem>();
                newSelectedSkills.add(foundSkill);
                setSelectedSkills(newSelectedSkills);
            }
        }
    }, []);

    useEffect(() => {
        // Filter projects based on selected skills (exclusive - must have ALL selected skills)
        const selectedSkillNames = Array.from(selectedSkills).map(skill => skill.name);
        const filtered = projects.filter(project =>
            (!contentOnly || project.hasContent) &&
            selectedSkillNames.every(skillName =>
                project.skills.includes(skillName)
            )
        );
        setFilteredProjects(filtered);
    }, [selectedSkills, projects, contentOnly]);

    const onFilterClick = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const addSkill = (skill: SkillItem) => {
        const newSelectedSkills = new Set(selectedSkills);
        newSelectedSkills.add(skill);
        setSelectedSkills(newSelectedSkills);
    }

    const removeSkill = (skill: SkillItem) => {
        const newSelectedSkills = new Set(selectedSkills);
        newSelectedSkills.delete(skill);
        setSelectedSkills(newSelectedSkills);
    }

    const clearAllFilters = () => {
        setSelectedSkills(new Set());
        setContentOnly(false);
    }

    const isFiltered = selectedSkills.size > 0 || contentOnly;

    return (
        <div className={styles.skillsWithProjects}>
            {/* Skills Filter Section */}
            <div className={styles.filterSection}>
                <div className={styles.filterControls}>
                    <div className={styles.skillsFilterContainer}>
                        <TextButton 
                            text="Select skills" 
                            onClick={onFilterClick} 
                            icon={<IoFilterSharp size={16} color="var(--button-border-gray)" />} 
                        />
                        {isOpen && (
                            <>
                                <div className={styles.modalBackdrop} onClick={closeModal}></div>
                                <SkillsFilterModal onClose={closeModal} removeSkill={removeSkill} addSkill={addSkill} selectedSkills={selectedSkills} />
                            </>
                        )}
                    </div>
                    <label className={`${styles.contentToggle} ${contentOnly ? styles.active : ''}`}>
                        <input
                            type="checkbox"
                            checked={contentOnly}
                            onChange={(e) => setContentOnly(e.target.checked)}
                        />
                        <span className={styles.toggleTrack} aria-hidden="true" />
                        <span>Show Projects w/ Content</span>
                    </label>
                </div>
                <div className={styles.skillsFilterItemsContainer}>
                    {Array.from(selectedSkills).map((skill) => (
                        <SkillCard key={skill.name} title={skill.name} onClick={() => removeSkill(skill)} icon={<FaXmark />} />
                    ))}
                </div>
                {selectedSkills.size > 0 && (
                    <TextButton 
                        text="Clear all filters" 
                        onClick={clearAllFilters}  
                    />
                )}
            </div>

            {/* Projects Section */}
            <div className={styles.divider}></div>
            <div className={styles.projectsSection}>
                <div className={styles.projectsHeader}>
                    <SectionLabel label="Projects" />
                    <div className={styles.projectsCount}>
                        {isFiltered ? (
                            <span>{filteredProjects.length} of {projects.length} projects</span>
                        ) : (
                            <span>{projects.length} projects</span>
                        )}
                    </div>
                </div>
                
                {filteredProjects.length > 0 ? (
                    <div className={styles.projectsContainer}>
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.noProjects}>
                        <p>No projects match the current filters.</p>
                        <TextButton 
                            text="Clear filters to see all projects" 
                            onClick={clearAllFilters} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkillsWithProjects;

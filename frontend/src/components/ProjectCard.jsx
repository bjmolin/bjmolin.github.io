import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      {project.image && (
        <img src={project.image} alt={project.title} className="project-image" />
      )}
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tech-stack">
          {project.technologies.split(',').map((tech, index) => (
            <span key={index} className="tech-tag">{tech.trim()}</span>
          ))}
        </div>
        <div className="project-links">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
import React, { useState, useEffect } from 'react';
import { getProjects, getSkills } from './services/api';
import ProjectCard from './components/ProjectCard';
import SkillsSection from './components/SkillsSection';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          getProjects(),
          getSkills()
        ]);
        setProjects(projectsRes.data);
        setSkills(skillsRes.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <header className="header">
        <h1>Your Name - Portfolio</h1>
        <p>Computer Science Graduate</p>
        <div className="contact-info">
          <a href="mailto:your.email@example.com">Email</a>
          <a href="https://github.com/yourusername">GitHub</a>
          <a href="https://linkedin.com/in/yourusername">LinkedIn</a>
        </div>
      </header>

      <main className="main-content">
        <section className="about">
          <h2>About Me</h2>
          <p>Brief introduction about yourself...</p>
        </section>

        <section className="projects">
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section className="skills">
          <SkillsSection skills={skills} />
        </section>
      </main>
    </div>
  );
}

export default App;
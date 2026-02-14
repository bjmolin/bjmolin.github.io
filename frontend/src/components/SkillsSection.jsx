import React from 'react';
import './SkillsSection.css';

const SkillsSection = ({ skills }) => {
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categoryLabels = {
    'BE': 'Backend',
    'FE': 'Frontend',
    'DB': 'Database',
    'DEV': 'DevOps',
    'OTHER': 'Other',
  };

  return (
    <div className="skills-section">
      <h2>Skills</h2>
      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
        <div key={category} className="skill-category">
          <h3>{categoryLabels[category] || category}</h3>
          <div className="skills-list">
            {categorySkills.map(skill => (
              <div key={skill.id} className="skill-item">
                <span className="skill-name">{skill.name}</span>
                <div className="skill-level">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`level-dot ${i < skill.proficiency ? 'filled' : ''}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
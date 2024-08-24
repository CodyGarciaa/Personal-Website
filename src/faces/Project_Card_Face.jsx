import React from 'react';
import '../css/Project_Card_Face.css';


const Project_Card_Face = ( {data, ProjMedia} ) => {
  return (
    <div className="project-card">
      <div className='project-descript-video'>
        <div className="project-content">
            <h2 className="project-title">{data.name}</h2>
            <p className="project-description">
            {data.description}
            </p>
        </div>
        <div className="project-media">
            <ProjMedia />
        </div>
      </div>
      <div className="project-learnings">
        <strong>Skills/Software Learned:</strong> {data.skills}
      </div>
    </div>
  );
};

export default Project_Card_Face;
import React from 'react';
import './Project_Card_Face.css';

const Project_Card_Face = () => {
  return (
    <div className="project-card">
      <div className='project-descript-video'>
        <div className="project-content">
            <h2 className="project-title">Project Name</h2>
            <p className="project-description">
            Project description/abstract goes here. You can summarize the 
            project in a few sentences to give an overview. Something something
            something something something <strong>LAST LINE</strong>
            </p>
        </div>
        <div className="project-media">
            <div className="media-placeholder">
            {/* Placeholder for the project image or video */}
            <p>Photo/Video of Project</p>
            </div>
        </div>
      </div>
      <div className="project-learnings">
        <strong>Skills/Software Learned:</strong> 3D Model Texturing and Rendering, React (Three Fiber and Spring), Blender
      </div>
    </div>
  );
};

export default Project_Card_Face;
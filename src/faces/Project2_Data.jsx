import React from 'react';
import '../css/Project_Card_Face.css';
import thePhoto from '../assets/SPH1.gif'
import thePhoto2 from '../assets/SPH2.gif'


export const FaceData = {
    'name': 'Splish Splash SPH',
    'description': 
    "As our group's final project for a computer graphics course, we built a 3D water particle simulation following Smooth Particle Hydrodynamics (SPH) concepts complemented with interactive GUI elements in Three.js.",
    'skills': 'Particle-Based Fluid Simulation Physics (based off of 2003 SIGGRAPH Paper), Three.js'
}

export function ProjMedia() {
    return(
        <>
            <img src={thePhoto} className='media'/>
            <img src={thePhoto2} className='media'/>
        </>
    );
};

export const DetailsData = {

};

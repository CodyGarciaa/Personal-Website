import React from 'react';
import '../css/Project_Card_Face.css';
import thePhoto from '../assets/LidarResearch.png'


export const FaceData = {
    'name': 'Lidar Scanner Research',
    'description': 
    'Project description/abstract goes here. You can summarize the project in a few sentences to give an overview. Something something something something something',
    'skills': 'Matlab, More Shit'
}

export function ProjMedia() {
    return(
        <img src={thePhoto} className='media'/>
    );
};


export const DetailsData = {

};
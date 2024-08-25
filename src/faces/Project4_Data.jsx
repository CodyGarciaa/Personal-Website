import React from 'react';
import '../css/Project_Card_Face.css';
import thePhoto from '../assets/PhobiaFreeFilms.png'


export const FaceData = {
    'name': 'Phobia Free Films',
    'description': 
    "As our group's final project for a UI/UX course, we designed and created a prototype of a movie streaming app that would censor the users’ unique phobias, leveraging several APIs and LLMs.",
    'mediaSRC': '',
    'skills': 'React, TMDB/OMDB API, SuperEmbed API, VideoJS'
}

export function ProjMedia() {
    return(
        <img 
            src={thePhoto} 
            className='media'
        />
    );
};

export const DetailsData = {

};
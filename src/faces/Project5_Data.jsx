import React from 'react';
import '../css/Project_Card_Face.css';



export const FaceData = {
    'name': 'Parking Tracker',
    'description': 
    'After a couple months of collecting and labeling a specific car that goes in view of my home security camera, I trained a neural network to detect the specific car in a live feed, and send me an email notification.',
    'skills': 'Machine Learning, Constructing Neural Networks, OpenCV, PyTorch'
}

export function ProjMedia() {
    return(
        <img src='https://placehold.co/120x150/png' className='media'/>
    );
};

export const DetailsData = {

};
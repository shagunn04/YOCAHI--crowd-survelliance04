import React from 'react';
import './css/Home.css'; // Import the CSS file
import ImageCard from './ImageCard'; // Import ImageCard component
import bullfight from "./sampleImages/Bullfight.png";
import karate from "./sampleImages/karate.png";
import group from "./sampleImages/group.png";

function Home() {
  const images = [
    {
        
            src: karate, // Replace with your image URL
            title: 'Reduces Occlusion',
            description: 'In scenes where objects or people are partially blocked by other objects, the model tracks the visible portions, reducing the impact of occlusion on detection ensuring more accurate tracking and recognition in crowded environments.',
    },
    {
      src: bullfight, // Replace with your image URL
      title: 'Segregation Between Animals and Humans',
      description: 'In this image, the YOLO model distinguishes between animals and humans, detecting the different entities in a bullfight scenario, ensuring better safety measures and understanding of the environment.',
    },
    {
      src: group, // Replace with your image URL
      title: 'Multiple Faces Detection',
      description: 'This image showcases how YOLO can detect multiple faces in a crowd. The model identifies individuals, recognizing emotions, actions, and interactions within the group of people.',
    },
    // Add more images as needed
  ];

  return (
    <div className='home-container'>
      <h1>Welcome to YOCAHI</h1>
      <h3><b>Yo</b>u <b>Ca</b>n't <b>Hi</b>de</h3>

      <p>Upload videos and let the YOLO model process them for real-time object detection.</p>

      <div className="image-gallery">
        {images.map((image, index) => (
          <ImageCard
            key={index}
            imageSrc={image.src}
            title={image.title}
            description={image.description}
          />
        ))}
      </div>
      <h1>Curated by Team Synapse</h1>
    

    </div>
  );
}

export default Home;

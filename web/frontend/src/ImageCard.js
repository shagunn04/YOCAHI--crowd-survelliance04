import React from 'react';

function ImageCard({ imageSrc, title, description }) {
  return (
    <div className="card">
      <div className="card-content">
        <img src={imageSrc} alt={title} className="card-img" />
        <div className="card-body">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const OfficerCard = ({ name, title, department, imgSrc, linkedInUrl }) => {
  return (
    <div className="officer-card">
      <img src={imgSrc} alt={`${name}'s photo`} className="officer-photo" />
      <div className="officer-info">
        <h3>{name}</h3>
        <p>{title}</p>
        <p className="major-label">Major:</p>
        <p>{department}</p>
        {linkedInUrl && (  // Conditionally render only if URL exists
          <div className="linkedin-container">
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="linkedin-icon" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficerCard;

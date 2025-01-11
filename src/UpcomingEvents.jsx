import React from 'react';

const UpcomingEvents = ({ flyerImage, eventTitle, eventDescription, eventDetails, sectionHeading }) => {
  return (
    <section className="upcoming-events-container" id="upcoming-events">
      <h2 className="events-heading">{sectionHeading}</h2>
      <div className="event-content">
        <div className="event-image-container">
          <img src={flyerImage} alt={eventTitle} className="event-image" />
        </div>

        <div className="event-text-overlay">
          <div className="event-text">
            <h3 className="event-title">{eventTitle}</h3>
            <p className="event-description">{eventDescription}</p>
            <p className="event-details">{eventDetails}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;

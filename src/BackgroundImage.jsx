import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const BackgroundImage = () => {
  const [slides, setSlides] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [logo, setLogo] = useState('');
  const [logoSize, setLogoSize] = useState('300px'); // Default logo size
  const navigate = useNavigate();

  // Helper function to validate and return proper color format
  const processColor = (color) => {
    const hexPattern = /^#([A-Fa-f0-9]{6})$/; // Matches 6-character hex format
    const rgbPattern = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/; // Matches rgb format

    if (hexPattern.test(color)) {
      return color; // Return valid hex format
    } else if (rgbPattern.test(color)) {
      return color; // Return valid rgb format
    }
    return '#000'; // Fallback to default black color
  };

  useEffect(() => {
    fetch('/background_slideshow/background_image_data.xlsx') // Path to your Excel file
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        const processedSlides = jsonData.map((slide) => ({
          title: slide.title || 'Default Title',
          description: slide.description || '',
          buttonText: slide.buttonText || 'Learn More',
          buttonAction: slide.buttonAction || 'external',
          buttonLink: slide.buttonLink || '/',
          imgSrc: slide.imgSrc || '',
          logo: slide.logo || '',
          logoSize: slide.logoSize || '300px',
          buttonColor: processColor(slide.buttonColor || '#000'), // Process button color
          buttonBorderColor: processColor(slide.buttonBorderColor || '#000'), // Process button border color
          arrowColor: processColor(slide.arrowColor || '#fff'), // Process arrow color
        }));

        setSlides(processedSlides);
        setLogo(processedSlides[0]?.logo);
        setLogoSize(processedSlides[0]?.logoSize);
      })
      .catch((error) => console.error('Failed to load Excel file:', error));
  }, []);

  const nextImage = () => {
    if (!isTransitioning && slides.length > 0) {
      setIsTransitioning(true);
      setCurrentImageIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
      setIsFading(true);
      setTimeout(() => {
        setIsFading(false);
        setIsTransitioning(false);
        const nextSlide = slides[(currentImageIndex + 1) % slides.length];
        setLogo(nextSlide.logo);
        setLogoSize(nextSlide.logoSize);
      }, 250);
    }
  };

  const prevImage = () => {
    if (!isTransitioning && slides.length > 0) {
      setIsTransitioning(true);
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
      setIsFading(true);
      setTimeout(() => {
        setIsFading(false);
        setIsTransitioning(false);
        const prevSlide = slides[(currentImageIndex - 1 + slides.length) % slides.length];
        setLogo(prevSlide.logo);
        setLogoSize(prevSlide.logoSize);
      }, 250);
    }
  };

  const handleButtonClick = () => {
    const currentSlide = slides[currentImageIndex];

    if (currentSlide.buttonAction === 'external') {
      window.open(currentSlide.buttonLink, '_blank');
    } else if (currentSlide.buttonAction === 'scrollToUpcomingEvents') {
      const section = document.getElementById('upcoming-events');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    } else if (currentSlide.buttonAction === 'navigateToOfficers') {
      navigate('/officers');
    }
  };

  return (
    <div className="background-image-container">
      <div
        className="images-container"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {slides.map((slide, index) => (
          <div className="image-slide" key={index}>
            <img src={slide.imgSrc} alt={`Slide ${index}`} className="background-slide-image" />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div
        className="arrow-left"
        onClick={prevImage}
        style={{
          '--hover-color': slides[currentImageIndex]?.arrowColor || '#fff', // Set CSS variable for hover color
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div
        className="arrow-right"
        onClick={nextImage}
        style={{
          '--hover-color': slides[currentImageIndex]?.arrowColor || '#fff', // Set CSS variable for hover color
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>

      {/* Slide Overlay Content */}
      <div className={`overlay-content ${isFading ? 'fade-out' : 'fade-in'}`}>
        <h1>{slides[currentImageIndex]?.title}</h1>
        <p>{slides[currentImageIndex]?.description}</p>
        {logo && (
          <div className="logo-container">
            <img
              src={logo}
              alt="Slide Logo"
              className="slide-logo"
              style={{
                maxWidth: logoSize,
                height: 'auto',
              }}
            />
          </div>
        )}
        <button
          className="learn-more-button"
          onClick={handleButtonClick}
          style={{
            backgroundColor: slides[currentImageIndex]?.buttonColor,
            borderColor: slides[currentImageIndex]?.buttonBorderColor,
          }}
        >
          {slides[currentImageIndex]?.buttonText}
        </button>
      </div>
    </div>
  );
};

export default BackgroundImage;

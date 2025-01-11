import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const About = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('/about_page/about_page_data.xlsx')
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        setSections(jsonData);
      })
      .catch((error) => console.error('Failed to load Excel file:', error));
  }, []);

  return (
    <div className="about-us-container">
      {sections.map((section, index) => (
        <section key={index} className="about-section-container">
          <div className="about-image-container">
            <img src={section.imagePath} alt={section.title} className="about-image" />
          </div>
          <div className="about-text">
            <h3 className="about-title">{section.title}</h3>
            <p
              className="about-description"
              dangerouslySetInnerHTML={{
                __html: section.description.replace(/\n/g, '<br />'),
              }}
            ></p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default About;

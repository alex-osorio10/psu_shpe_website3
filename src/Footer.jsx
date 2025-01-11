import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import facebookLogo from './assets/images/facebook_logo_orange.webp';
import instagramLogo from './assets/images/instagram_logo_orange.webp';
import emailLogo from './assets/images/email_logo_orange.webp';

function Footer() {
  const [footerData, setFooterData] = useState({
    buttonText: 'Learn More',
    buttonLink: 'https://shpe.org',
    instagramLink: 'https://www.instagram.com/psu_shpe/',
    facebookLink: 'https://www.facebook.com/PSUSHPE/',
    emailLink: 'mailto:shpe@pdx.edu',
    footerQuote: '',
    familiaTitle: 'Join the Familia!',
    familiaDescription: 'Discover how SHPE can empower you in your career and education!',
    followUsTitle: 'Follow Us!',
  });

  useEffect(() => {
    fetch('/footer/footer_data.xlsx')
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (jsonData.length > 0) {
          const rowData = jsonData[0];
          setFooterData({
            buttonText: rowData.buttonText || footerData.buttonText,
            buttonLink: rowData.buttonLink || footerData.buttonLink,
            instagramLink: rowData.instagramLink || footerData.instagramLink,
            facebookLink: rowData.facebookLink || footerData.facebookLink,
            emailLink: rowData.emailLink || footerData.emailLink,
            footerQuote: rowData.footerQuote || footerData.footerQuote,
            familiaTitle: rowData.familiaTitle || footerData.familiaTitle,
            familiaDescription: rowData.familiaDescription || footerData.familiaDescription,
            followUsTitle: rowData.followUsTitle || footerData.followUsTitle,
          });
        }
      })
      .catch((error) => console.error('Failed to load Excel file:', error));
  }, []);

  return (
    <footer>
      <div className="footer-container">
        {/* Familia Section */}
        <h2>{footerData.familiaTitle}</h2>
        <p>{footerData.familiaDescription}</p>
        <a 
          href={footerData.buttonLink}
          target="_blank" 
          rel="noopener noreferrer"
          className="ideal-logic-button"
        >
          {footerData.buttonText}
        </a>
        
        {/* Follow Us Section */}
        <h2>{footerData.followUsTitle}</h2>
        <div className="social-media">
          <a href={footerData.instagramLink} target="_blank" rel="noopener noreferrer">
            <img src={instagramLogo} alt="Instagram Logo" className="social-icon" />
          </a>
          <a href={footerData.facebookLink} target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} alt="Facebook Logo" className="social-icon" />
          </a>
          <a href={footerData.emailLink} target="_blank" rel="noopener noreferrer">
            <img src={emailLogo} alt="Email Icon" className="social-icon" />
          </a>
        </div>

        <p>{footerData.footerQuote}</p>
      </div>
    </footer>
  );
}

export default Footer;

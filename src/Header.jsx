import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import shpeLogo from './assets/images/shpe_logo_color.png';
import verticalLine from './assets/images/vertical_line_black.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerLogoSrc, setPsuLogoSrc] = useState('');
  const [headerLogoSize, setPsuLogoSize] = useState('');
  const [hoverWordColor, setHoverWordColor] = useState('#000'); // Default hover color
  const location = useLocation();
  const navigate = useNavigate();

  const processColor = (color) => {
    const hexPattern = /^#([A-Fa-f0-9]{6})$/;
    const rgbPattern = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    if (hexPattern.test(color)) return color;
    if (rgbPattern.test(color)) return color;
    return '#330072'; // Fallback hover color
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === '/' && window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      navigate('/');
    }
  };

  useEffect(() => {
    fetch('/header/header_logo_data.xlsx')
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        const headerLogoData = jsonData.find((item) => item.key === 'headerLogo');
        const wordColorData = jsonData.find((item) => item.key === 'headerLogo');

        if (headerLogoData) {
          setPsuLogoSrc(headerLogoData.imgSrc || '');
          setPsuLogoSize(headerLogoData.size || '100px');
        }

        if (wordColorData) {
          setHoverWordColor(processColor(wordColorData.wordColor || '#330072'));
        }
      })
      .catch((error) => {
        console.error('Failed to load Excel file:', error);
        setPsuLogoSrc('');
        setPsuLogoSize('');
      });
  }, []);

  return (
    <header className="header-container">
      <div className="logo-group" onClick={handleLogoClick}>
        <img src={shpeLogo} alt="SHPE Logo" className="logo" />
        <img src={verticalLine} alt="Vertical Line" className="vertical-line" />
        {headerLogoSrc && (
          <img
            src={headerLogoSrc}
            alt="PSU Logo"
            className="logo"
            style={{ height: headerLogoSize, width: 'auto' }}
          />
        )}
      </div>

      <nav className="inline-menu">
        <ul className="menu-list">
          <li
            className="menu-item"
            style={{ color: '#000' }} // Default color black
            onMouseEnter={(e) => (e.target.style.color = hoverWordColor)}
            onMouseLeave={(e) => (e.target.style.color = '#000')}
          >
            <Link to="/" onClick={handleHomeClick}>Home</Link>
          </li>
          <li
            className="menu-item"
            style={{ color: '#000' }} // Default color black
            onMouseEnter={(e) => (e.target.style.color = hoverWordColor)}
            onMouseLeave={(e) => (e.target.style.color = '#000')}
          >
            <Link to="/#upcoming-events">Events</Link>
          </li>
          <li
            className="menu-item"
            style={{ color: '#000' }} // Default color black
            onMouseEnter={(e) => (e.target.style.color = hoverWordColor)}
            onMouseLeave={(e) => (e.target.style.color = '#000')}
          >
            <Link to="/about">About Us</Link>
          </li>
          <li
            className="menu-item"
            style={{ color: '#000' }} // Default color black
            onMouseEnter={(e) => (e.target.style.color = hoverWordColor)}
            onMouseLeave={(e) => (e.target.style.color = '#000')}
          >
            <Link to="/officers">Officers</Link>
          </li>
        </ul>
      </nav>

      <div className="menu-button" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} className="menu-icon" />
      </div>

      {menuOpen && (
        <nav className="dropdown-menu">
          <ul className="dropdown-list">
            <li className="dropdown-item">
              <Link to="/" onClick={handleHomeClick}>Home</Link>
            </li>
            <li className="dropdown-item">
              <Link to="/#upcoming-events" onClick={toggleMenu}>
                Events
              </Link>
            </li>
            <li className="dropdown-item">
              <Link to="/about" onClick={toggleMenu}>About Us</Link>
            </li>
            <li className="dropdown-item">
              <Link to="/officers" onClick={toggleMenu}>Officers</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

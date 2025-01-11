import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Header from './Header';
import Footer from './Footer';
import BackgroundImage from './BackgroundImage';
import UpcomingEvents from './UpcomingEvents';
import Options from './Options';
import Officers from './Officers';
import About from './About';
import ScrollToTop from './ScrollToTop';

function App() {
  const [events, setEvents] = useState([]);
  // test 2
  useEffect(() => {
    fetch('/main_page/events_data.xlsx')
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        setEvents(jsonData);
      })
      .catch((error) => console.error('Failed to load Excel file:', error));
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main className="main-content">
                <BackgroundImage />

                {events.map((event, index) => (
                  <UpcomingEvents
                    key={index}
                    flyerImage={event.flyerImage}
                    eventTitle={event.eventTitle}
                    eventDescription={event.eventDescription}
                    eventDetails={event.eventDetails}
                    sectionHeading={event.sectionHeading || 'Events'}
                  />
                ))}
              </main>
            }
          />
          <Route path="/officers" element={<Officers />} />
          <Route path="/about" element={<About />} />
          <Route path="/options" element={<Options />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

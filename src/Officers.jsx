import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import OfficerCard from './OfficerCard';

const Officers = () => {
  const [officers, setOfficers] = useState([]);
// hello
  useEffect(() => {
    fetch('/officer_page/page_officer_data.xlsx')
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        const processedData = jsonData.map(officer => ({
          ...officer,
          imgSrc: officer.imgSrc || '/src/assets/images/default.png'  // Fallback if URL is missing
        }));

        setOfficers(processedData);
      })
      .catch(error => {
        console.error('Failed to load Excel file:', error);
      });
  }, []);

  return (
    <div className="officers-container">
      <h1>Meet Our Officers</h1>
      <div className="officers-grid">
        {officers.map((officer, index) => (
          <OfficerCard
            key={index}
            name={officer.name}
            title={officer.title}
            department={officer.department}
            imgSrc={officer.imgSrc}
            linkedInUrl={officer.linkedInUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Officers;

import React, { useState } from 'react';
import '../styles/main.css';

const Sidebar = ({ onSelect }) => {
  const [activeItem, setActiveItem] = useState('searchScores');

  const handleSelect = (item) => {
    setActiveItem(item);
    onSelect(item);
  };

  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li
          className={activeItem === 'searchScores' ? 'active' : ''}
          onClick={() => handleSelect('searchScores')}
        >
          Search Scores
        </li>
        <li
          className={activeItem === 'report' ? 'active' : ''}
          onClick={() => handleSelect('report')}
        >
          Reports
        </li>
        <li
          className={activeItem === 'top10GroupA' ? 'active' : ''}
          onClick={() => handleSelect('top10GroupA')}
        >
          Top 10 Group A
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

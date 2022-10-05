import React from 'react';
import AlarmCard from './AlarmCard.jsx';
import { sortAlarms } from '../util/index';

export default function AlarmNavbar({ alarms, onToggleClick, onDeleteButtonClick }) {
  const handleDeleteButtonClick = (event) => onDeleteButtonClick(event.target.id);
  const handleToggleClick = (event) => onToggleClick(event.target.id);

  return (
    <>
      {sortAlarms(alarms).map(alarm => (
        <AlarmCard
          key={alarm.time}
          time={alarm.time}
          onDeleteButtonClick={handleDeleteButtonClick}
          onToggleClick={handleToggleClick}
        />
      ))}
    </>
  );
}

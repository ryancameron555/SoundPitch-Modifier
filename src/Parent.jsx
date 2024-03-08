import React from 'react';
import Instrument from './Instrument';
import Soundwave from './Soundwave'; // Import the JSON array

const ParentComponent = () => {
  return (
    <div className="instrument-container"> {/* Apply the instrument-container class */}
      {/* Render an Instrument component for each entry in the Soundwave array */}
      {Soundwave.map((sound) => (
        <Instrument key={sound.name} name={sound.name} wave={sound.wave} />
      ))}
    </div>
  );
};

export default ParentComponent;

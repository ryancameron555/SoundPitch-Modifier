/** @format */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './Instrument.css';

const Instrument = ({ name, wave }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(440);
  const [volume, setVolume] = useState(0.5);

  const audioContext = useRef(new AudioContext());
  const oscillator = useRef(null);
  const gainNode = useRef(null);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      startAudio();
    } else {
      stopAudio();
    }
  };

  
  const startAudio = () => {
    oscillator.current = audioContext.current.createOscillator();
    gainNode.current = audioContext.current.createGain();

    oscillator.current.type = wave;
    oscillator.current.frequency.setValueAtTime(
      frequency,
      audioContext.current.currentTime
    );
    oscillator.current.connect(gainNode.current);
    gainNode.current.connect(audioContext.current.destination);

    oscillator.current.start();

    // Set volume
    gainNode.current.gain.setValueAtTime(
      volume,
      audioContext.current.currentTime
    );
  };

  const stopAudio = () => {
    if (oscillator.current) {
      oscillator.current.stop();
      oscillator.current.disconnect();
    }
    if (gainNode.current) {
      gainNode.current.disconnect();
    }
  };

  const handleFrequencyChange = (e) => {
    const newFrequency = parseFloat(e.target.value);
    setFrequency(newFrequency);
    if (oscillator.current) {
      oscillator.current.frequency.setValueAtTime(
        newFrequency,
        audioContext.current.currentTime
      );
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (gainNode.current) {
      gainNode.current.gain.setValueAtTime(
        newVolume,
        audioContext.current.currentTime
      );
    }
  };

  const handleWaveChange = (newWave) => {
    if (oscillator.current) {
      stopAudio();
      oscillator.current.type = newWave;
      if (isPlaying) {
        startAudio();
      }
    }
  };

  return (
    <div className="instrument">
      <h3>{name}</h3>
      <div className="controls">
        <button className="button" onClick={handleClick}>
          {isPlaying ? 'Stop' : 'Play'} Sound
        </button>
        <div className="slider">
          <label>Frequency: {frequency} Hz</label>
          <input
            type="range"
            min="20"
            max="2000"
            step="1"
            value={frequency}
            onChange={handleFrequencyChange}
          />
        </div>
        <div className="slider">
          <label>Volume:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <div className="wave-buttons">
          <button className="button" onClick={() => handleWaveChange('sine')}>
            Sine Wave
          </button>
          <button className="button" onClick={() => handleWaveChange('square')}>
            Square Wave
          </button>
          <button
            className="button"
            onClick={() => handleWaveChange('sawtooth')}
          >
            Sawtooth Wave
          </button>
          <button
            className="button"
            onClick={() => handleWaveChange('triangle')}
          >
            Triangle Wave
          </button>
        </div>
      </div>
    </div>
  );
};

// completion exercise 7

Instrument.propTypes = {
  name: PropTypes.string.isRequired,
  wave: PropTypes.string.isRequired,
};

export default Instrument;

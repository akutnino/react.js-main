import React from 'react';
import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

export default function App(props = {}) {
  return (
    <div>
      <Steps></Steps>
      <Steps></Steps>
    </div>
  );
}

function Steps(props = {}) {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePrevious = function (event) {
    if (step > 1) setStep((currentState) => currentState - 1);
  };

  const handleNext = function (event) {
    if (step < 3) setStep((currentState) => currentState + 1);
  };

  const handleCloseBtn = function (event) {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div>
      <button className="close" onClick={handleCloseBtn}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

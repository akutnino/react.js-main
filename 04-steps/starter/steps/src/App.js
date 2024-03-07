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
      <StepMessage step={69}>
        <p>Children Prop</p>
        <p>🍕</p>
      </StepMessage>
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

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button textColor="#fff" bgColor="#7950f2" onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>
            <Button textColor="#fff" bgColor="#7950f2" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage(props) {
  const { step, children } = props;

  return (
    <div className="message">
      <h3>Step {step}:</h3> {children}
    </div>
  );
}

function Button(props) {
  const { textColor, bgColor, onClick, children } = props;

  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

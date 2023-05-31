import React from 'react';

const Question = ({ question, options, timer, handleAnswer }) => {
  return (
    <div>
      <h2>{question}</h2>
      <p>Time Remaining: {timer} seconds</p>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;

import React from 'react';

const Result = ({ score, totalQuestions }) => {
  const restartQuiz = () => {
    // Reset the state values to restart the quiz
  };

  const retakeQuiz = () => {
    // Reset the state values to retake the quiz
  };

  const saveAsImage = () => {
    // Logic to save the final page's layout as a PNG image
    // You can use a library like html2canvas or dom-to-image to accomplish this
  };

  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score}/{totalQuestions}</p>
      <button onClick={restartQuiz}>Restart Quiz</button>
      <button onClick={retakeQuiz}>Retake Quiz</button>
      <button onClick={saveAsImage}>Save as Image</button>
    </div>
  );
};

export default Result;

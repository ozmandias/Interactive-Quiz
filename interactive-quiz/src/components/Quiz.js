import React, { useState, useEffect, useRef } from 'react';
import Data from './Data'
import html2canvas from 'html2canvas';

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [imageSaved, setImageSaved] = useState(false);
  const quizRef = useRef(null);

  const questions = Data;

  useEffect(() => {
    if (quizCompleted) {
      if (imageSaved) return; // Image already saved, no need to proceed
    } else if (timeRemaining === 0) {
      handleAnswer(null); // Timeout, pass null as selected answer
    } else {
      const timer = setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
      return () => clearTimeout(timer); // Clear timer on component unmount or state change
    }
  }, [timeRemaining, quizCompleted, imageSaved]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAnswer = (selectedAnswer) => {
    const currentQuestionData = questions[currentQuestion];
    if (selectedAnswer && currentQuestionData.correct_answer === selectedAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeRemaining(10);
      setSelectedOption('');
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeRemaining(10);
    setQuizCompleted(false);
    setSelectedOption('');
    setImageSaved(false);
  };

  const saveQuizAsImage = () => {
    html2canvas(document.body).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'quiz_result.png';
      link.click();
      setImageSaved(true);
    });
  };

  return (
    <div className='border border-info col-6 p-2' ref={quizRef}>
      {quizCompleted ? (
        <div>
          <h3 className='d-flex justify-content-center'>Quiz Completed!</h3>

          <div className='d-flex justify-content-center'>
            <div class="col-4">
              <input className='form-control' type="text" class="form-control" placeholder="Name" aria-label="Name" />
            </div>
          </div>


          <p>Final Score: {score}</p>

          <div className='d-flex justify-content-center'>
            <button className='btn btn-success text' onClick={saveQuizAsImage}> <i class="bi bi-card-image"></i> Save Result</button>
          </div>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-info text my-2' onClick={handleRestartQuiz}> <i className="bi bi-arrow-clockwise"></i> Restart Quiz</button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className='text-start'>{questions[currentQuestion].question}</h3>
          
          {/* <ul>
            {questions[currentQuestion].choices.map((choice, index) => (
              <li key={index} onClick={() => handleAnswer(choice.id)}>
                {choice.value}
              </li>
            ))}
          </ul> */}

          <form className='py-2'>
            {questions[currentQuestion].choices.map((choice, index) => (
                <div key={index} className='d-flex'>
                  <input
                    type="radio"
                    value={choice.id}
                    checked={selectedOption === choice.id}
                    onChange={handleOptionChange}
                    className='mx-1'
                  />
                  <span>{choice.value}</span>
                </div>
            ))}
          </form>
          
          <button onClick={() => handleAnswer(selectedOption)} className='btn btn-warning text my-2'> <i className="bi bi-check-circle"></i> Submit Answer</button>

          <p>Time Remaining: {timeRemaining} seconds</p>
        </div>
      )}
    </div>
  );
};

export default QuizApp;

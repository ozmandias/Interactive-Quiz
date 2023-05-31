// import logo from './logo.svg';
import './App.css';
import Quiz from './components/Quiz';
// import Question from './components/Question';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-info'>Interactive Quiz</h1>
        <Quiz></Quiz>
      </header>
    </div>
  );
}

export default App;

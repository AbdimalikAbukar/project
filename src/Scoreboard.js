import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './scoreboard.css'; 

const ScoreboardPage = () => {
  // Extract the score from the URL query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const score = searchParams.get('score');

  return (
    <div className="scoreboard-container">
      {/* Display the title */}
      <h1 className="score-title">Game Over!</h1>
      
      {/* Display the user's score */}
      <h2 className="score-text">Your Score: {score}</h2>
      
      {/* Link to navigate back to the home page */}
      <Link to="/" className="score-link">Go Back to Home</Link>
    </div>
  );
};

export default ScoreboardPage;



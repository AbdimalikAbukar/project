import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; 

const HomePage = () => {
  return (
    <div className="container">
      {/*Inside this h1 tag you have the name of the website and a link to the register component*/} 
      <h1>World Wide Trivia
        <aside className='asidelogin'>
          <Link to="/register">Register</Link>
        </aside>
      </h1> 
      
      <h2 className="description">Hello, my name is Abdimalik Abukar and I created this trivia game.</h2>
      <h2 className="description">Click on the link below to start your game</h2>
       {/*We have a message tot the viewers now, and below will be a link to start the game */} 
      <Link to="/game" className="start-game-link">Start Game</Link>
      <footer>
        <h3>Rules to Remember!</h3>
        <ol>
          <li>The game is randomized in category and difficulty</li>
          <li>You have 45 seconds to answer each question</li>
          <li>There will be 10 questions in a game</li>
          <li>Don't waste your time cheating!</li>
        </ol>
         {/*To finish off the home page we have the footer explaining the rules of the game*/} 
      </footer>
    </div>
  );
};

export default HomePage;



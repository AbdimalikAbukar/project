import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions } from './api'; 
import './gameStyles.css'; 

const GamePage = () => {
    // State variables for managing game state
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(45); 
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    // Function to handle moving to the next question
    const handleNextQuestion = () => {
        setTimeLeft(45); 
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            navigate(`/scoreboard?score=${score}`);
        }
    };

    // Fetch questions from API on component mount
    useEffect(() => {
        fetchQuestions()
        .then(data => {
            // Decode HTML entities for questions and answers
            const decodedQuestions = data.results.map(question => {
                return {
                    ...question,
                    question: decodeHTMLEntities(question.question),
                    correct_answer: decodeHTMLEntities(question.correct_answer),
                    incorrect_answers: question.incorrect_answers.map(answer => decodeHTMLEntities(answer))
                };
            });
            setQuestions(decodedQuestions);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setError(true); 
        });
    }, []);

    // Timer for countdown
    useEffect(() => {
        if (timeLeft === 0) {
            handleNextQuestion();
        }
    }, [timeLeft]);

    // Timer to decrement timeLeft
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestionIndex]);

    // Function to handle user's answer selection
    const handleAnswer = selectedAnswer => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correct_answer) {
            setScore(score + 1);
        }
        setSelectedAnswer(selectedAnswer);
        setTimeout(handleNextQuestion, 1000); 
    };

    // Display error message if there's an error fetching data
    if (error) {
        return <div>Error fetching data. Please try again later.</div>;
    }

    // Display loading message while fetching data
    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    // Retrieve current question
    const currentQuestion = questions[currentQuestionIndex];

    // Render game UI
    return (
        <div className="game-container">
            <div className="game-question-container">
                {/* Display current question */}
                <h2 className="game-question">Question {currentQuestionIndex + 1}</h2>
                <p className="game-question">{currentQuestion.question}</p>
                {/* Display answer options */}
                <ul>
                    {currentQuestion.incorrect_answers.map((answer, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handleAnswer(answer)}
                                className={`game-answer-button ${selectedAnswer === answer ? (answer === currentQuestion.correct_answer ? 'game-correct-answer' : 'game-incorrect-answer') : ''}`}
                            >
                                {answer}
                            </button>
                        </li>
                    ))}
                    {/* Display correct answer */}
                    <li>
                        <button
                            onClick={() => handleAnswer(currentQuestion.correct_answer)}
                            className={`game-answer-button ${selectedAnswer === currentQuestion.correct_answer ? 'game-correct-answer' : ''}`}
                        >
                            {currentQuestion.correct_answer}
                        </button>
                    </li>
                </ul>
                {/* Display time left */}
                <p>Time left: {timeLeft}</p>
            </div>
        </div>
    );
};

// Function to decode HTML entities
function decodeHTMLEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

export default GamePage;

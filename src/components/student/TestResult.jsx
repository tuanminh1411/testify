import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TestResult.css";

function TestResult() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { score, selectedAnswers, questionsData } = state;
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Chuyển sang câu tiếp theo
  const handleNextQuestion = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Quay lại câu trước
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    
    <div className="test-result-body">
      
      {/* Nút quay lại */}
      <div className="backts-button" onClick={() => navigate("/")}>
        ←
      </div>

      <div className="content-wrapper">
        {/* Nội dung câu hỏi */}
        <div className="questionts-card">
          <p>
            <strong>Câu {currentQuestion + 1}:</strong>{" "}
            {questionsData[currentQuestion].question}
          </p>
          {questionsData[currentQuestion].options.map((option, index) => (
            <p
              key={index}
              className={`option ${
                index === questionsData[currentQuestion].correctAnswer
                  ? "correct"
                  : ""
              } ${
                selectedAnswers[currentQuestion] === index
                  ? selectedAnswers[currentQuestion] ===
                    questionsData[currentQuestion].correctAnswer
                    ? "selected-correct"
                    : "selected-wrong"
                  : ""
              }`}
            >
              {String.fromCharCode(65 + index)}. {option}
            </p>
          ))}

          {/* Nút chuyển câu */}
          <div className="navigation-buttons">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Câu Trước
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestion === questionsData.length - 1}
            >
              Câu Sau
            </button>
          </div>
        </div>

        {/* Khu vực bên phải */}
        <div className="right-section">
          {/* Điểm số */}
          <div className="scorets-box">
            {score}/10
          </div>

          {/* Danh sách câu hỏi */}
          <div className="questionts-list">
            <ul>
              {questionsData.map((_, index) => {
                const isCorrect =
                  selectedAnswers[index] === questionsData[index].correctAnswer;
                const isSelected = currentQuestion === index;

                return (
                  <li
                    key={index}
                    className={`${
                      isCorrect ? "correct-answer" : "wrong-answer"
                    } ${isSelected ? "selected" : ""}`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    Câu {index + 1}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestResult;
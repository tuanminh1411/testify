// src/components/AddNewTest2.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../QuizContext";
import "./AddNewTest2.css";

function AddNewTest2() {
  const { quizData, setQuizData } = useQuiz();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Cập nhật nội dung câu hỏi
  const updateQuestionText = (value) => {
    const updated = [...quizData.questions];
    updated[currentQuestion] = {
      ...updated[currentQuestion],
      question: value,
    };
    setQuizData({ ...quizData, questions: updated });
  };

  // Cập nhật đáp án
  const updateOption = (indexOption, value) => {
    const updated = [...quizData.questions];
    const updatedOptions = [...updated[currentQuestion].options];
    updatedOptions[indexOption] = value;
    updated[currentQuestion] = {
      ...updated[currentQuestion],
      options: updatedOptions,
    };
    setQuizData({ ...quizData, questions: updated });
  };

  const handleFinish = () => {
    navigate("/onclass-viewtest");
  };

  return (
    <div className="test2-container">
      <div className="timer">
        Thời gian làm bài: {quizData.duration}:00
      </div>

      <div className="question-list">
        <ul>
          {quizData.questions.map((q, index) => {
            // Kiểm tra xem câu đã “nhập đủ” hay chưa
            const isCompleted =
              q.question.trim() !== "" &&
              q.options.every((opt) => opt.trim() !== "");
            
            // Nếu index == currentQuestion => class "selected"
            // Nếu câu đã nhập đủ => class "completed"
            return (
              <li
                key={index}
                className={`
                  ${currentQuestion === index ? "selected" : ""}
                  ${isCompleted ? "completed" : ""}
                `}
                onClick={() => setCurrentQuestion(index)}
              >
                Câu {index + 1}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="question-container">
        <h2>Câu {currentQuestion + 1}</h2>
        <div className="question-label">Câu Hỏi:</div>
        <input
          type="text"
          className="question-text"
          placeholder="Nhập nội dung câu hỏi..."
          value={quizData.questions[currentQuestion]?.question}
          onChange={(e) => updateQuestionText(e.target.value)}
        />

        <div className="options">
          {quizData.questions[currentQuestion]?.options.map((option, idx) => (
            <div className="option" key={idx}>
              <label>{String.fromCharCode(65 + idx)}.</label>
              <input
                type="text"
                placeholder={`Đáp án ${String.fromCharCode(65 + idx)}`}
                value={option}
                onChange={(e) => updateOption(idx, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="nav-buttons">
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
          >
            Câu Trước
          </button>
          <button
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            disabled={currentQuestion === quizData.totalQuestions - 1}
          >
            Câu Sau
          </button>
        </div>
      </div>

      <button className="finish-button" onClick={handleFinish}>
        Hoàn Tất
      </button>
    </div>
  );
}

export default AddNewTest2;

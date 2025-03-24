// src/components/OnClassViewTest.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../QuizContext";
import "./OnClassViewTest.css";

function OnClassViewTest() {
  const { quizData, setQuizData } = useQuiz();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Cập nhật đáp án đúng
  const setCorrectIndex = (idx) => {
    const updated = [...quizData.questions];
    updated[currentQuestion] = {
      ...updated[currentQuestion],
      correctIndex: idx,
    };
    setQuizData({ ...quizData, questions: updated });
  };

  // Ở màn này chỉ hiển thị (không sửa) question & options, 
  // nhưng chọn radio để đánh dấu correctIndex
  const handleFinish = () => {
    // Tùy chị: chuyển về trang chủ, hoặc hiển thị 1 trang kết quả
    navigate("/");
  };

  return (
    <div className="onclass-viewtest">
      <div className="header">{quizData.title || "Bài Kiểm Tra"}</div>
      <div className="info-box">
        Thời gian làm bài: {quizData.duration} phút<br />
        Ngày hết hạn: {quizData.deadline}
      </div>

      {/* Danh sách câu hỏi */}
      <div className="question-list">
        <ul>
          {quizData.questions.map((q, index) => (
            <li
              key={index}
              className={currentQuestion === index ? "selected" : ""}
              onClick={() => setCurrentQuestion(index)}
            >
              Câu {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* Khung nội dung câu hỏi */}
      <div className="question-container">
        <h2>Câu {currentQuestion + 1} :</h2>
        <p style={{ marginBottom: "15px" }}>
          {quizData.questions[currentQuestion]?.question}
        </p>

        {quizData.questions[currentQuestion]?.options.map((option, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <input
              type="radio"
              name={`correctOption-${currentQuestion}`}
              checked={quizData.questions[currentQuestion].correctIndex === idx}
              onChange={() => setCorrectIndex(idx)}
            />
            <label style={{ marginLeft: "8px" }}>
              {String.fromCharCode(65 + idx)}. {option}
            </label>
          </div>
        ))}

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

      <button className="back-button" onClick={handleFinish}>
        Hoàn Tất
      </button>
    </div>
  );
}

export default OnClassViewTest;

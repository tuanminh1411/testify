// src/components/AddNewTest2.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuiz } from "../../QuizContext";
import "./AddNewTest2.css";

function AddNewTest2() {
  const { quizData, setQuizData } = useQuiz();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [finished, setFinished] = useState(false);

  // Load dữ liệu từ localStorage nếu có
  useEffect(() => {
    const savedQuizData = localStorage.getItem("quizData");
    if (savedQuizData) {
      setQuizData(JSON.parse(savedQuizData));
    }
  }, [setQuizData]);

  // Lưu quizData vào localStorage mỗi khi nó thay đổi
  useEffect(() => {
    localStorage.setItem("quizData", JSON.stringify(quizData));
  }, [quizData]);

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

  const handleFinish = async () => {
    try {
      // Gửi dữ liệu câu hỏi và đáp án tới server sử dụng axios (đường dẫn API chỉ là ví dụ)
      await axios.post("https://api.example.com/save-quiz", quizData.questions, {
        headers: { "Content-Type": "application/json" },
      });
      // Sau khi gửi dữ liệu, thay vì chuyển trang, em bé set finished = true để hiển thị summary
      setFinished(true);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      // Xử lý lỗi nếu cần, ví dụ hiển thị thông báo lỗi cho người dùng
    }
  };

  // Nếu đã hoàn tất, hiển thị danh sách câu hỏi và đáp án
  if (finished) {
    return (
      <div className="summary-container">
        <h2>Danh sách câu hỏi và đáp án</h2>
        <ul>
          {quizData.questions.map((q, index) => (
            <li key={index}>
              <h3>
                Câu {index + 1}: {q.question}
              </h3>
              <ul>
                {q.options.map((option, idx) => (
                  <li key={idx}>
                    {String.fromCharCode(65 + idx)}: {option}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Giao diện nhập câu hỏi và đáp án
  return (
    <div className="test2-container">
      <div className="timer">
        Thời gian làm bài: {quizData.duration}:00
      </div>

      <div className="question-list">
        <ul>
          {quizData.questions.map((q, index) => {
            // Kiểm tra xem câu đã nhập đủ hay hongg
            const isCompleted =
              q.question.trim() !== "" &&
              q.options.every((opt) => opt.trim() !== "");
            
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
        

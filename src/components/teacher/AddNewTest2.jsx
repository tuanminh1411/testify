// src/components/AddNewTest2.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useQuiz } from "../../QuizContext";
import "./AddNewTest2.css";

function AddNewTest2() {
  const { quizData, setQuizData } = useQuiz();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [finished, setFinished] = useState(false);

  // Lấy dữ liệu từ location.state nếu có, nếu hongg thì từ localStorage
  useEffect(() => {
    if (location.state && location.state.questions && location.state.questions.length > 0) {
      setQuizData(location.state);
    } else {
      const savedQuizData = localStorage.getItem("quizData");
      if (savedQuizData) {
        setQuizData(JSON.parse(savedQuizData));
      }
    }
  }, [location, setQuizData]);

  // Lưu quizData vào localStorage mỗi khi nó thay đổi
  useEffect(() => {
    if (quizData) {
      localStorage.setItem("quizData", JSON.stringify(quizData));
    }
  }, [quizData]);

  // Cập nhật nội dung câu hỏi
  const updateQuestionText = (value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[currentQuestion] = {
      ...updatedQuestions[currentQuestion],
      question: value,
    };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Cập nhật đáp án
  const updateOption = (indexOption, value) => {
    const updatedQuestions = [...quizData.questions];
    const updatedOptions = [...updatedQuestions[currentQuestion].options];
    updatedOptions[indexOption] = value;
    updatedQuestions[currentQuestion] = {
      ...updatedQuestions[currentQuestion],
      options: updatedOptions,
    };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Khi ấn nút Hoàn Tất, gửi dữ liệu qua axios và hiển thị summary
  const handleFinish = async () => {
    try {
      // Nếu cần, bé Minnn có thể bổ sung header Authorization ở đây luôn nè
      await axios.post("https://api.example.com/save-quiz", quizData.questions, {
        headers: { "Content-Type": "application/json" },
      });
      setFinished(true);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      // Xử lý lỗi nếu cần, ví dụ hiển thị thông báo lỗi cho người dùng
    }
  };

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
        <button onClick={() => navigate("/onclass-viewtest")}>Tiếp Tục</button>
      </div>
    );
  }

  return (
    <div className="test2-container">
      <div className="timer">Thời gian làm bài: {quizData.duration}:00</div>

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
                className={`${currentQuestion === index ? "selected" : ""} ${
                  isCompleted ? "completed" : ""
                }`}
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
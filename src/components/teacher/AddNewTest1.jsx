// src/components/AddNewTest1.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useQuiz } from "../../QuizContext";
import { FaBook, FaHeadset, FaBell, FaSignOutAlt, FaCog } from "react-icons/fa";
import "./AddNewTest1.css";

function AddNewTest1() {
  const navigate = useNavigate();
  const { quizData, setQuizData } = useQuiz();

  const [title, setTitle] = useState(quizData.title || "");
  const [deadline, setDeadline] = useState(quizData.deadline || "");
  const [duration, setDuration] = useState(quizData.duration || 0);
  const [totalQuestions, setTotalQuestions] = useState(quizData.totalQuestions || 0);
  const [description, setDescription] = useState(quizData.description || "");
  const [errors, setErrors] = useState({});

  // Load dữ liệu từ localStorage nếu có để pre-populate form
  useEffect(() => {
    const savedQuizData = localStorage.getItem("quizData");
    if (savedQuizData) {
      const parsedData = JSON.parse(savedQuizData);
      setTitle(parsedData.title || "");
      setDeadline(parsedData.deadline || "");
      setDuration(parsedData.duration || 0);
      setTotalQuestions(parsedData.totalQuestions || 0);
      setDescription(parsedData.description || "");
    }
  }, []);

  const handleContinue = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!title.trim()) newErrors.title = "Vui lòng nhập tiêu đề";
    if (!deadline.trim()) newErrors.deadline = "Vui lòng chọn ngày hết hạn";
    if (!duration || isNaN(duration) || duration <= 0) newErrors.duration = "Vui lòng nhập thời gian hợp lệ";
    if (!totalQuestions || isNaN(totalQuestions) || totalQuestions <= 0)
      newErrors.totalQuestions = "Vui lòng nhập số câu hỏi hợp lệ";
    if (!description.trim()) newErrors.description = "Vui lòng nhập mô tả";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Tạo mảng câu hỏi với số lượng tương ứng
    const questionsArray = Array.from({ length: Number(totalQuestions) }, () => ({
      question: "",
      options: ["", "", "", ""],
      correctIndex: 0,
    }));

    const quizInfo = {
      title: title,
      deadline: deadline,
      duration: duration,
      totalQuestions: Number(totalQuestions),
      questions: questionsArray,
      description: description,
    };

    try {
      // Gửi thông tin bài test tới server sử dụng axios (đường dẫn API chỉ là ví dụ)
      const response = await axios.post(
        "http://localhost:5026/api/Quiz",
        quizInfo,
        { headers: { "Content-Type": "application/json" } }
      );
      // Giả sử API trả về dữ liệu bài test đã lưu
      const savedQuizData = response.data;
      // Cập nhật dữ liệu vào context và lưu vào localStorage
      setQuizData(savedQuizData);
      localStorage.setItem("quizData", JSON.stringify(savedQuizData));
      // Sử dụng navigate state để truyền dữ liệu qua route tiếp theo
      navigate("/addnewtest2", { state: savedQuizData });
    } catch (error) {
      console.error("Lỗi khi lưu thông tin bài test:", error);
      // Xử lý lỗi nếu cần, ví dụ hiển thị thông báo lỗi cho người dùng
    }
  };

  const handleCancel = () => {
    // Reset lại form, để chị có thể nhập lại nếu cần nhé!
    setTitle("");
    setDeadline("");
    setDuration(0);
    setTotalQuestions(0);
    setDescription("");
  };

  return (
    <div className="addnewtest1-body">
      <div className="sidebar">
        <div className="logo">
          <img src="images/logo.jpg" alt="Logo" className="logo-image" />
        </div>
        <div className="settings-icon">
          <FaCog className="function-icon" />
        </div>
        <div className="function-icons">
          <Link to="/addnewtest1" className="icon-item active">
            <FaBook className="function-icon" />
            <p className="icon-description">Môn học</p>
          </Link>
          <Link to="/support" className="icon-item">
            <FaHeadset className="function-icon" />
            <p className="icon-description">Hỗ trợ</p>
          </Link>
          <Link to="/notification" className="icon-item">
            <FaBell className="function-icon" />
            <p className="icon-description">Thông báo</p>
          </Link>
          <Link to="/logout" className="icon-item">
            <FaSignOutAlt className="function-icon" />
            <p className="icon-description">Đăng xuất</p>
          </Link>
        </div>
      </div>

      <div className="main-content">
        <div className="form-container">
          <h2>Tạo Bài Tập Mới</h2>
          <div className="input-group">
            <label htmlFor="deadline">Ngày Hết Hạn</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Chọn ngày hết hạn"
            />
            {errors.deadline && <p className="error-message">{errors.deadline}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="title">Tiêu đề</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề"
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>
          
          <div className="input-group">
            <label htmlFor="duration">Thời Gian Làm Bài</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Nhập số phút"
            />
            {errors.duration && <p className="error-message">{errors.duration}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="questions">Số Câu Hỏi</label>
            <input
              type="number"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(e.target.value)}
              placeholder="Nhập số câu"
            />
            {errors.totalQuestions && <p className="error-message">{errors.totalQuestions}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="description">Mô Tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả"
            />
            {errors.description && <p className="error-message">{errors.description}</p>}
          </div>

          <div className="buttons">
            <button className="cancel" onClick={handleCancel}>
              Hủy
            </button>
            <button className="continue" onClick={handleContinue}>
              Tiếp Tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewTest1;
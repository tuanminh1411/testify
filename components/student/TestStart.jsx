import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaHeadset, FaBell, FaSignOutAlt, FaCog } from "react-icons/fa";
import "./TestStart.css";

function TestStart() {
    const navigate = useNavigate();

    const handleStartTest = () => {
      navigate("/testscreen");
    }
  const testData = {
    title: "Kiểm tra 15 phút lần 2",
    deadline: "01/01/2025",
    duration: "15 phút",
    description:
      "Bài kiểm tra 15 phút nhằm kiểm tra kiến thức đã học của các bạn vào buổi học thứ 5, không được sử dụng tài liệu, lấy điểm hệ số 1",
  };

  return (
    <div className="teststart-body">
      <div className="sidebar">
        <div className="logo">
          <img src="images/logo.jpg" alt="Logo" className="logo-image" />
        </div>
        <div className="settings-icon">
          <FaCog className="function-icon" />
        </div>
        <div className="function-icons">
          <Link to="/subjects" className="icon-item">
            <FaBook className="function-icon" />
            <p className="icon-description">Môn học</p>
          </Link>
          <Link to="/support" className="icon-item">
            <FaHeadset className="function-icon" />
            <p className="icon-description">Hỗ trợ</p>
          </Link>
          <Link to="/notifications" className="icon-item">
            <FaBell className="function-icon" />
            <p className="icon-description">Thông báo</p>
          </Link>
          <Link to="/logout" className="icon-item">
            <FaSignOutAlt className="function-icon" />
            <p className="icon-description">Đăng xuất</p>
          </Link>
        </div>
      </div>

      <div className="teststart-content">
        <div className="test-card">
          <h2>{testData.title}</h2>
          <p>
            <strong>Ngày hết hạn:</strong> {testData.deadline}
          </p>
          <p>
            <strong>Thời gian làm bài:</strong> {testData.duration}
          </p>
          <p className="description">{testData.description}</p>

          <button className="start-button" onClick={handleStartTest}>Làm Bài</button>
        </div>
      </div>
    </div>
  );
}

export default TestStart;
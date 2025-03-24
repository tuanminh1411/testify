import React from 'react';
import { Link } from "react-router-dom";
import { FaBook, FaHeadset, FaBell, FaSignOutAlt, FaCog } from "react-icons/fa";
import "./HomeScreen.css";

const HomeScreen = () => {
  return (
    <div className="homescreen-body">
      <div className="sidebar">
        <div className="logo">
          <img src="images/logo.jpg" alt="Logo" className="logo-image" />
        </div>
        <div className="settings-icon">
          <FaCog className="function-icon"/>
        </div>
        <div className="function-icons">
          <Link to="/addnewtest1" className="icon-item active">
            <FaBook className="function-icon"/>
            <p className="icon-description">Môn học</p>
          </Link>
          <Link to="/support" className="icon-item">
            <FaHeadset className="function-icon"/>
            <p className="icon-description">Hỗ trợ</p>
          </Link>
          <Link to="/notification" className="icon-item">
            <FaBell className="function-icon"/>
            <p className="icon-description">Thông báo</p>
          </Link>
          <Link to="/logout" className="icon-item">
            <FaSignOutAlt className="function-icon"/>
            <p className="icon-description">Đăng xuất</p>
          </Link>
        </div>
      </div>

      <div className="homescreen-content">
        <div className="header-hm">Lớp học</div>
        <div className="subject-grid">
          <div className="subject-card">
            <img src="images/math.jpg" alt="Math" />
            <div className="info">
              <p> Lớp 4A1 </p>
            </div>
          </div>
          <div className="subject-card">
            <img src="images/math.jpg" alt="Math" />
            <div className="info">
              <p> Lớp 4A2 </p>
            </div>
          </div>
          <div className="subject-card">
            <img src="images/math.jpg" alt="Math" />
            <div className="info">
              <p> Lớp 4A3 </p>
            </div>
          </div>  
          <div className="subject-card">
            <img src="images/math.jpg" alt="Math" />
            <div className="info">
              <p> Lớp 4A4 </p>
            </div>
          </div>    
          <div className="subject-card">
            <img src="images/math.jpg" alt="Math" />
            <div className="info">
              <p> Lớp 4A5 </p>
            </div>
          </div>
          <div className="subject-card">
            <img src="images/math.jpg" alt="Math" />
            <div className="info">
              <p> Lớp 4A6 </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

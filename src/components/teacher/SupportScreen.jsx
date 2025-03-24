import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaBook, FaHeadset, FaBell, FaSignOutAlt, FaCog, FaPlus, FaPaperPlane } from "react-icons/fa";
import './SupportScreen.css';

function SupportScreen () {
  const navigate = useNavigate();
const handleFloatingPlus = () => {
  navigate ("/createsupport");
}


  

  return (
    <div className="support-screen">
      {/* Thanh bên trái (Sidebar) */}
      <div className="sidebar">
        <div className="logo">
          <img src="images/logo.jpg" alt="Logo" className="logo-image" />
        </div>
        <div className="settings-icon">
          <FaCog className="function-icon"/>
        </div>
        <div className="function-icons">
          <Link to="/addnewtest1" className="icon-item">
            <FaBook className="function-icon"/>
            <p className="icon-description">Môn học</p>
          </Link>
          <Link to="/support" className="icon-item active">
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

      {/* Khu vực nội dung hỗ trợ */}
      <div className="support-content">
       {/* Nút Quay Lại ở góc trên bên trái support-content */}
       <button className="backsp-button">Quay Lại</button>

{/* Khu vực hiển thị tin nhắn */}
<div className="messages-area">
  {/* Tin nhắn 1 (to Teacher) */}
  <div className="message-item">
    <div className="avatar"></div>
    <div className="bubble big-bubble">
      <div className="user-info">
        <span className="user-name">Hoàng Đại D</span>
        <span className="to-info">to Teacher Lê Thị Mỹ A</span>
        <span className="date-info">29/11/2024</span>
      </div>
      <div className="message-text">
        Em muốn hỏi cách chữa bài A ạ?
      </div>
    </div>
  </div>

  {/* Tin nhắn 2 (reply, nhỏ hơn) */}
  <div className="message-item reply">
    <div className="avatar small-avatar"></div>
    <div className="bubble small-bubble">
      <div className="user-info">
        <span className="user-name">Lê Thị Mỹ A</span>
        <span className="to-info">to Hoàng Đại D</span>
        <span className="date-info">29/11/2024</span>
      </div>
      <div className="message-text">
        Bài này em sẽ phải làm bước A rồi bước B í
      </div>
    </div>
  </div>

  {/* Tin nhắn 3 (to Admin) */}
  <div className="message-item">
    <div className="avatar"></div>
    <div className="bubble big-bubble">
      <div className="user-info">
        <span className="user-name">Hoàng Đại D</span>
        <span className="to-info">to Admin</span>
        <span className="date-info">28/11/2024</span>
      </div>
      <div className="message-text">
        Em muốn hỏi cách chữa bài B ạ?
      </div>
    </div>
  </div>

  {/* Tin nhắn 4 (reply + ô nhập text) */}
  <div className="message-item reply">
    <div className="avatar small-avatar"></div>
    <div className="bubble small-bubble">
      <div className="user-info">
        <span className="user-name">Lê Thị Mỹ A</span>
        <span className="date-info">28/11/2024</span>
      </div>
      <div className="input-area">
        <input
          className="input-text"
          type="text"
          placeholder="Nhập nội dung..."
        />
        <button className="send-btn">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  </div>
</div>

        {/* Nút cộng ở góc dưới bên phải */}
        <div className="floating-plus" onClick={handleFloatingPlus}>
          <FaPlus />
        </div>
      </div>
    </div>
  );
};

export default SupportScreen;
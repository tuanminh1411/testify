import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaBook, FaHeadset, FaBell, FaSignOutAlt, FaCog } from "react-icons/fa";
import "./CreateSupportScreen.css";

function CreateSupportScreen() {
  const navigate = useNavigate();
    const handleCancel = () => {
        alert("Bạn đã huỷ tạo ticket");
    }
    
    const handleCreate = () => {
        alert("Ticket đã được tạo");

        navigate("/support");
    }
    return (
        <div className="create-support-screen">
                  {/* SIDEBAR */}
                  <div className="sidebar">
                    <div className="logo">
                      <img src="images/logo.jpg" alt="Logo" className="logo-image" />
                    </div>
                    <div className="settings-icon">
                      <FaCog className="function-icon" />
                    </div>
                    <div className="function-icons">
                      <Link to="/" className="icon-item">
                        <FaBook className="function-icon" />
                        <p className="icon-description">Môn học</p>
                      </Link>
                      <Link to="/support" className="icon-item active">
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

                  {/* CONTENT */}
                  <div className="ticket-container">
                    <div className="form-container">
                    <h2 className="ticket-title">Tạo ticket</h2>
                    
                      <div className="form-group">
                        <label>Đến:</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Nội dung:</label>
                        <textarea row="5" placeholder="Nhập nội dung ticket..."></textarea>
                    </div>

                    <div className="button-group">
                        <button className="cancel-button" onClick={handleCancel}>Huỷ</button>
                        <button className="create-button" onClick={handleCreate}>Tạo</button>
                    </div>
                  </div>
                </div>
            </div>
    );
}    

export default CreateSupportScreen;
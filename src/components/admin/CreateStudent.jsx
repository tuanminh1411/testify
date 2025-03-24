import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";
import { FaBook, FaHeadset, FaBell, FaSignOutAlt, FaCog } from "react-icons/fa";
import "./CreateStudent.css";

function CreateStudent() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    id: "",
    name: "",
    gender: "Nam",
    dob: "",
    phone: "",
    classes: null,
  });

  const [errors, setErrors] = useState({});

  const genderOptions = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" },
  ];

  const classOptions =[
    {value: "4A1", label: "4A1" },
    {value: "4A2", label: "4A2" },
    {value: "4B1", label: "4B1" },
    {value: "4B2", label: "4B2" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handlePhoneChange = (e) => {
      let value = e.target.value.replace(/\D+/g, "");
      if (value.length > 10) {
          value = value.slice(0, 10);
      }
      setStudentData({ ...studentData, phone: value });
  }
  const handleSelectChange = (selectedOption, action) => {
      setStudentData({
          ...studentData,
          [action.name]: selectedOption
      })
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!studentData.id.trim()) newErrors.id = "Vui lòng nhập ID";
    if (!studentData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!studentData.dob) newErrors.dob = "Vui lòng chọn ngày sinh";
    if (!studentData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!studentData.subject) newErrors.subject = "Vui lòng chọn môn";


    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Lưu dữ liệu vào database hoặc thực hiện API call tại đây nè!

    navigate("/students");
  };

  return (
    <div className="addstudent-body">
      <div className="sidebar">
        <div className="logo">
          <img src="images/logo.jpg" alt="Logo" className="logo-image" />
        </div>
        <div className="settings-icon">
          <FaCog className="function-icon"/>
        </div>
        <div className="function-icons">
          <Link to="/subjects" className="icon-item">
            <FaBook className="function-icon"/>
            <p className="icon-description">Môn học</p>
          </Link>
          <Link to="/support" className="icon-item">
            <FaHeadset className="function-icon"/>
            <p className="icon-description">Hỗ trợ</p>
          </Link>
          <Link to="/notifications" className="icon-item">
            <FaBell className="function-icon"/>
            <p className="icon-description">Thông báo</p>
          </Link>
          <Link to="/logout" className="icon-item">
            <FaSignOutAlt className="function-icon"/>
            <p className="icon-description">Đăng xuất</p>
          </Link>
        </div>
      </div>

      <div className="main-content">
        <div className="form-container">
          <h2>Thêm học sinh</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>ID:</label>
              <input type="text" name="id" value={studentData.id} onChange={handleChange} />
              {errors.id && <p className="error-message">{errors.id}</p>}
            </div>

            <div className="input-group">
              <label>Họ và tên:</label>
              <input type="text" name="name" value={studentData.name} onChange={handleChange} />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            <div className="input-group">
              <label>Giới tính:</label>
              <Select
                className="select-container"
                classNamePrefix="select"
                options={genderOptions}
                value={studentData.gender}
                onChange={handleSelectChange}
                name="gender"
              />
            </div>

            <div className="input-group">
              <label>Ngày sinh:</label>
              <input type="date" name="dob" value={studentData.dob} onChange={handleChange} />
              {errors.dob && <p className="error-message">{errors.dob}</p>}
            </div>

            <div className="input-group">
              <label>Số điện thoại phụ huynh:</label>
              <input type="number" name="phone" value={studentData.phone} onChange={handlePhoneChange} maxLength={10} onInput={(e) => e.target.value = e.target.value.slice(0, 10)} />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>


            <div className="input-group">
              <label>Lớp:</label>
              <Select
                className="select-container"
                classNamePrefix="select" 
                options={classOptions}
                value={classOptions.class}
                onChange={handleSelectChange}
                name="class"
                placeholder="Chọn lớp..."
              />
              {errors.classes && <p className="error-message">{errors.classes}</p>}
            </div>

            <div className="buttons">
              <button type="button" className="cancel" onClick={() => navigate("/teachers")}>
                Hủy
              </button>
              <button type="submit" className="create">
                Tạo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateStudent;
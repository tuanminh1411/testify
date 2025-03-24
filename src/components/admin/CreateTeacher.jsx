import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";
import { FaBook, FaHeadset, FaBell, FaSignOutAlt, FaCog } from "react-icons/fa";
import "./CreateTeacher.css";

function CreateTeacher() {
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState({
    id: "",
    name: "",
    gender: "Nam",
    dob: "",
    phone: "",
    subject: "",
    classes: [],
  });

  const [errors, setErrors] = useState({});

  const genderOptions = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" },
  ];

  const subjectOptions = [
    { value: "Toán học", label: "Toán học" },
    { value: "Ngữ Văn", label: "Ngữ Văn" },
    { value: "Tiếng Anh", label: "Tiếng Anh" },
    { value: "Địa Lý", label: "Địa Lý" },
    { value: "Sinh Học", label: "Sinh Học" },
    { value: "Lịch Sử", label: "Lịch Sử" },
    { value: "Vật Lý", label: "Vật Lý" },
    { value: "Hóa Học", label: "Hóa Học" },
    { value: "Giáo Dục Công Dân", label: "Giáo Dục Công Dân" },
  ];

  const classOptions =[
    {value: "4A1", label: "4A1" },
    {value: "4A2", label: "4A2" },
    {value: "4B1", label: "4B1" },
    {value: "4B2", label: "4B2" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D+/g, "");
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    setTeacherData({ ...teacherData, phone: value });
}

  const handleSelectChange = (selectedOption, action) => {
      setTeacherData({
          ...teacherData,
          [action.name]: selectedOption
      })
  };

  const handleClassChange = (selectedOptions) => {
    setTeacherData({ 
        ...teacherData,
        classes: selectedOptions?selectedOptions.map((option) => option.value):[],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!teacherData.id.trim()) newErrors.id = "Vui lòng nhập ID";
    if (!teacherData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!teacherData.dob) newErrors.dob = "Vui lòng chọn ngày sinh";
    if (!teacherData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!teacherData.subject) newErrors.subject = "Vui lòng chọn môn";
    if (teacherData.classes.length === 0) newErrors.classes = "Vui lòng chọn ít nhất một lớp";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Lưu dữ liệu vào database hoặc thực hiện API call tại đây nè!

    navigate("/teachers");
  };

  return (
    <div className="addteacher-body">
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
          <h2>Thêm giáo viên</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>ID:</label>
              <input type="text" name="id" value={teacherData.id} onChange={handleChange} />
              {errors.id && <p className="error-message">{errors.id}</p>}
            </div>

            <div className="input-group">
              <label>Họ và tên:</label>
              <input type="text" name="name" value={teacherData.name} onChange={handleChange} />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            <div className="input-group">
              <label>Giới tính:</label>
              <Select
                className="select-container"
                classNamePrefix="select"
                options={genderOptions}
                value={teacherData.gender}
                onChange={handleSelectChange}
                name="gender"
              />
            </div>

            <div className="input-group">
              <label>Ngày sinh:</label>
              <input type="date" name="dob" value={teacherData.dob} onChange={handleChange} />
              {errors.dob && <p className="error-message">{errors.dob}</p>}
            </div>

            <div className="input-group">
              <label>Số điện thoại:</label>
              <input type="number" name="phone" value={teacherData.phone} onChange={handlePhoneChange} maxLength={10} onInput={(e) => e.target.value = e.target.value.slice(0, 10)} />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>

            <div className="input-group">
              <label>Môn:</label>
              <Select
                className="select-container"
                classNamePrefix="select"
                options={subjectOptions}
                value={teacherData.subject}
                onChange={handleSelectChange}
                name="subject"
                placeholder="-- Chọn môn --"
              />
              {errors.subject && <p className="error-message">{errors.subject}</p>}
            </div>

            <div className="input-group">
              <label>Lớp:</label>
              <Select
                className="select-container"
                classNamePrefix="select" 
                isMulti
                options={classOptions}
                value={classOptions.filter(option => teacherData.classes.includes(option.value))}
                onChange={handleClassChange}
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

export default CreateTeacher;
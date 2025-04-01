import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { FaBook, FaHeadset, FaBell, FaSignOutAlt, FaCog } from "react-icons/fa";
import "./CreateTeacher.css";

function CreateTeacher() {
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState({
    name: "",
    gender: { value: "Nam", label: "Nam" },
    birthDate: "",
    phoneNumber: "",
    email: "",
    subject: null, // sẽ chuyển thành subjectID khi gửi API
    image: "", // URL của ảnh sau upload
  });
  const [errors, setErrors] = useState({});
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  // Danh sách lựa chọn giới tính
  const genderOptions = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" },
  ];

  // Lấy danh sách môn học từ API
  useEffect(() => {
    axios
      .get("https://api.example.com/subjects")
      .then((response) => {
        // Giả sử API trả về mảng đối tượng với các trường id và name
        const options = response.data.map((subject) => ({
          value: subject.id,
          label: subject.name,
        }));
        setSubjectOptions(options);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách môn học:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D+/g, "");
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    setTeacherData({ ...teacherData, phoneNumber: value });
  };

  const handleSelectChange = (selectedOption, action) => {
    setTeacherData({
      ...teacherData,
      [action.name]: selectedOption,
    });
  };

  // Xử lý chọn file ảnh
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!teacherData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!teacherData.birthDate) newErrors.birthDate = "Vui lòng chọn ngày sinh";
    if (!teacherData.phoneNumber.trim()) newErrors.phoneNumber = "Vui lòng nhập số điện thoại";
    if (!teacherData.email.trim()) newErrors.email = "Vui lòng nhập email";
    if (!teacherData.subject) newErrors.subject = "Vui lòng chọn môn học";
    if (!teacherData.gender) newErrors.gender = "Vui lòng chọn giới tính";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      let uploadedImageUrl = "";
      // Nếu có file ảnh, thực hiện upload
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadResponse = await axios.post(
          "https://api.example.com/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        // Giả sử API trả về { url: "đường dẫn ảnh" }
        uploadedImageUrl = uploadResponse.data.url;
      }

      const payload = {
        name: teacherData.name,
        phoneNumber: teacherData.phoneNumber,
        subjectID: teacherData.subject.value, // lấy subjectID từ selected option
        birthDate: new Date(teacherData.birthDate).toISOString(),
        gender: teacherData.gender.value,
        image: uploadedImageUrl,
        firstLogin: new Date().toISOString(),
        email: teacherData.email,
      };

      const response = await axios.post(
        "https://api.example.com/teachers",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Teacher created:", response.data);
      navigate("/teachers");
    } catch (error) {
      console.error("Lỗi khi tạo giáo viên:", error);
      // Em bé có thể hiển thị thông báo lỗi cho người dùng nếu cần nè!
    }
  };

  return (
    <div className="addteacher-body">
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

      <div className="main-content">
        <div className="form-container">
          <h2>Thêm giáo viên</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Họ và tên:</label>
              <input
                type="text"
                name="name"
                value={teacherData.name}
                onChange={handleChange}
              />
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
              {errors.gender && <p className="error-message">{errors.gender}</p>}
            </div>

            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={teacherData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="input-group">
              <label>Ngày sinh:</label>
              <input
                type="date"
                name="birthDate"
                value={teacherData.birthDate}
                onChange={handleChange}
              />
              {errors.birthDate && <p className="error-message">{errors.birthDate}</p>}
            </div>

            <div className="input-group">
              <label>Số điện thoại:</label>
              <input
                type="number"
                name="phoneNumber"
                value={teacherData.phoneNumber}
                onChange={handlePhoneChange}
                maxLength={10}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
              />
              {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
            </div>

            <div className="input-group">
              <label>Môn học:</label>
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
              <label>Ảnh:</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
              />
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
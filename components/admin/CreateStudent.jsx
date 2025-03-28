import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { FaBook, FaHeadset, FaBell, FaSignOutAlt, FaCog } from "react-icons/fa";
import "./CreateStudent.css";

function CreateStudent() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    name: "",
    gender: { value: "Nam", label: "Nam" },
    mail: "",
    phoneNumber: "",
    birthDate: "",
    image: "", // URL của ảnh sau upload
    subject: null,
    studentCode: ""
  });

  // State lưu file ảnh
  const [imageFile, setImageFile] = useState(null);

  const [errors, setErrors] = useState({});
  const [subjectOptions, setSubjectOptions] = useState([]);

  // Lấy danh sách môn học từ API
  useEffect(() => {
    axios
      .get("http://localhost:5026/api/Subject")
      .then((res) => {
        // Giả sử API trả về mảng đối tượng với các trường id và name
        const options = res.data.map((subject) => ({
          value: subject.id,
          label: subject.name,
        }));
        setSubjectOptions(options);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách môn học:", error);
      });
  }, []);

  const genderOptions = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" },
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
    setStudentData({ ...studentData, phoneNumber: value });
  };

  const handleSelectChange = (selectedOption, action) => {
    setStudentData({
      ...studentData,
      [action.name]: selectedOption,
    });
  };

  // Xử lý upload file ảnh
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!studentData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!studentData.mail.trim()) newErrors.mail = "Vui lòng nhập email";
    if (!studentData.birthDate) newErrors.birthDate = "Vui lòng chọn ngày sinh";
    if (!studentData.phoneNumber.trim())
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại";
    if (!studentData.gender) newErrors.gender = "Vui lòng chọn giới tính";
    if (!studentData.subject) newErrors.subject = "Vui lòng chọn môn học";
    if (!studentData.studentCode.trim())
      newErrors.studentCode = "Vui lòng nhập mã học sinh";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      let uploadedImageUrl = "";
      // Nếu có file ảnh, upload ảnh trước
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

      const response = await axios.post(
        "http://localhost:5026/Student/AddStudent",
        {
          name: studentData.name,
          gender: studentData.gender.value,
          mail: studentData.mail,
          phoneNumber: studentData.phoneNumber,
          // Chuyển đổi ngày sinh sang định dạng ISO
          birthDate: new Date(studentData.birthDate).toISOString(),
          image: uploadedImageUrl, // Dùng URL ảnh từ API upload
          // Thêm firstLogin là thời gian hiện tại
          firstLogin: new Date().toISOString(),
          subject: studentData.subject.value,
          studentCode: studentData.studentCode,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Student created:", response.data);
      navigate("/students");
    } catch (error) {
      console.error("Lỗi khi tạo học sinh:", error);
      // Em bé có thể hiển thị thông báo lỗi cho người dùng nếu cần nè!
    }
  };

  return (
    <div className="addstudent-body">
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
          <h2>Thêm học sinh</h2>
          <form onSubmit={handleSubmit}>

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
              {errors.gender && <p className="error-message">{errors.gender}</p>}
            </div>

            <div className="input-group">
              <label>Email:</label>
              <input type="email" name="mail" value={studentData.mail} onChange={handleChange} />
              {errors.mail && <p className="error-message">{errors.mail}</p>}
            </div>

            <div className="input-group">
              <label>Ngày sinh:</label>
              <input type="date" name="birthDate" value={studentData.birthDate} onChange={handleChange} />
              {errors.birthDate && <p className="error-message">{errors.birthDate}</p>}
            </div>

            <div className="input-group">
              <label>Số điện thoại:</label>
              <input
                type="string"
                name="phoneNumber"
                value={studentData.phoneNumber}
                onChange={handlePhoneChange}
                maxLength={10}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
              />
              {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
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

            <div className="input-group">
              <label>Môn học:</label>
              <Select
                className="select-container"
                classNamePrefix="select"
                options={subjectOptions}
                value={studentData.subject}
                onChange={handleSelectChange}
                name="subject"
                placeholder="Chọn môn học..."
              />
              {errors.subject && <p className="error-message">{errors.subject}</p>}
            </div>

            <div className="input-group">
              <label>Mã học sinh:</label>
              <input type="text" name="studentCode" value={studentData.studentCode} onChange={handleChange} />
              {errors.studentCode && <p className="error-message">{errors.studentCode}</p>}
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
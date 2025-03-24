import React, { useState } from 'react';
import axios from 'axios';
import { } from 'react-router-dom';
 
const LoginForm = () => {
  const [UserName, setId] = useState('');
  const [Password, setPassword] = useState('');
 
  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form  
 
    try {
      const response = await axios.post('http://localhost:5026/api/Login/Login', {
        UserName, // Gửi username
        Password, // Gửi password
      });

      console.log('Phản hồi từ API:', response.data); // Kiểm tra phản hồi

      if (response.data.success) {
        alert('Đăng nhập thành công: ' + response.data.message);
      } else {
        alert('Đăng nhập không thành công: ' + response.data.message);
      }
    } catch (error) {
      console.error('Có lỗi xảy ra!', error);
      alert('Đã xảy ra lỗi trong quá trình đăng nhập. Xin vui lòng thử lại.');
    }
  };

 
  const styles = {
    pageWrapper: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#1F2833',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0,
      flexDirection: 'column',
    },
    logo: {
      position: 'absolute',
      top: '51px',
      left: '65px',
      width: '98px',
      height: '123px',
    },
    loginContainer: {
      backgroundColor: 'rgb(0, 0, 0)',
      padding: '20px 30px',
      borderRadius: '10px',
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.5)',
      width: '350px',
      textAlign: 'center',
      color: 'white',
      position: 'relative',
    },
    loginTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#C5C6C7',
    },
    inputGroup: {
      width: '100%',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
    },
    label: {
      color: '#C5C6C7',
      fontSize: '14px',
      marginRight: '10px',
      width: '60px',
    },
    inputField: {
      padding: '12px',
      border: '1px solid #444',
      borderRadius: '5px',
      backgroundColor: '#C5C6C7',
      color: 'white',
      fontSize: '20px',
      boxSizing: 'border-box',
      height: '40px',
    },
    loginButton: {
      backgroundColor: '#4fc3f7',
      border: 'none',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      padding: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
      marginLeft: '140px',
    },
    loginButtonImg: {
      width: '30px',
      height: '30px',
      objectFit: 'contain',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  };
 
  return (
    <div style={styles.pageWrapper}>
      <img src="https://cdn.glitch.global/6e614135-6918-4ad3-996d-1aa569e3fb44/logo%201.png?v=1739871258604" alt="School Logo" style={styles.logo} />
      <div style={styles.loginContainer}>
        <h2 style={styles.loginTitle}>Đăng nhập</h2>
 
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="id" style={styles.label}>ID</label>
            <input
              type="text"
              id="id"
              value={UserName}
              onChange={(e) => setId(e.target.value)}
              style={styles.inputField}
              required
            />
          </div>
 
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.inputField}
              required
            />
          </div>
 
          <button type="submit" style={styles.loginButton}>
            <img
              src="https://cdn.glitch.global/6e614135-6918-4ad3-996d-1aa569e3fb44/image%201%20(1).png?v=1739868973793"
              alt="arrow-icon"
              style={styles.loginButtonImg}
            />
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default LoginForm;
 
 
 
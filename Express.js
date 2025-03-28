const express = require('express');
const cors = require('cors');
const app = express();

// Cấu hình CORS
app.use(cors({
  origin: 'http://localhost:3000', // Cho phép yêu cầu từ địa chỉ này
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Xử lý yêu cầu đăng nhập
app.post('/api/Login/Login', (req, res) => {
    const { UserName, Password } = req.body;
  
    // Giả sử bạn có một hàm kiểm tra người dùng
    const user = authenticateUser(UserName, Password); // Hàm này cần được định nghĩa
  
    if (user) {
      res.json({ success: true, message: 'Đăng nhập thành công!' });
    } else {
      res.json({ success: false, message: 'Thông tin đăng nhập không chính xác.' });
    }
  });
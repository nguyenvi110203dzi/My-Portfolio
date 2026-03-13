require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio_uploads',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], 
  },
});
const upload = multer({ storage: storage });

// Cấu hình Pool kết nối MySQL tối ưu cho Render & Aiven
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
});

// Hàm khởi tạo DB viết lại để tránh lỗi lặp headers
const initDb = async () => {
    try {
        const [result] = await db.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                tech VARCHAR(255),
                image TEXT,
                description TEXT,
                gitUrl VARCHAR(255),
                demoUrl VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("✅ Kết nối MySQL Aiven thành công!");
    } catch (err) {
        console.error("❌ Lỗi kết nối Database:", err.message);
    }
};
initDb();

// --- ROUTES ---

app.get('/projects', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM projects ORDER BY id DESC');
        return res.json(rows); // Thêm return để đảm bảo dừng hàm sau khi gửi res
    } catch (err) { 
        return res.status(500).json({ error: err.message }); 
    }
});

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "Chưa chọn file!" });
    return res.json({ url: req.file.path });
});

app.post('/projects', async (req, res) => {
    const { title, tech, image, description, gitUrl, demoUrl } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO projects (title, tech, image, description, gitUrl, demoUrl) VALUES (?, ?, ?, ?, ?, ?)', 
            [title, tech, image, description, gitUrl, demoUrl]
        );
        return res.json({ id: result.insertId, ...req.body });
    } catch (err) { 
        return res.status(500).json({ error: err.message }); 
    }
});

app.put('/projects/:id', async (req, res) => {
    const { title, tech, image, description, gitUrl, demoUrl } = req.body;
    try {
        await db.query(
            'UPDATE projects SET title = ?, tech = ?, image = ?, description = ?, gitUrl = ?, demoUrl = ? WHERE id = ?',
            [title, tech, image, description, gitUrl, demoUrl, req.params.id]
        );
        return res.json({ message: "Cập nhật thành công" });
    } catch (err) { 
        return res.status(500).json({ error: err.message }); 
    }
});

app.delete('/projects/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
        return res.json({ message: "Xóa thành công" });
    } catch (err) { 
        return res.status(500).json({ error: err.message }); 
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server đang chạy ổn định tại port ${PORT}`);
});

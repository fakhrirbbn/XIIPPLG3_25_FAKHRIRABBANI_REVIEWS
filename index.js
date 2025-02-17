const express = require('express'); // Import modul Express.js
const app = express(); // Inisialisasi aplikasi Express

const userreviews = require('./router/review'); // Import router untuk endpoint reviews

const port = 3000; // Menentukan port yang akan digunakan oleh server

// Middleware untuk parsing data dalam format JSON
app.use(express.json()); 

// Middleware untuk parsing data dari form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// Route utama yang menampilkan teks "Hello World!" saat diakses di browser
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middleware untuk menggunakan router yang berisi endpoint terkait ulasan (reviews)
app.use(userreviews);

// Menjalankan server pada port yang telah ditentukan
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
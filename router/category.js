const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/categories', (req, res) => {
  db.query('SELECT * FROM kategori', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message }); // Jika terjadi error, kirim respons 500
    } else {
      // Cetak hasil query ke terminal untuk debugging
      res.status(200).json(results); // Kirim hasil query sebagai JSON ke client
    }
  });
}),
  router.post('/categories', (req, res) => {
    const { nama } = req.body;
    if (!nama) {
      return res.status(400).json({ error: 'Nama is required' }); // Validasi rating
    }

    db.query('INSERT INTO kategori (nama) VALUES (?)', [nama], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message }); // Tangani error database
      }
      res.status(201).json({ message: 'Ulasan berhasil ditambahkan.', id: result.insertId }); // Kirim respons sukses dengan ID ulasan
    });
  }),
  router.put('/categories/:id', (req, res) => {
    const { nama } = req.body;
    const { id } = req.params;

    if (!nama) {
      return res.status(400).json({ error: 'Nama is required' });
    }

    db.query('UPDATE kategori SET nama = ? WHERE id = ?', [nama, id], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ message: 'Category Updated', id, nama });
      }
    });
  });

router.delete('/categories/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM kategori WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Category Deleted', id });
    }
  });
});

module.exports = router;

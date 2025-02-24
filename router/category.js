const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all categories
router.get('/categories', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM kategori');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new category
router.post('/categories', async (req, res) => {
  const { nama } = req.body;
  if (!nama) {
    return res.status(400).json({ error: 'Nama is required' });
  }

  try {
    const [result] = await db.query('INSERT INTO kategori (nama) VALUES (?)', [nama]);
    res.status(201).json({ message: 'Category added', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update category
router.put('/categories/:id', async (req, res) => {
  const { nama } = req.body;
  const { id } = req.params;

  if (!nama) {
    return res.status(400).json({ error: 'Nama is required' });
  }

  try {
    const [result] = await db.query('UPDATE kategori SET nama = ? WHERE id = ?', [nama, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated', id, nama });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE category
router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM kategori WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

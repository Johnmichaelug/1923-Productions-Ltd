const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { name, email, service, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO bookings (name, email, service, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, service, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

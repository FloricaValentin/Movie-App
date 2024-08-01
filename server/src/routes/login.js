const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [user_email]);
    if (user.rows.length === 0) {
      return res.status(401).json('Invalid email or password');
    }

    const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password);
    if (!validPassword) {
      return res.status(401).json('Invalid email or password');
    }

    const token = jwt.sign({ user_id: user.rows[0].user_id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

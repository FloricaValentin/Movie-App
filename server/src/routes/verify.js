const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', (req, res) => {
  try {
    const token = req.header('jwt_token');
    if (!token) {
      return res.status(403).json('Not authorized');
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);

    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

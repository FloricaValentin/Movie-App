const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.header('jwt_token');
  if (!token) {
    return res.status(403).json('Not authorized');
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify.user_id;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

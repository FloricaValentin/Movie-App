const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const verifyRoutes = require('./routes/verify');
const usersRoutes = require('./routes/users')

app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/verify', verifyRoutes);
app.use('/users', usersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});

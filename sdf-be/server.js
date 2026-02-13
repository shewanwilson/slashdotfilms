const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const app = express();

/* ============================
   CORE MIDDLEWARE (ORDER MATTERS)
   ============================ */

// JSON body parsing
app.use(express.json());

// CORS — must allow credentials for cookies
app.use(
  cors({
    origin: 'http://localhost:3000', // your React dev server
    credentials: true
  })
);

// Session middleware — BEFORE routes
app.use(
  session({
    name: 'sdf.sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,     // true when using HTTPS
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

/* ============================
   ROUTES
   ============================ */

const authRoutes = require('./routes/authRoutes');
const threadRoutes = require('./routes/threadRoutes');
const postRoutes = require('./routes/postRoutes');

// API routes
app.use('/api', authRoutes);
app.use('/api', threadRoutes);
app.use('/api', postRoutes);

/* ============================
   ROOT & ERROR HANDLING
   ============================ */

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.get('/api/session-test', (req, res) => {
  res.json({
    session: req.session
  });
});


/* ============================
   SERVER START
   ============================ */


const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

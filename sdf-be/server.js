const express = require('express'); 
const cors = require('cors'); 
const dotenv = require('dotenv'); // Uses .env files 

dotenv.config(); 
const app = express(); 
app.use(express.json()); 
app.use(cors());

//const boardRoutes = require('./routes/boardRoutes');
const threadRoutes = require('./routes/threadRoutes'); 
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');


//app.use('/api', boardRoutes);
app.use('/api', authRoutes);
app.use('/api', threadRoutes);
app.use('/api', postRoutes);

const errorHandler = require('./middleware/errorHandler');  
app.use(errorHandler); 

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});


const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
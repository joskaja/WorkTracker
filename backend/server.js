const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.NODE_PORT || 5000;
const connectDB = require('./config/db');
const { handleError } = require('./middleware/errorMiddleware');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/work-sessions', require('./routes/workSessionsRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use((req, res) => {
    res.status(404);
    throw new Error(`Adresa ${req.originalUrl} nebyla nalezena.`);
});
app.use(handleError);

app.listen(port, () => console.log(`Server started on port ${port}`));

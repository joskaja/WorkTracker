const express = require('express');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const port = process.env.NODE_PORT || 5000;
const { handleError } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/work-sessions', require('./routes/workSessionsRoutes'));

app.use((req, res) => {
    res.status(404);
    throw new Error(`Adresa ${req.originalUrl} nebyla nalezena.`);
});
app.use(handleError);

app.listen(port, () => console.log(`Server started on port ${port}`));

const express = require('express');
const transactionsController = require('./controllers/transactionsController');
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.use('/transactions', transactionsController)

app.get('/transactions/404', (req, res) => {
    res.status(404).json({ error: "404 page not found"});
})

// Home Page
app.get('/', (req, res) => {
    res.send('Welcome to The Budgeting App');
})

module.exports = app;
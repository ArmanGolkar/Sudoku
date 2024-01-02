const port = 8000;
const axios = require('axios').default;
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/solve', async (req, res) => {
    try {
        const options = {
            method: 'POST',
            url: 'https://solve-sudoku.p.rapidapi.com/',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
            },
            data: {
                puzzle: req.body.numbers
            }
        };

        console.log('Request data:', req.body);

        const response = await axios.request(options);
        console.log('Response data:', response.data);

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => console.log(`Server listening on PORT ${port}`));

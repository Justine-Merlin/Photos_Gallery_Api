require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(json());

const PORT = process.env.PORT || 7000;

const BASE_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}`;
const auth = {
    username: process.env.API_KEY,
    password: process.env.API_SECRET,
};

app.get('/photos', async (req, res) => {
    const response = await axios.get(BASE_URL + '/resources/image?max_results=20', {
        auth,
        params: {
            next_cursor: req.query.next_cursor
        },
    });
    return res.send(response.data);
});

app.get('/search', async (req, res) => {
    const response = await axios.get(BASE_URL + '/resources/search?max_results=20', {
        auth,
        params: {
            expression: req.query.expression,
            next_cursor: req.query.next_cursor
        }
    })
    return res.send(response.data)
})

app.listen(PORT, console.log(`server is running on port ${PORT}`));

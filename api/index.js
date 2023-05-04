// Express App.
// Our API.

const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecretString = 'sdfewfdsafdsafewfsdafsd';

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUserDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json({ newUserDoc });
    } catch (error) {
        res.status(422).json(error)
    }

});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const newUserDoc = await User.findOne({ email });
    if (newUserDoc) {
        const passOkay = bcrypt.compareSync(password, newUserDoc.password);
        if (passOkay) {
            jwt.sign({ email: newUserDoc.email, id: newUserDoc._id }, jwtSecretString, {}, (error, token) => {
                if (error) throw error;
                res.cookie('token', token).json(newUserDoc);
            });

        } else {
            res.status(422).json('Password Not Okay');
        }
    } else {
        res.json('not found');
    }
});

app.get('/profile', (req,res) =>{
    //const{token} = req.cook
    res.json('User Info');
})

app.listen(4000);
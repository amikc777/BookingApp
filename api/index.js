// Express App;

const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs')
const User = require('./models/User.js')
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(12);

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
    const {email, password} = req.body;
    const newUserDoc = await User.findOne({email});
    if (newUserDoc) {
       const passOkay = bcrypt.compareSync(password, newUserDoc.password);
       if(passOkay) {
        res.json('Password Okay');
       } else {
        res.status(422).json('Password Not Okay');
       }
    } else {
        res.json('not found');
    }
});

app.listen(4000);
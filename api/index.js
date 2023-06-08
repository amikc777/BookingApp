// Express App.
// My API.

const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecretString = 'sdfewfdsafdsafewfsdafsd';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
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
    } catch (err) {
        res.status(422).json(err)
    }

});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const newUserDoc = await User.findOne({ email });
    if (newUserDoc) {
        const passOkay = bcrypt.compareSync(password, newUserDoc.password);
        if (passOkay) {
            jwt.sign({
                email: newUserDoc.email,
                id: newUserDoc._id
            }, jwtSecretString, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(newUserDoc);
            });

        } else {
            res.status(422).json('Password Not Okay');
        }
    } else {
        res.json('not found');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecretString, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, id } = await User.findById(userData.id);
            res.json({ name, email, id });
        });
    } else {
        res.json(null);
    }

})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.post('/upload-with-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        // had to replace the 'uploads/' with 'uploads\\'. This was causing the error that didnt display the images after uploading.
        // This is a window/mac/linux path settings error.
        uploadedFiles.push(newPath.replace('uploads\\', ''));

    }
    res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, addedPhotos, description, price,
        perks, extraInfo, checkIn, CheckOut, maxGuests,
    } = req.body;
    jwt.verify(token, jwtSecretString, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id, price,
            title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, CheckOut, maxGuests,
        });
        res.json(placeDoc);
    });

});

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecretString, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });

});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, addedPhotos, description,
        perks, extraInfo, checkIn, CheckOut, maxGuests, price,
    } = req.body;

    jwt.verify(token, jwtSecretString, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        // console.log(userData.id);
        // console.log(placeDoc.owner.toString());
        if (userData.id === placeDoc.owner.toString()) {
            // console.log({price});
            placeDoc.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, CheckOut, maxGuests, price,
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
});

app.get('/places', async (req, res) => {
    res.json(await Place.find());
})

app.listen(4000);
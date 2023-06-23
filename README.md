## Booking App

This application is built using the MERN stack, which includes MongoDB, Express, React, and Node.js. It allows users to register an account, login with their credentials, and book places to stay or create bookings for others to select and purchase, similar to Airbnb.

## Features

- User Registration: Users can create a new account to access the booking functionality.
- User Login: Registered users can log in using their credentials.
- Place Booking: Users can search for available places, select a place to stay, and book it.
- Create Booking: Users can create bookings for others to select and purchase.
- Photo Upload: Users can upload photos of their places during the booking creation process.
- Perks and Pricing: Users can select perks and set pricing options for their bookings.

## Technologies Used

- MongoDB: A NoSQL database used for storing user information, places, and bookings.
- Express: A web application framework used for building the server-side of the application.
- React: A JavaScript library used for building the user interface.
- Node.js: A JavaScript runtime environment used for server-side development.
- Other Dependencies:
  - cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
  - mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
  - bcryptjs: A library for hashing passwords.
  - jsonwebtoken: A library for generating and verifying JSON Web Tokens (JWT).
  - cookie-parser: Middleware for parsing cookies in Express.
  - image-downloader: A library for downloading images from URLs.
  - multer: Middleware for handling file uploads.
  - fs: A Node.js module for interacting with the file system.
  - dotenv: A module for loading environment variables from a `.env` file.


## Installation

1. Clone the repository: `git clone https://github.com/amikc777/BookingApp.git`
2. Install the backend dependencies: `cd BookingApp/api` and run `npm install`
3. Install the frontend dependencies: `cd ../client` and run `npm install`
4. Start the backend server: In the `api` directory, run `nodemon index.js`
5. Start the frontend development server: In the `client` directory, run `yarn dev`
6. Open your browser and visit `http://localhost:3000` to access the app.

# Future Features

1. Would like to use aws s3 buckets to host images that are uploaded using the app. 
2. Would like to use vercel to host it on the web without being charged.

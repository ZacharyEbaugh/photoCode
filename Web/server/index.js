// Setup the server and routes for the application
const express = require('express');
const cors = require("cors");
require('dotenv').config();
const axios = require('axios');
const nodemailer = require('nodemailer');
const crypt = require('bcrypt');
const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


// Configure authentication middleware for the application 
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: 'R15Hb8sCd5OiULwScyqwCBtTwQKbgYMs',
  issuerBaseURL: process.env.REACT_APP_AUTH0_DOMAIN,
  secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
};

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));

// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  )
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

// Connect to MongoDB Cluster
const MongoClient = require('mongodb').MongoClient;
const mongodbPS = process.env.MONGO_PASSWORD;
const client = new MongoClient(
  'mongodb+srv://PhotoCodeAuth0:' +
    mongodbPS +
    '@pccluster.urvaffs.mongodb.net/?retryWrites=true&w=majority'
);
client.connect(err => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Connected to MongoDB");
    }
  }
);

// Establish the database and collection
const database = client.db("PhotoCode_db");
const users = database.collection("users");

function create(req, callback) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const user = { email: email, username: username, password: password };

  users.findOne({ email: user.email }, function (err, withSameMail) {
    if (err || withSameMail) {
      return callback(err || new Error('the user already exists'));
    }
    crypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return callback(err);
      }
      user.password = hash;
      user.email_verified = false;
      user.connection = 'Username-Password-Authentication';
      user.tenant = 'PhotoCode';
      user.client_id = process.env.REACT_APP_AUTH0_CLIENT_ID;
      users.insert(user, function (err, inserted) {
        // client.close();

      if (err) return callback(err);
        callback(null);
      });
    });
  });
}

// Route handler for creating a new user
app.post('/register', function (req, res) {
  create(req, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      res.send({ message: 'User created' });
      }
    });
  });

// Route handler for creating a new user
app.post('/sendEmail', function (req, res) {
  // get the email, company, and message from the request body
  const email = req.body.email;
  const company = req.body.company;
  const message = req.body.message;

  // create the subject line for the email
  const subject = `Message from ${email} at ${company}`;

  // create a transport using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'photocodedev@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  });
  // send the email
  transporter.sendMail({
    from: email,
    to: 'photocodedev@gmail.com',
    subject: subject,
    text: message,
  }, function(err) {
    // handle any errors that occurred while sending the email
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      res.send({ message: 'Email sent successfully' });
    }
  });

  const returnSubject = `Thank you for contacting PhotoCode!`;
  const returnMessage = `Thank you for the feedback! We will get back to you as soon as possible.`

  transporter.sendMail({
    from: 'photocodedev@gmail.com',
    to: email,
    subject: returnSubject,
    text: returnMessage,
  }, function(err) {
    // handle any errors that occurred while sending the email
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      res.send({ message: 'Email sent successfully' });
    }
  });
});




// Start the app
app.listen(3001, () => console.log('API listening on 3001'));


const express = require('express');
const { expressjwt: expressJwt } = require('express-jwt');
var jwks = require('jwks-rsa');
const cors = require("cors");
var request = require("request");

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

// Set up the Auth0 Management API credentials
const API_URL = 'https://photocode.us.auth0.com';
const API_CLIENT_ID = 'Hk5ax5o8U2rqvwffMvGnHUoeajC7Tk2W';
const API_CLIENT_SECRET = '7KhMjd-z0h_2lA0qs3QavFpClh-y0uUX1bvepeXBpHpaISxPYK21AsCwh_I2AsgH';

// require axios
const axios = require('axios');
const nodemailer = require('nodemailer');

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
      pass: 'eensdylazmfqdmes'
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

app.post('/register', async (req, res) => {
  // Set email and password from request body
  const { email, username, password } = req.body;
  const accessToken = await axios.post('https://photocode.us.auth0.com/oauth/token',{
      "client_id":"R15Hb8sCd5OiULwScyqwCBtTwQKbgYMs",
      "client_secret":"Y2aFtzhPni6-WT65su48BYzfyItcozp_ft1qeuap9KzaF2ED24AbWkEVNh9LWmXK",
      "audience":"https://photocode.us.auth0.com/api/v2/",
      "grant_type":"client_credentials"
    },
    {
      headers: {
        "content-type": "application/json"
      }
    },
    )
    .then(response => {
      // console.log(response.data['access_token']);
      return response.data['access_token'];
    })
    .catch(error => {
      console.log(error);
    });

  // Register a new user using the Management API.
  const userResponse = await axios.post(
    // `https://${domain}/api/v2/users`,
    'https://photocode.us.auth0.com/api/v2/users',
    {
      "email": email,
      "username": username,
      "password": password,
      "connection": "Username-Password-Authentication"
    },
    {
      headers: {
        // authorization: `Bearer ${accessToken}`,
        "Authorization": "Bearer " + accessToken,
      },
    }
  ).then(response => {
    // check the status code of the response
    if (response.status >= 200 && response.status < 300) {
      // handle successful response
      res.send("New Account Created");
    } else {
      // handle error
      console.log("Success with error" + response.data.message);
      const errorMessage = {
        error: response.data.message
      };
      return res.send(errorMessage);
    }
  })
  .catch(error => {
       // handle error
      const errorMessage = {
        error: error.response.data.message
      };
      return res.send(errorMessage);
  });
});

// Start the app
app.listen(3001, () => console.log('API listening on 3001'));


const express = require('express');
const { expressjwt: expressJwt } = require('express-jwt');
var jwks = require('jwks-rsa');
const cors = require("cors");
var request = require("request");

const app = express();
app.use(express.json());
app.use(cors());

// Set up the Auth0 Management API credentials
const API_URL = 'https://photocode.us.auth0.com';
const API_CLIENT_ID = 'Hk5ax5o8U2rqvwffMvGnHUoeajC7Tk2W';
const API_CLIENT_SECRET = '7KhMjd-z0h_2lA0qs3QavFpClh-y0uUX1bvepeXBpHpaISxPYK21AsCwh_I2AsgH';

// Define middleware that validates incoming bearer tokens
// using JWKS from photocode.us.auth0.com
const checkJwt = expressJwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the singing keys provided by the JWKS endpoint.
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://photocode.us.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://photocode.us.auth0.com/api/v2/',
  issuer: `https://photocode.us.auth0.com/`,
  algorithms: ['RS256']
});

function getJwtToken() {
  const options = {
    method: 'GET',
    url: 'https://photocode.us.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: {
      grant_type: 'client_credentials',
      client_id: API_CLIENT_ID,
      client_secret: API_CLIENT_SECRET,
      audience: 'https://photocode.us.auth0.com/api/v2/'
    },
    json: true
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body.access_token);
      }
    });
  });
}

const { ManagementClient } = require('auth0');

const management = new ManagementClient({
  domain: 'photocode.us.auth0.com',
  clientId: 'Hk5ax5o8U2rqvwffMvGnHUoeajC7Tk2W',
  clientSecret: '7KhMjd-z0h_2lA0qs3QavFpClh-y0uUX1bvepeXBpHpaISxPYK21AsCwh_I2AsgH',
});

// // Create a route handler for a POST request to the `/register` endpoint
// app.post('/register', async (req, res) => {
//   // Get the user's email and password from the request body
//   const { email, password } = req.body;

//   await management.createUser({
//     connection: 'Username-Password-Authentication',
//     email: email,
//     password: password
//   }).then(user => {
//     console.log(user)
//     res.send(user);
//   }).catch(err => {
//     console.log(err);
//     res.status(400).json(err)
//   });
//   // // Send back a success message
// });






// app.post('/register', async (req, res) => {
//   // Get an access token for the Management API.
//   const tokenResponse = await axios.post(`https://${API_URL}/oauth/token`, {
//     client_id: API_CLIENT_ID,
//     client_secret: API_CLIENT_SECRET,
//     audience: `https://${API_URL}/api/v2/`,
//   });

//   const accessToken = tokenResponse.data.access_token;
//   console.log(accessToken);
//   // Register a new user using the Management API.
//   const userResponse = await axios.post(
//     `https://${API_URL}/api/v2/users`,
//     {
//       // Replace these values with the user's details.
//       email: email,
//       password: password,
//       connection: 'Username-Password-Authentication',
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );

//   // Return the newly-created user.
//   res.json(userResponse.data);
// });





// Start the app
app.listen(3001, () => console.log('API listening on 3001'));


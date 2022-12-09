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


// const { ManagementClient } = require('auth0');

// const management = new ManagementClient({
//   domain: 'photocode.us.auth0.com',
//   clientId: 'Hk5ax5o8U2rqvwffMvGnHUoeajC7Tk2W',
//   clientSecret: '7KhMjd-z0h_2lA0qs3QavFpClh-y0uUX1bvepeXBpHpaISxPYK21AsCwh_I2AsgH',
// });

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

  // require axios
const axios = require('axios');

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
      res.send("Success");
      console.log("SUCCESS")
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

app.post('/login', async (req, res) => {
  // Set email and password from request body
  const { email, password } = req.body;
  const accessToken = await axios.post('https://photocode.us.auth0.com/oauth/token',{
    "client_id":"R15Hb8sCd5OiULwScyqwCBtTwQKbgYMs",
    "client_secret":"Y2aFtzhPni6-WT65su48BYzfyItcozp_ft1qeuap9KzaF2ED24AbWkEVNh9LWmXK",
    "username": email,
    "password": password,
    "grant_type": "password"
  },
  {
    headers: {
      "content-type": "application/json"
    }
  },
  )
  .then(response => {
    res.send(response.data['access_token']);
  })
  .catch(error => {
    console.log(error.response.data.error_description);
    const errorMessage = {
      error: error.response.data.error_description
    };
    res.send(errorMessage);
  });
});

app.post('/userInfo', async (req, res) => {
  // Set accessToken from body
  console.log("IN USERINFO");
  const { accessToken } = req.body;
  const userInfo = await axios.get('https://photocode.us.auth0.com/userinfo',{
    headers: {
      "Authorization": "Bearer " + accessToken,
    },
  })
  .then(response => {
    console.log(response);
    res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});



// Start the app
app.listen(3001, () => console.log('API listening on 3001'));


// Replace these values with your own Auth0 client ID and secret.
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const clientId = "R15Hb8sCd5OiULwScyqwCBtTwQKbgYMs";
// const clientSecret = process.env.REACT_APP_AUTH0_CLIENT_SECRET;
const clientSecret = "Y2aFtzhPni6-WT65su48BYzfyItcozp_ft1qeuap9KzaF2ED24AbWkEVNh9LWmXK";

import axios from "axios";


async function register(email, password) {


  // Get an access token for the Management API.
  // const tokenResponse = await axios.post(`https://${domain}/oauth/token`, {
  //   grant_type: 'client_credentials',
  //   client_id: clientId,
  //   client_secret: clientSecret,
  //   audience: `https://${domain}/api/v2/`,
  // });
  const tokenResponse = await axios.post('https://photocode.us.auth0.com/oauth/token',{
      "client_id":"txUV1RJjS0SCSYaPkgTA2JagqvA94Hks",
      "client_secret":"892s5r3pHOky7HUWprqXsu36p3ve9FjnnwkKdbHCAEklvA6JaECu1GclmCKUSX4_",
      "audience":"https://photocode.us.auth0.com/api/v2/",
      "grant_type":"client_credentials",
    },
    {
      headers: {
        "content-type": "application/json",
      }
    },
    )
    .then(response => {
      console.log(response);
      });
  const accessToken = tokenResponse.data.access_token;
  console.log(accessToken);


  // Register a new user using the Management API.
  const userResponse = await axios.post(
    // `https://${domain}/api/v2/users`,
    'https://photocode.us.auth0.com/api/v2/users',
    {
      email: email,
      password: password,
      connection: "Username-Password-Authentication",
    },
    {
      headers: {
        // authorization: `Bearer ${accessToken}`,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  


  // const userResponse = await management.users.create(
  //   {
  //     connection: 'Username-Password-Authentication',
  //     email: email,
  //     password: password
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }
  //   ).then(user => {
  //   console.log(user)
  //   res.send(user);
  // }).catch(err => {
  //   console.log(err);
  //   res.status(400).json(err)
  // });
  const user = userResponse.data;

  return user;
}

export { register };

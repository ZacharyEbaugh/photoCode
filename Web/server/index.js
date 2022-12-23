// Setup the server and routes for the application
const express = require('express');
const cors = require("cors");

// Handle email sending
const nodemailer = require('nodemailer');

// Handle password hashing
const crypt = require('bcrypt');

// Set up the express app
const app = express();

// Handle parsing of JSON
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle file receiving from react app
const multer = require('multer');

// Grab environment variables
require('dotenv').config();

// Get mongodb requirements
const MongoClient = require('mongodb').MongoClient;
const { GridFsStorage } = require('multer-gridfs-storage');
const GridFSBucket = require('mongodb').GridFSBucket;

app.use(express.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const https = require('https');
const fs = require('fs');

const credentials = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// // Configure authentication middleware for the application 
// const { auth, requiresAuth } = require('express-openid-connect');
// // const { isObjectIdOrHexString } = require("mongoose");

// // const config = {
// //   authRequired: false,
// //   auth0Logout: true,
// //   baseURL: 'http://localhost:3000',
// //   clientID: 'R15Hb8sCd5OiULwScyqwCBtTwQKbgYMs',
// //   issuerBaseURL: process.env.REACT_APP_AUTH0_DOMAIN,
// //   secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
// // };

// // // The `auth` router attaches /login, /logout
// // // and /callback routes to the baseURL
// // app.use(auth(config));

// // // req.oidc.isAuthenticated is provided from the auth router
// // app.get('/', (req, res) => {
// //   res.send(
// //     req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
// //   )
// // });

// // // The /profile route will show the user profile as JSON
// // app.get('/profile', requiresAuth(), (req, res) => {
// //   res.send(JSON.stringify(req.oidc.user, null, 2));
// // });

// Connect to MongoDB Cluster
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

// Users collection
const users = database.collection("users");

// Projects collection
const projects = database.collection("projects");

// Folders collection
const folders = database.collection("folders");

// Files collection
const files = database.collection("files");

const ObjectId = require('mongodb').ObjectId;



/* 
||----------------------------------------||
||User creation/information               ||
||----------------------------------------|| 
*/

// Function to create a new user in the users collection
function create(req, callback) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const connection = req.body.connection;
  const user = {
    email: email,
    password: password,
    username: username,
    connection: connection,
  };

  users.findOne({ email: user.email, connection: user.connection }, function (err, withSameMail) {
    if (err || withSameMail) {
      return callback(err || new Error('the user already exists'));
    }
    crypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return callback(err);
      }
      user.password = hash;
      user.email_verified = false;
      user.tenant = 'photocode';
      user.client_id = process.env.REACT_APP_AUTH0_CLIENT_ID;
      users.insert(user, function (err, inserted) {

      if (err) return callback(err);
        callback(null);
      });
    });
  });
}

// Route handler for creating a new user
app.post('/register', function (req, res) {
  create(req, function (err) {
    res.send({ message: 'User created' });
    });
  });

// Function to get a user from the users collection
function getUser(req, callback) {
  const email = req.body.email;
  const password = req.body.password;
  const connection = req.body.connection;
  const user = {
    email: email,
    connection: connection
  };
  users.findOne (user, function (err, user) { 
    if (err || !user) {
      return callback(err || new Error('the user does not exist'));
    }
    else {
      return callback(null, user);
    }
  });
}

// Route handler for getting a user
app.post('/getUser', function (req, res) {
  getUser(req, function (err, user) {
    if (err) {
      res.send({ message: 'User not found' });
    }
    else {
      res.send(user);
    }
  });
});


/* 
||------------------End User creation/information------------------||
*/

/* 
||----------------------------------------||
||Project creation/information            ||
||----------------------------------------|| 
*/

// Function to create a new project in the projects collection
function createProject(req, callback) {
  const name = req.body.name;
  const description = req.body.description;
  const user = req.body.user;
  const project = {
    name: name,
    description: description,
    user: user
  };

  projects.insert(project, function (err, inserted) {
    if (err) return callback(err);
    callback(null, inserted);
  });
}

// Route handler for creating a new project
app.post('/createProject', function (req, res) {
  createProject(req, function (err, inserted) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } 
    else {
      res.send({ message: 'Project created', project_id: inserted.insertedIds[0] });
    }
  });
});

// Function to get all projects from the projects collection
function getAllProjects(req, callback) {
  const user_id = req.query.user_id;
  const user = {
    user: user_id
  };
  projects.find(user).toArray(function (err, projects) {
    if (err || !projects) {
      return callback(err || new Error('the project does not exist'));
    }
    else {
      return callback(null, projects);
    }
  });
}

// Route handler for getting all projects
app.get('/getAllProjects', function (req, res) {
  getAllProjects(req, function (err, projects) {
    if (err) {
      res.send({ message: 'Projects not found' });
    }
    else {
      res.send(projects);
    }
  });
});

// // Function to get a project from the projects collection
// function getProject(req, callback) {
//   const project_id = req.query.project_id;
//   const project = {
//     _id: ObjectId(project_id)
//   };
//   projects.findOne(project, function (err, project) {
//     if (err || !project) {
//       return callback(err || new Error('the project does not exist'));
//     }
//     else {
//       return callback(null, project);
//     }
//   });
// }

// // Route handler for getting a project
// app.get('/getProject', function (req, res) {
//   getProject(req, function (err, project) {
//     if (err) {
//       res.send({ message: 'Project not found' });
//     }
//     else {
//       res.send(project);
//     }
//   });
// });

// Function to get all folders that belong to a project from the folders collection
function getFolders(req, callback) {
  const project_id = req.query.project_id;
  const folder = {
    parent_folder: project_id
  };
  folders.find(folder).toArray(function (err, folders) {
    if (err || !folders) {
      return callback(err || new Error('the folder does not exist'));
    }
    else {
      return callback(null, folders);
    }
  });
}

// Route handler for getting all folders that belong to a project
app.get('/getFolders', function (req, res) {
  getFolders(req, function (err, folders) {
    if (err) {
      res.send({ message: 'Folders not found' });
    }
    else {
      res.send(folders);
    }
  });
});

// Function to get all files that belong to a project from the files collection
function getFiles(req, callback) {
  const project_id = req.query.project_id;
  const file = {
    project_id: project_id
  };
  files.find(file).toArray(function (err, files) {
    if (err || !files) {
      return callback(err || new Error('the file does not exist'));
    }
    else {
      return callback(null, files);
    }
  });
}

// Route handler for getting all files that belong to a project
app.get('/getFiles', function (req, res) {
  getFiles(req, function (err, files) {
    if (err) {
      res.send({ message: 'Files not found' });
    }
    else {
      res.send(files);
    }
  });
});


/* 
||------------------End Project creation/information------------------||
*/

/* 
||----------------------------------------||
||Folder/File uploading                   ||
||----------------------------------------|| 
*/

const dbURI = 'mongodb+srv://PhotoCodeAuth0:' +
    mongodbPS +
    '@pccluster.urvaffs.mongodb.net/PhotoCode_db?retryWrites=true&w=majority'

const fileStorage = new GridFsStorage({
  url: dbURI,
  file: (req, file) => {
    // Extract the file information from the originalname string
    const fileInfo = file.originalname.split(':::::');
    const filename = fileInfo[0];
    const parent_id = fileInfo[1];
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: filename,
        bucketName: "folders",
        metadata: {
          parent_folder: parent_id,
        }
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer( {storage: fileStorage} );

// Route handler for uploading a file
app.post('/uploadFile', upload.array('files'), (req, res, next) => {
  res.status(200).send({ message: 'File uploaded' });
});

// Function to check if a folder exists, if it does return the folder document
// If it does not exist, create a folder in the folders collection and return the folder document
async function createFolder(req, callback) {
  const name = req.body.name;
  const parent_id = req.body.parent_id;
  const folderSearch = {
    parent_folder: parent_id,
    name: name,
  };
  try {
    const folderFound = await folders.findOneAndUpdate(
      folderSearch,
      { $setOnInsert: folderSearch },
      { upsert: true, returnOriginal: true }
    );
    return callback(null, folderFound);
  } catch (error) {
    return callback(error);
  }
}

// Route handler for creating a folder
app.post('/createFolder', function (req, res) {
  createFolder(req, function (err, folder) {
    if (err) {
      res.status(500).send({ error: err.message });
    }
    else {
      console.log(folder);
      res.send({ message: 'Folder created', folder: folder});
    }
  });
});


/* 
||------------------End file/folder creation/uploading------------------||
*/

/* 
||----------------------------------------||
||Email handler                           ||
||----------------------------------------|| 
*/

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
// app.listen(3001, () => console.log('API listening on 3001'));
// var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// httpServer.listen(8080);
httpsServer.listen(8443, () => console.log('API listening on 8443'));

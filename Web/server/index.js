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
  key: fs.readFileSync('./../../../credentials/generated-private-key.pem'),
  cert: fs.readFileSync('./../../../credentials/fbc4b2fe0afb3741.pem')
};

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
const files = database.collection("folders.files");

// Chunks collection
const chunks = database.collection("folders.chunks");

const ObjectId = require('mongodb').ObjectId;

/* 
||----------------------------------------||
||User creation/information               ||
||----------------------------------------|| 
*/

// Function to create a new user in the users collection
function create(req, callback) {
  console.log("In Create User Function");
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const picture = (req.body.picture != null) ? req.body.picture : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const connection = req.body.connection;
  const user = {
    email: email,
    password: password,
    picture: picture,
    username: username,
    connection: connection,
  };
  console.log(user);
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
    if (err) 
      return res.send({ error: 'User already exists' })
    res.send({ message: 'User created' });
    });
  });

// Function to get a user from the users collection
function getUser(req, callback) {
  const email = req.body.email;
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

// Get user info using user_id
function getUserInfo(req, callback) {
  const user_id = req.body.user_id;
  const user = {
    _id: ObjectId(user_id)
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

// Route handler for getting user info
app.post('/getUserInfo', function (req, res) {
  getUserInfo(req, function (err, user) {
    if (err) {
      res.send({ message: 'User not found' });
    }
    else {
      res.send(user);
    }
  });
});

// Get user user picture using user_id
function getUserPicture(req, callback) {
  const user_id = req.body.user_id;
  const user = {
    _id: ObjectId(user_id)
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

// Update user picture using user_id and picture url 
function updateUserPicture(req, callback) {
  const user_id = req.body.user_id;
  const picture = req.body.picture;
  const user = {
    _id: ObjectId(user_id)
  };
  const newValues = {
    $set: {
      picture: picture
    }
  };
  users.updateOne(user, newValues, function (err, user) {
    if (err || !user) {
      return callback(err || new Error('the user does not exist'));
    }
    else {
      return callback(null, user);
    }
  });
}

// Route handler for updating a user picture
app.post('/updateUserPicture', function (req, res) {
  updateUserPicture(req, function (err, user) {
    if (err) {
      res.send({ message: 'User not found' });
    }
    else {
      res.send(user);
    }
  });
});

// Function to search for a user in the users collection
function searchUsers(req, callback) {
  const username = req.query.username;
  const user = {
    username: username
  };
  // Query mongodb for all users that mach the username
  users.find(user).toArray(function (err, users) {
    if (err || !users) {
      return callback(err || new Error('the user does not exist'));
    }
    else {
      return callback(null, users);
    }
  });
}

// Route handler for searching for a user
app.get('/searchUsers', function (req, res) {
  searchUsers(req, function (err, users) {
    if (err) {
      res.send({ message: 'User not found' });
    }
    else {
      res.send(users);
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
    user: user,
    collaborators: [user],
    commits: []
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
      const initialCommit = {
        body: {
          project_id: inserted.insertedIds[0],
          user_id: req.body.user,
          picture: req.body.picture,
          title: 'Initial commit',
          message: 'Creation of ' + req.body.name,
        }
      };
      createCommit(initialCommit, function (err, inserted) {
        if (err) {
          console.log(err);
          res.status(500).send({ error: err.message });
        }
        else {
          res.send({ message: 'Project created', project_id: initialCommit.body.project_id });
        }
      });
    }
  });
});

// Function to get all projects from the projects collection
async function getAllProjects(req, callback) {
  const user_id = req.query.user_id;
  // Check for all projects that have a user matching the user_id or if the user_id is found in the collaborators array
  const user = { $or: [{ user: user_id }, { collaborators: user_id }] };

  const allProjects = await projects.find(user).toArray();

  if (!allProjects) {
    return callback(err || new Error('the project does not exist'));
  }
  else {
    return callback(null, allProjects);
  }
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

// Function to get a project from the projects collection
function getProject(req, callback) {
  const project_id = req.query.project_id;
  const project = {
    _id: ObjectId(project_id)
  };
  projects.findOne(project, function (err, project) {
    if (err || !project) {
      return callback(err || new Error('the project does not exist'));
    }
    else {
      return callback(null, project);
    }
  });
}

// Route handler for getting a project
app.get('/getProject', function (req, res) {
  getProject(req, function (err, project) {
    if (err) {
      res.send({ message: 'Project not found' });
    }
    else {
      res.send(project);
    }
  });
});

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
    "metadata.parent_folder": project_id
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
||Project updates/collaboration           ||
||----------------------------------------|| 
*/

// Function to delete a user account from the users collection and all related projects, folders and files
// function deleteAccount(req, callback) {
//   const user_id = req.body.user_id;
//   const user = {
//     _id: ObjectId(user_id)
//   };
//   users.deleteOne(user, function (err, deleted) {
//     if (err) return callback(err);
//     else {
//       // Delete all projects that belong to the user
//       projects.deleteMany({ user: user_id }, function (err, deleted) {
//         if (err) return callback(err);
//         else {
//           // Delete all folders that belong to the user
//           folders.deleteMany({ user: user_id }, function (err, deleted) {
            

/* 
||------------------End Project creation/information------------------||
*/

/* 
||----------------------------------------||
||Project updates/collaboration           ||
||----------------------------------------|| 
*/

// Function to update a project in the projects collection
function updateProject(req, callback) {
  const project_id = req.body.project_id;
  const name = req.body.name;
  const description = req.body.description;
  const project = {
    _id: ObjectId(project_id)
  };
  const newProject = {
    $set: {
      name: name,
      description: description
    }
  };
  projects.updateOne(project, newProject, function (err, updated) {
    if (err) return callback(err);
    else {
      folders.updateOne({ parent_folder: project_id }, { $set: { name: name } }, function (err, updated) {
        if (err) return callback(err);
        callback(null, updated);
      });
    }
  });

}

// Route handler for updating a project
app.post('/updateProject', function (req, res) {
  updateProject(req, function (err, updated) {
    if (err) {
      res.status(500).send({ error: err.message });
    }
    else {
      res.send({ message: 'Project updated' });
    }
  });
});

// Function to add a collaborator to a project in the projects collection
function addCollaborator(req, callback) {
  const project_id = req.query.project_id;
  const collaborator = req.query.user_id;
  const project = {
    _id: ObjectId(project_id)
  };
  const newProject = {
    $push: {
      collaborators: collaborator
    }
  };
  // Check if the project already has the collaborator
  projects.findOne(project, function (err, project) {
    if (err || !project) {
      return callback(err || new Error('the project does not exist'));
    }
    else {
      if (project.collaborators.includes(collaborator)) {
        return callback(null, project);
      }
      else {
        projects.updateOne(project, newProject, function (err, updated) {
          if (err) return callback(err);
          callback(null, updated);
        });
      }
    }
  });
}

// Route handler for adding a collaborator to a project from an invite
app.get('/acceptInvite', function (req, res) {
  addCollaborator(req, function (err, updated) {
    if (err) {
      res.status(500).send({ error: err.message });
    }
    else {
      res.redirect('http://photocode.app');
    }
  });
});

// Function to find all collaborators of a project in the projects collection
function getCollaborators(req, callback) {
  const project_id = req.query.project_id;
  console.log(project_id);
  const project = {
    _id: ObjectId(project_id)
  };
  projects.findOne(project, function (err, project) {
    if (err || !project) {
      return callback(err || new Error('the project does not exist'));
    }
    else {
      return callback(null, project.collaborators);
    }
  });
}

// Route handler for finding all collaborators of a project
app.get('/getCollaborators', function (req, res) {
  getCollaborators(req, function (err, collaborators) {
    if (err) {
      res.status(500).send({ error: err.message });
    }
    else {
      // Call function to get collaborator information from the users collection
      console.log(collaborators);
      if (collaborators.length == 0) {
        res.send([]);
      }

      getCollaboratorInfo(collaborators, function (err, collaboratorsInfo) {
        if (err) {
          res.status(500).send({ error: err.message });
        }
        else {
          res.send(collaboratorsInfo);
        }
      });
    }
  });
});

async function getCollaboratorInfo(collaborators, callback) {
  console.log(collaborators);
  var collaboratorsInfo = [];
  for (let i = 0; i < collaborators.length; i++) {
    const collaborator = {
      _id: ObjectId(collaborators[i])
    };
    try {
      const user = await users.findOne(collaborator);
      if (!user) {
        console.log("the user does not exist");
      } else {
        console.log("found");
        collaboratorsInfo.push(user);
      }
    } catch (err) {
      console.log(err);
      return callback(err);
    }
  }
  return callback(null, collaboratorsInfo);
}

// Function to remove a collaborator from a project in the projects collection
function removeCollaborator(req, callback) {
  const project_id = req.query.project_id;
  const collaborator = req.query.user_id;
  const project = {
    _id: ObjectId(project_id)
  };
  const newProject = {
    $pull: {
      collaborators: collaborator
    }
  };
  projects.updateOne(project, newProject, function (err, updated) {
    if (err) return callback(err);
    callback(null, updated);
  });
}

// Route handler for removing a collaborator from a project
app.get('/removeCollaborator', function (req, res) {
  removeCollaborator(req, function (err, updated) {
    if (err) {
      res.status(500).send({ error: err.message });
    }
    else {
      res.send({ message: 'Collaborator removed' });
    }
  });
});



/* 
||------------------End Project updates------------------||
*/



/* 
||----------------------------------------||
||Project deletion                        ||
||----------------------------------------|| 
*/

// Delete project object from projects collection
async function deleteProject(req, callback) {
  const response = await projects.deleteOne({ _id: ObjectId(req.body.project_id) });
  console.log(response);
  return callback(null, "Test");
}

// Router for deleteFile function
app.post('/deleteProject', function (req, res) {
  deleteProject(req, function (err, response) {
    if (err) {
      res.status(500).send({ error: err.message });
    }
    else {
      res.send(response);
    }
  });
});

/* 
||------------------End Project deletion------------------||
*/


/* 
||----------------------------------------||
||Folder/File uploading                   ||
||----------------------------------------|| 
*/

const dbURI = 'mongodb+srv://PhotoCodeAuth0:' +
    mongodbPS +
    '@pccluster.urvaffs.mongodb.net/PhotoCode_db?retryWrites=true&w=majority'

const bucket = new GridFSBucket(database, { bucketName: 'folders' });

const fileStorage = new GridFsStorage({
  url: dbURI,
  file: (req, file) => {
    // Extract the file information from the originalname string
    const fileInfo = file.originalname.split(':::::');
    const filename = fileInfo[0];
    const parent_id = fileInfo[1];
    const project_id = fileInfo[2];
    console.log(fileInfo);
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: filename,
        bucketName: "folders",
        metadata: {
          parent_folder: parent_id,
          project_id: project_id,
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
  const project_id = req.body.project_id;
  const folderSearch = {
    parent_folder: parent_id,
    name: name,
    project_id: project_id,
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

// Function to get a single file from the files collection by id and return the file
async function getFile(req, callback) {
  const file_id = req.query.file_id;
  const chunks = [];

  const file = await bucket.find({ _id: ObjectId(file_id) }).next();
  const encoding = file.contentType;

  bucket.openDownloadStream(ObjectId(file_id)).on('data', (chunk) => {
    chunks.push(chunk);
  }).on('error', (error) => {
    return callback(error);
  }).on('end', async() => {
    const fileContents = Buffer.concat(chunks);
    return callback(null, fileContents, encoding);
  });
}

// Route handler for getting a single file
app.get('/getFile', function (req, res) {
  getFile(req, function (err, fileContents, encoding) {
    if (err) {
      res.status(500).send({ error: err.message });
    }
    else {
      res.send({ fileContents: fileContents, encoding: encoding });
    }
  });
});


/* 
||------------------End file/folder creation/uploading------------------||
*/

/* 
||----------------------------------------||
||File/Folder Deletion                    ||
||----------------------------------------|| 
*/

// Function that deletes file from MongoDB based on file_id
async function deleteFile(req, callback) {
  const response = await files.deleteOne({ _id: ObjectId(req.body.file_id)})
  .then(await chunks.deleteOne({ files_id: ObjectId(req.body.file_id)}));
  return callback(null, response);
}

// Router for deleteFile function
app.post('/deleteFile', function (req, res) {
  deleteFile(req, function (err, response) {
    if (err) {
      res.status(500).send({ error: err.message });
    }
    else {
      res.send({ message: response });
    }
  });
});

// Function that delets folders from MongoDB based on folder_id
async function deleteFolder(req, callback) {
  // Start by finding and deleting all folders which this folder is a parent of
  // For each folder, push the folder_id onto a stack
  // After all folders are added to stack, and deleted, we can start deleting files
  // For deleting files, call deleteAll based on the current id popped from the stack
  // Continue until the stack is empty
  const subFolders = [];
  var findSubFolders = folders.find({ parent_folder: req.body.folder_id});

  findSubFolders = await findSubFolders.toArray();

  findSubFolders.forEach(folder => {
    subFolders.push(folder);
  });

  // Delete top level files and folders
  await deleteFilesFolder(req.body.folder_id);


  while (subFolders.length != 0)
  {
    const curFolder = subFolders.pop();

    console.log(curFolder._id.valueOf());

    findSubFolders = folders.find({ parent_folder: curFolder._id.valueOf()});

    findSubFolders = await findSubFolders.toArray();

    if (findSubFolders.length > 0)
    {
      findSubFolders.forEach(folder => {
        subFolders.push(folder);
      })
    }

    await deleteFilesFolder(curFolder._id.valueOf());
  }

  return callback(null, "Success");
}

async function deleteFilesFolder(folder_id) {
   // Find all files that have to be deleted for this folder
   var filesToDelete = files.find({"metadata.parent_folder": folder_id }).toArray();
   (await filesToDelete).forEach(file => {
     // Delete files chunks
     chunks.deleteMany({ files_id: file._id });
     files.deleteOne({ _id: file._id });
   })
   const deleteFolder = folders.deleteOne({ "_id": ObjectId(folder_id) }, function (err, deleteSub) {
     if (err)
     {
       return callback(err, null);
     }
   });
}

// Router for deleteFile function
app.post('/deleteFolder', function (req, res) {
  deleteFolder(req, function (err, response) {
    if (err) {
      res.status(500).send({ error: err.message });
    }
    else {
      res.send(response);
    }
  });
});

/* 
||------------------End file/folder deletion------------------||
*/

/* 
||----------------------------------------||
||Folder/File editing                     ||
||----------------------------------------|| 
*/

// Function that edits a files contents based on file_id 
async function editFile(req, callback) {
  const file_id = req.body.file_id;
  const file_contents = req.body.file_contents;
  console.log(file_contents);

  bucket.find({ _id: ObjectId(file_id) }).next(
    function (err, file) {
      if (err) {
        return callback(err, null);
      }
      else {
        console.log(file);
        deleteFile({ body: { file_id: file_id } }, function (err, response) {
          if (err) {
            return callback(err, null);
          }
          else {
            const uploadStream = bucket.openUploadStreamWithId(file._id, file.filename, {
              // contentType: encoding,
              contentType: file.contentType,
              metadata: {
                parent_folder: file.metadata.parent_folder,
                project_id: file.metadata.project_id
              }
            });
          
            // uploadStream.write(fileContents);
            // uploadStream.end();
    
            // Update the file
            uploadStream.end(Buffer.from(file_contents, 'utf8'), (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log('File updated');
            });
          }
        });
          
        return callback(null, "Success");
      }
    }
  );
}

// Router for editFile function
app.post('/updateFile', function (req, res) {
  editFile(req, function (err, response) {
    if (err) {
      res.status(500).send({ error: err.message });
    }
    else {
      res.send(response);
    }
  });
});


/* 
||------------------End file/folder editing------------------||
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

// Send an email to the user asking if they would like to accept the invite, if they do, add them to an attribute of a project object in the database
app.post('/sendProjectInvite', async function (req, res) {
  // get the email, company, and message from the request body
  const email = req.body.email;
  const project_id = req.body.project_id;
  const project_name = req.body.project_name;
  const user_id = req.body.user_id;

  const project = {
    _id: ObjectId(project_id)
  };
  // Check if the project already has the collaborator
  const checkProject = await projects.findOne(project);
  if (!checkProject || checkProject.collaborators.includes(user_id)) {
    res.send({ message: 'User already in project or the project does not exist' });
  } else {
    // create the subject line for the email
    const subject = `You have been invited to join ${project_name} on PhotoCode!`;

    // create a transport using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'photocodedev@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    });
    // Create the message
    const message = `You have been invited to join ${project_name} on PhotoCode! Click the link below to accept the invite and join the project! \n\n https://photocode.app:8443/acceptInvite?project_id=${project_id}&user_id=${user_id}`;

    // send the email
    transporter.sendMail({
      from: 'photocodedev@gmail.com',
      to: email,
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
  }
});

// Send an email to the user after they request to change their password with a link to reset their password if they click the link
app.post('/sendPasswordReset', async function (req, res) {
  // get the email, company, and message from the request body
  const email = req.body.email;
  
  // create the subject line for the email
  const subject = `Password reset request for ${email}`;
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'photocodedev@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  });
  // Create the message with a link to the reset password page
  const message = `You have requested to reset your password for ${email}. Click the link below to reset your password.`;
  const link = `https://photocode.app/resetPassword?email=${email}`;

  // send the email
  transporter.sendMail({
    from: 'photocodedev@gmail.com',
    to: email,
    subject: subject,
    // text: message,
    html: `
    <html>
      <head>
        <style>
          /* Add your custom styles here */
          .container {
            width: 50%;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-image: linear-gradient(#0066FF, #FFFFFF);
            padding: 10px;
            border-radius: 10px;
            border: 1px solid black;

          }

          .buttonWrapper {
            cursor: pointer;
          }

          .button {
            width: 80%;
            height: 50px;
            border-radius: 10px;
            border: 1.5px solid black;
            background-color: #0065FF;
            color: white;
            font-size: 30px;
            font-weight: 500;
            font-family: 'Mono-Regular';
            margin-top: 1rem;
            cursor: pointer;
          }
          h1 {
            font-family: 'Arial', sans-serif;
            color: white;
            font-size: 40px;
          }
          h2 {
            font-family: 'Arial', sans-serif;
            color: black;
            font-size: 20px;
          }
        </style>
      </head>
      <body class='container'>
        <h1>PhotoCode Password Change</h1>
        <h2>${message}</h2>
        <a class='buttonWrapper' href="${link}"><button class="button">Reset Password</button></a>
        <h2>If you're having trouble clicking the button (e.g. Safari users), copy and paste the following link in your browser:</h2>
        <p>${link}</p>
      </body>
    </html>
  `
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

/* 
||----------------------------------------||
||User updates                            ||
||----------------------------------------|| 
*/

const bcrypt = require('bcrypt');
function changePassword(email, newPassword, callback) {
  bcrypt.hash(newPassword, 10, function (err, hash) {
    if (err) {
      return callback(err);
    }
    users.updateOne({ email: email, connection: "Username-Password-Authentication" }, { $set: { password: hash } }, function (err, result) {
      if (err) return callback(err);
      callback(null, result);
    });
  });
}

app.post('/resetPassword', async function (req, res) {
  // get the email, company, and message from the request body
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  if (password !== passwordConfirm) {
    res.send({ message: 'Passwords do not match' });
  } else {
    changePassword(email, password, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
      } else {
        console.log(result);
        res.status(200).send({ message: 'Password changed successfully' });
      }
    });
  }
});

// Function to change users username
function changeUsername(req, callback) {
  const user_id = ObjectId(req.body.user_id);
  const newUsername = req.body.newUsername;
  users.updateOne({ _id: user_id }, { $set: { username: newUsername } }, function (err, result) {
    if (err) return callback(err);
    callback(null, result);
  });
}

// Route handler to change users username
app.post('/changeUsername', async function (req, res) {
  changeUsername(req, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      console.log(result);
      res.status(200).send({ message: 'Username changed successfully' });
    }
  });
});

// Function to change users email
function changeEmail(req, callback) {
  const user_id = ObjectId(req.body.user_id);
  const newEmail = req.body.newEmail;
  users.updateOne({ _id: user_id }, { $set: { email: newEmail } }, function (err, result) {
    if (err) return callback(err);
    callback(null, result);
  });
}

// Route handler to change users email
app.post('/changeEmail', async function (req, res) {
  changeEmail(req, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      console.log(result);
      res.status(200).send({ message: 'Email changed successfully' });
    }
  });
});

// Function to delete account
async function deleteAccount(req, callback) {
  const user_id = req.body.user_id;

  try {
    const user = { $or: [{ user: user_id }, { collaborators: user_id }] }

    const allProjects = await projects.find(user).toArray();

    for (let i = 0; i < allProjects.length; i++) {
      // Removes user from all collab projects
      if (allProjects[i].collaborators[0] != user_id) {
        var project_id = allProjects[i]._id;
        var collaborator = user_id

        var project = {
          _id: ObjectId(project_id)
        };

        var newProject = {
          $pull: {
            collaborators: collaborator
          }
        };

        projects.updateOne(project, newProject, function (err, updated) {
          if (err) return console.log(err);
          console.log(updated);
        });
      } else {
        // Get and delete file contents
        files_array = await files.find({ 'metadata.project_id': allProjects[i]._id.toString() }).toArray();
        for (let j = 0; j < files_array.length; j++)
          await chunks.deleteOne({ files_id: files_array[j]._id });

        // Get file references and folders
        await files.deleteMany({ 'metadata.project_id': allProjects[i]._id.toString() });
        await folders.deleteMany({ project_id: allProjects[i]._id.toString()});   

        // Delete project
        await projects.deleteOne({ _id: ObjectId(req.body.project_id) });
      }
    }

    // Delete user
    users.deleteOne({ _id: ObjectId(user_id) }, function(err, deleted){
      if (err) return callback(err)
      return callback(null, deleted)
    });
  } catch (err) {
    return callback(err);
  }
}

// Route handler to delete account
app.post('/deleteAccount', async function (req, res) {
  deleteAccount(req, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      console.log(result);
      res.status(200).send({ message: 'Account Deleted'})
    }
  });
});


/* 
||------------------User updates------------------||
*/

/* 
||----------------------------------------||
|| Commits                                ||
||----------------------------------------|| 
*/

// Get all commits for a project
app.post('/getAllCommits', async function (req, res) {
  const project_id = req.body.project_id;
  const project = {
    _id: ObjectId(project_id)
  };
  const commits = await projects.findOne(project);
  if (!commits) {
    res.send({ message: 'Project does not exist' });
  } else {
    res.send(commits.commits);
  }
});

// Create a commit for a project
async function createCommit(req, callback) {
// app.post('/createCommit', async function (req, res) {
  const project_id = req.body.project_id;
  const user_id = req.body.user_id;
  const picture = req.body.picture;
  const title = req.body.title;
  const message = req.body.message;
  const project = {
    _id: ObjectId(project_id)
  };
  const checkProject = await projects.findOne(project);
  if (!checkProject) {
    res.send({ message: 'Project does not exist' });
  } else {
    const commit_id = ObjectId();
    const commitObj = {
      _id: commit_id,
      user_id: user_id,
      picture: picture,
      title: title,
      message: message,
      date: new Date()
    };
    const update = {
      $push: {
        commits: commitObj
      }
    };
    const result = await projects.updateOne(project, update);
    if (result.modifiedCount === 1) {
      console.log(result);
      // res.send({ message: 'Commit created successfully', commit_id: commit_id });
      callback(null, { message: 'Commit created successfully', commit_id: commit_id });
    } else {
      // res.send({ message: 'Commit creation failed' });
      callback({ message: "Commit Creation Failed" }, null);
    }
  }
};

// Route handler for createCommit
app.post('/createCommit', async function (req, res) {
  createCommit(req, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      console.log(result);
      res.status(200).send({ message: 'Commit created successfully' });
    }
  });
});

/* 
||------------------Commits------------------||
*/

// Start the app
// app.listen(3001, () => console.log('API listening on 3001'));
// var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// httpServer.listen(8080);
httpsServer.listen(8443, () => console.log('API listening on 8443'));

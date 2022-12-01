const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://PhotoCode_Team:ROs5aNZ1Yd54yUTt@pccluster.urvaffs.mongodb.net/PhotoCode_db?retryWrites=true&w=majority"
  );

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// express function to check if username and password are in database
app.post("/valUser", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  // Find name and password in database else return error
  UserModel
    .findOne
    ({ name: name })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json(user);
        } else {
          res.json({ message: "Wrong username/password combination!" });
        }
      } else {
        res.json({ message: "User doesn't exist" });
      }
    });
});

// Expresss function to send email to user
app.post("/sendEmail", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const company = req.body.company;
  const message = req.body.message;
  // Send gmail to email address given
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "photocodedev@gmail.com",
      pass: "rpqthhqaiveovgxn",
    },
  });
  const mailOptions = {
    from: "photocodedev@gmail.com",
    to: email,
    subject: "Password Reset",
    text: "Hello " + name + " from " + company + ",\n\n" + "Your message was: " + message + "\n\n" + "Regards,\n" + "PhotoCode Team",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
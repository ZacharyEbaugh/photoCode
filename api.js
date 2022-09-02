require('express');
require('mongodb');

// const Document = require("./models/Document.js");
// const User = require("./models/User.js");

exports.setApp = function ( app, client )
{
}
// {   //
//     app.post('/api/login', async (req, res, next) => 
//     {
//         // incoming: Login, Password.
//         // outgoing: UserId, First_Name, Last_Name, First_Time_Login, Email_Verify, Error.

//         let id = -1;
//         let fn = '';
//         let ln = '';
//         let ev = -1;
//         let ftl = -1;
//         var ret;

//         const {login, password} = req.body;
//         const results = await User.find({$or:[{Username: login}, {Email:login}], Password: password});

//         if( results.length > 0 )
//         {
//             id = results[0]._id.toString();
//             fn = results[0].First_Name;
//             ln = results[0].Last_Name;
//             ftl = results[0].First_Time_Login;
//             ev = results[0].Email_Verify;

//             try
//             {
//                 const token = require("./createJWT.js");
//                 tok = token.createToken(fn, ln, id);
//                 ret = {ev:ev, ftl:ftl, token:tok};
//             }
//             catch(e)
//             {
//                 ret = {error:e.message};
//             }
//         }
//         else
//         {
//             ret = {error:"Login/Password incorrect"};
//         }

//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/ftlogin', async (req, res, next) => 
//     {
//         // incoming: UserID, Activity Level, Height, Age, Goal Weight, Starting Weight, Daily Calorie Goal.
//         // outgoing: UserId, First_Name, Last_Name, First_Time_Login, Email_Verify, Error.

//         let token = require('./createJWT.js');

//         let error = '';
//         let ObjectID = '';

//         const {userId, activityLevel, height, age, goalWeight, startWeight, calorieGoal, jwtToken} = req.body;
       
//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         const results = await User.findByIdAndUpdate(userId, {First_Time_Login:1});
    
//         const newHealth = Health({UserID:userId, Weight:[{Weight:startWeight}], Curr_Weight:startWeight, Activity_Level:activityLevel, Height:height, Age:age, Goal_Weight:goalWeight, Calorie_Goal:calorieGoal});
//         const newDiet = Diet({UserID:userId, Total_Calories:0});
        
//         try
//         {
//             newHealth.save();
//             newDiet.save();
//         }
//         catch(e)
//         {
//             error = e.toString();
//         }
       


//         const results2 = await Diet.find({UserID:userId})
        


//         if( results2.length > 0 )
//         {
//             console.log("hi");
//             ObjectID = results2[0]._id.toString();
//             console.log(ObjectID);
//         }

//         const newDiary = Diary({UserID:userId, Diet:{$push: Date, DietID:ObjectID}});
        
//         try
//         {
//             newDiary.save();
//         }
//         catch(e)
//         {
//             error = e.toString();
//         }

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//             console.log(refreshedToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
              
//         var ret = {error: error, jwtToken: refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/forgotpassword', async (req, res, next) =>
//     {
//         // incoming: Email.
//         // outgoing: Error.
            
//         let error = '';

//         const {email} = req.body;

//         try
//         {
//             const token = require("./createJWT.js");
//             var tok = token.createToken(email, "123", "123");
//         }
//         catch(e)
//         {
//             ret = {error:e.message};
//         }

//         try{
//             let userEmail = {Email:email};
//             const result = await User.findOneAndUpdate(userEmail, {FP_Token: tok.accessToken});
//             // using Twilio SendGrid's v3 Node.js Library
//             // https://github.com/sendgrid/sendgrid-nodejs
//             //javascript
//             const sgMail = require('@sendgrid/mail')
//             sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//             const msg = {
//                 to: email,
//                 from: 'cop43318@gmail.com',
//                 template_id: 'd-21b5e99f9c6f45d9b2cfc0f918162475',
//                 dynamic_template_data: {
//                     ahjst: tok.accessToken
//                 }
//             }
//             sgMail
//                 .send(msg)
//                 .then(() => {
//                     console.log('Email sent')
//                 })
//                 .catch((error) => {
//                     console.error(error)
//                 })
//         }
//         catch(e)
//         {
//             error = e.toString();
//         }

//         let ret = {error:error};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/resetpassword', async(req, res, next) =>
//     {
//         // incoming: JWTToken, Password.
//         // outgoing: Error.

//         let error = '';

//         const {ahjst, password} = req.body;

//         try
//         {
//             let resetPassword = {FP_Token:ahjst};
//             const result = await User.findOneAndUpdate(resetPassword, {Password:password});
//             const result2 = await User.findOneAndUpdate(resetPassword, {FP_Token:"0"});
//         }
//         catch(e)
//         {
//             error = e.toString();
//         }

//         let ret = {error:error};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/verifyemail', async(req, res, next) =>
//     {
//         // incoming: JWTToken.
//         // outgoing: Error.

//         let error = '';

//         const {ahjst} = req.body;

//         try{
//             let userEmail = {Email_Token:ahjst};
//             const result = await User.findOneAndUpdate(userEmail, {Email_Verify:1});
//             const result2 = await User.findOneAndUpdate(userEmail, {Email_Token:"0"});
//         }
//         catch(e)
//         {
//             error = e.toString();
//         }

//         let ret = {error:error};
//         res.status(200).json(ret);
//     });


//     //
//     app.post('/api/register', async (req, res, next) =>
//     {
//         // incoming: Username, Password, First_Name, Last_Name, Email.
//         // outgoing: Error.
            
//         let error = '';

//         const {username, password, firstName, lastName, email, firstTimeLogin, emailVerify, forgotPasswordToken} = req.body;

//         try
//         {
//             const token = require("./createJWT.js");
//             var tok = token.createToken(username, firstName, lastName);
//         }
//         catch(e)
//         {
//             ret = {error:e.message};
//         }

//         const newUser = User({Username:username, Password:password, First_Name:firstName, Last_Name:lastName, Email:email, First_Time_Login:firstTimeLogin, Email_Verify:emailVerify, Email_Token:tok.accessToken, FP_Token:forgotPasswordToken});
        
//         try
//         {
//             newUser.save();
        
//             // using Twilio SendGrid's v3 Node.js Library
//             // https://github.com/sendgrid/sendgrid-nodejs
//             //javascript
//             const sgMail = require('@sendgrid/mail')
//             sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//             const msg = {
//                 to: email,
//                 from: 'cop43318@gmail.com',
//                 template_id: 'd-32c150b4de8043edba973cd21ace99f5',
//                 dynamic_template_data: {
//                     firstName: firstName,
//                     ahjst: tok.accessToken
//                 }
//             }
//             sgMail
//                 .send(msg)
//                 .then(() => {
//                     console.log('Email sent')
//                 })
//                 .catch((error) => {
//                     console.error(error)
//                 })
//         }
//         catch(e)
//         {
//             error = e.toString();
//         }

//         let ret = {error:error};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/edituser', async(req, res, next) =>
//     {
//         // incoming: Username, Password, First Name, Last Name, Email.
//         // outgoing: Error.
       
//         let token = require('./createJWT.js');

//         let error = '';

//         const {userId, username, password, firstName, lastName, email, jwtToken} = req.body;

//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         let userInformation = {Username:username, Password: password, First_Name:firstName, Last_Name:lastName, Email:email};
//         const results = await User.findByIdAndUpdate(userId, userInformation);

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//             console.log(refreshedToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         var ret = {error: error, jwtToken: refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/getuser', async(req, res, next) =>
//     {
//         // incoming: UserID.
//         // outgoing: Username, Password, First Name, Last Name, Email.
        
//         let token = require('./createJWT.js');

//         let username = '';
//         let password = '';
//         let firstName = '';
//         let lastName = '';
//         let email = '';
//         let error = '';

//         const {userId, jwtToken} = req.body;
        
//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
    
//         const results = await User.find({_id:userId});

//         if( results.length > 0 )
//         {
//             username = results[0].Username;
//             password = results[0].Password;
//             firstName = results[0].First_Name;
//             lastName = results[0].Last_Name;
//             email = results[0].Email;
//         }
        
//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//             console.log(refreshedToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         var ret = {error:error, username:username, password:password, firstName:firstName, lastName:lastName, email:email, jwtToken:refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/getHealth', async (req, res, next) =>
//     {
//         // incoming: UserID.
//         // outgoing: Height, Goal Weight, Calorie Goal, Age.

//         let token = require('./createJWT.js');

//         let error = '';
//         let height = 0;
//         let goalWeight = 0;
//         let goalCalories = 0;
//         let age = 0;
//         var ret;

//         const {userId, jwtToken} = req.body;

//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         const results = await Health.find({UserID:userId});

//         if( results.length > 0 )
//         {
//             height = results[0].Height;
//             goalWeight = results[0].Goal_Weight;
//             goalCalories = results[0].Calorie_Goal;
//             age = results[0].Age;
//         }
//         else
//         {
//             ret = {error:"Cannot Retrieve Health Info"};
//         }

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         ret = {error: error, height:height, goalWeight:goalWeight, goalCalories:goalCalories, age:age, jwtToken: refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/editHealth', async(req, res, next) =>
//     {
//         // incoming: Username, Password, First Name, Last Name, Email.
//         // outgoing: Error.
//         let token = require('./createJWT.js');

//         let error = '';

//         const {userId, height, goalWeight, goalCalories, age, jwtToken} = req.body;

//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         let healthInformation = {Height:height, Goal_Weight:goalWeight, Calorie_Goal:goalCalories, Age:age};
//         const results = await Health.findOneAndUpdate({UserID:userId}, healthInformation);

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//             console.log(refreshedToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         var ret = {error: error, jwtToken: refreshedToken};
//         res.status(200).json(ret);
//     });


//     //
//     app.post('/api/addWeight', async (req, res, next) =>
//     {
//         // incoming: UserID, Weight, Date.
//         // outgoing: Error.

//         let token = require('./createJWT.js');

//         let error = '';
        
//         const {date, weight, userId, jwtToken} = req.body;
        
//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         const results = await Health.findOneAndUpdate({UserID:userId}, {$push: {Weight: {Weight:weight, Date:date}}});
//         const results2 = await Health.findOneAndUpdate({UserID:userId}, {Curr_Weight:weight});

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
                
//         var ret = {error: error, jwtToken: refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/getTenWeight', async (req, res, next) =>
//     {
//         // incoming: UserID.
//         // outgoing: Error.

//         let token = require('./createJWT.js');

//         let error = '';
//         let weights;
        
//         const {userId, jwtToken} = req.body;

//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         const results = await Health.find({UserID:userId});

//         if( results.length > 0 )
//         {
//             weights = results[0].Weight.slice(-10);
//         }
        
//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
              
//         var ret = {weights:weights, error: error, jwtToken: refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/getAllWeight', async (req, res, next) =>
//     {
//         // incoming: UserID.
//         // outgoing: Error.

//         let token = require('./createJWT.js');

//         let error = '';
//         let weights;
        
//         const {userId, jwtToken} = req.body;
        
//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         const results = await Health.find({UserID:userId});

//         if( results.length > 0 )
//         {
//             weights = results[0].Weight;
//         }
        
//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
              
//         var ret = {weights:weights, error: error, jwtToken: refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/getCurrWeight', async (req, res, next) =>
//     {
//         // incoming: UserID.
//         // outgoing: Current Weight, Goal Weight, Error.

//         let token = require('./createJWT.js');

//         let error = '';
//         let currentW = 0;
//         let goalW = 0;
        
//         const {userId, jwtToken} = req.body;
        
//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         const results = await Health.find({UserID:userId});

//         if( results.length > 0 )
//         {
//             currentW = results[0].Curr_Weight;
//             goalW = results[0].Goal_Weight;
//         }

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
                
//         var ret = {currentW:currentW, goalW:goalW, error: error, jwtToken: refreshedToken};
//         res.status(200).json(ret);
//     });


//     app.post('/api/deleteFood', async (req, res, next) =>
//     {
//         // incoming: Name, Protein, Carbohydrates, Sugar, Fat, Sodium, Calories, jwtToken.
//         // outgoing: Error.

//         let token = require('./createJWT.js');

//         let error = '';

//         const {foodId, jwtToken} = req.body;

//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         const results = await Food.findByIdAndDelete(foodId);

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         var ret = {error: error, jwtToken: refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/addFood', async (req, res, next) =>
//     {
//         // incoming: Name, Protein, Carbohydrates, Sugar, Fat, Sodium, Calories, jwtToken.
//         // outgoing: Error.

//         let token = require('./createJWT.js');

//         let error = '';

//         const {userId, foodName, foodProtein, foodCarbs, foodSugar, foodFat, foodSodium, foodCalorie, foodServeSize, foodType, ssType, foodPhase, jwtToken} = req.body;

//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         const newFood = Food({UserID:userId, Name:foodName, Protein:foodProtein, Carbohydrates:foodCarbs, Sugar:foodSugar, Fat:foodFat, Sodium:foodSodium, Calories:foodCalorie, Food_Type:foodType, Serving_Size:foodServeSize, SS_Type:ssType, Phase:foodPhase});

//         try
//         {
//             newFood.save();
//         }
//         catch(e)
//         {
//             error = e.toString();
//         }

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         var ret = {error: error, jwtToken: refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/getFood', async (req, res, next) =>
//     {
//         // incoming: Name, FoodID.
//         // outgoing: Food Name, Calories.

//         let token = require('./createJWT.js');

//         let error = '';
//         let foodId = '';
//         var ret;
        
//         const {userId, foodName, jwtToken} = req.body;

//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         const results = await Food.find({UserID:userId, Name:foodName});

//         if( results.length > 0 )
//         {
//             foodId = results[0]._id.toString();
//         }
//         else
//         {
//             ret = {error:"Food Doesn't Exist"};
//         }

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         ret = {error:error, foodId:foodId, jwtToken:refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/getAllFood', async (req, res, next) =>
//     {
//         // incoming: UserID.
//         // outgoing: Foods.

//         let token = require('./createJWT.js');

//         let error = '';
//         let foods;
//         var ret;

//         const {userId, jwtToken} = req.body;

//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         const results = await Food.find({UserID:userId});

//         if( results.length > 0 )
//         {
//             foods = results;
//         }
//         else
//         {
//             ret = {error:"Food Doesn't Exist"};
//         }

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         ret = {error:error, foods:foods, jwtToken:refreshedToken};
//         res.status(200).json(ret);
//     });

    
//     //
//     app.post('/api/getCalories', async (req, res, next) =>
//     {
//         // incoming: UserID.
//         // outgoing: Error.

//         let token = require('./createJWT.js');

//         let error = '';
//         let ObjectID = '';
//         let goal = 0;
//         let todaysCalories;
        
//         const {userId, date, jwtToken} = req.body;

//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         const results = await Health.find({UserID:userId});
//         if( results.length > 0 )
//         {
//             goal = results[0].Calorie_Goal;
//         }
                
//         const results2 = await Diary.find({UserID:userId});

//         let recentDate = results2[0].Diet[results2[0].Diet.length - 1].Date;
//         let beginOfDay = new Date(new Date() - (24*60*60*1000));
        
//         if(recentDate < beginOfDay)
//         {
//             recentDate.setDate(recentDate.getDate() + 1);

//             const newDiet = Diet({UserID:userId, Date:recentDate, Total_Calories:0});
//             try
//             {            
//                 const saveDiet = await newDiet.save();
//             }
//             catch(e)
//             {
//                 error = e.toString();
//             }

//             const results2 = await Diet.find({UserID:userId});

//             ObjectID = results2[results2.length - 1]._id.toString();
//             const results3 = await Diary.findOneAndUpdate({UserID:userId}, {$push: {Diet:{Date:recentDate, DietID:ObjectID}}});  
//         }

//         const results4 = await Diary.find({UserID:userId});

//         ObjectID = results4[results4.length - 1].Diet[results4[results4.length - 1].Diet.length - 1].DietID.toString();
//         const results5 = await Diet.findById(ObjectID);
//         todaysCalories = results5.Total_Calories;

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
              
//         var ret = {goal:goal, todaysCalories:todaysCalories, error: error, jwtToken: refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/createMeal', async (req, res, next) =>
//     {
//         // incoming: Food ID Array, Meal Nutritional Information.
//         // outgoing: Error.

//         let token = require('./createJWT.js');

//         let error = '';

//         const {userId, mealName, mealProtein, mealCarbs, mealSugar, mealFat, mealSodium, mealCalories, foodArray, jwtToken} = req.body;

//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         const newMeal = Meal({UserID:userId, Name:mealName, Protein:mealProtein, Carbohydrates:mealCarbs, Sugar:mealSugar, Fat:mealFat, Sodium:mealSodium, Calories:mealCalories, Foods:foodArray});

//         try
//         {
//             newMeal.save();
//         }
//         catch(e)
//         {
//             error = e.toString();
//         }

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         var ret = {error: error, jwtToken: refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/getMeal', async (req, res, next) =>
//     {
//         // incoming: UserID, MealID.
//         // outgoing: Meals.

//         let token = require('./createJWT.js');

//         let error = '';
//         let meal;
//         var ret;

//         const {userId, mealId, jwtToken} = req.body;
        
//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         const results = await Meal.find({UserID:userId, _id:mealId});

//         if( results.length > 0 )
//         {
//             meal = results[0];
//         }
//         else
//         {
//             ret = {error:"Meal Doesn't Exist"};
//         }

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         ret = {error:error, meal:meal, jwtToken:refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/getAllMeals', async (req, res, next) =>
//     {
//         // incoming: UserID.
//         // outgoing: Meals.

//         let token = require('./createJWT.js');

//         let error = '';
//         let meals;
//         var ret;

//         const {userId, jwtToken} = req.body;
        
//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         const results = await Meal.find({UserID:userId});

//         if( results.length > 0 )
//         {
//             meals = results;
//         }
//         else
//         {
//             ret = {error:"Meal Doesn't Exist"};
//         }

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         ret = {error:error, meals:meals, jwtToken:refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/getMealHistory', async (req, res, next) =>
//     {
//         // incoming: UserID.
//         // outgoing: Meals.

//         let token = require('./createJWT.js');

//         let error = '';
//         let diet;
//         var ret;

//         const {userId, jwtToken} = req.body;
        
//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         const results = await Diet.find({UserID:userId});

//         if( results.length > 0 )
//         {
//             diet = results;
//         }
//         else
//         {
//             ret = {error:"Meal Doesn't Exist"};
//         }

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         ret = {error:error, diet:diet, jwtToken:refreshedToken};
//         res.status(200).json(ret);
//     });
//     //
//     app.post('/api/addMealtoDiary', async (req, res, next) =>
//     {
//         // incoming: UserID.
//         // outgoing: Meals.

//         let token = require('./createJWT.js');

//         let error = '';
//         let newCal = 0;
//         var ret;

//         const {userId, calories, mealId, jwtToken} = req.body;
        
//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         const results = await Diary.find({UserID:userId});
//         console.log(results)

//         let ObjectID = results[0].Diet[results[0].Diet.length - 1].DietID;
        
//         console.log(ObjectID);

//         const results2 = await Diet.findById(ObjectID);
//         console.log(results2);
//         newCal = calories + results2.Total_Calories;
//         console.log(newCal)

//         const results3 = await Diet.findByIdAndUpdate(ObjectID, {Total_Calories:newCal});
//         console.log(mealId);
//         const results4 = await Diet.findByIdAndUpdate(ObjectID, {$push: {Meals: {MealID: mealId}}});

//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         ret = {error:error, jwtToken:refreshedToken};
//         res.status(200).json(ret);
//     });
    


//     app.post('/api/addcard', async (req, res, next) =>
//     {
//         // incoming: UserID, Card.
//         // outgoing: error.

//         let error = '';
        
//         // New
//         let token = require('./createJWT.js');
//         const {userId, card, jwtToken} = req.body;
//         console.log(jwtToken);

//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         // const {userId, card} = req.body;
//         const newCard = new Card({UserID:userId, Card:card});

//         try
//         {
//             newCard.save();
//         }
//         catch(e)
//         {
//             error = e.toString();
//         }

//         // New
//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//             console.log(refreshedToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
        
//         var ret = {error: error, jwtToken: refreshedToken};
//         res.status(200).json(ret);

//         // let ret = {error:error};
//         // res.status(200).json(ret);
//     });

//     app.post('/api/searchcards', async (req, res, next) => 
//     {
//         // incoming: UserID, Search.
//         // outgoing: Results[], Error.

//         let error = '';

//         // New
//         let token = require('./createJWT.js');
//         const {userId, search, jwtToken} = req.body;

//         try
//         {
//             if(token.isExpired(jwtToken))
//             {
//                 var r = {error:'The JWT is no longer valid', jwtToken: ''};
//                 res.status(200).json(r);
//                 return;
//             }
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }

//         // const {userId, search} = req.body;
//         let _search = search.trim();
//         const results = await Card.find({"Card": { $regex: _search + '.*', $options: 'r'}});

//         let _ret = [];
//         for(var i=0; i<results.length; i++)
//         {
//             _ret.push(results[i].Card);
//         }
        
//         // New
//         var refreshedToken = null;
//         try
//         {
//             refreshedToken = token.refresh(jwtToken);
//         }
//         catch(e)
//         {
//             console.log(e.message);
//         }
    
//         var ret = {results:_ret, error: error, jwtToken: refreshedToken};

//         // let ret = {results:_ret, error:error};
//         res.status(200).json(ret);
//     });
// }

import React, {useState} from 'react';
import axios from 'axios';

function Profile()
{
	let bp = require('./Path.js');
	var storage = require('../tokenStorage.js');

	let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;

    var username = '';
    var password = '';
    var firstName = '';
    var lastName = '';
    var email = '';

    var height = '';
    var age = 0;
    var goalWeight = 0;
    var goalCalories = 0;

    const [message, setMessage] = useState('');

	const doEditUser = async event => 
	{
		event.preventDefault();

        var tok = storage.retrieveToken();
		let obj = {userId:userId, username:username.value, password:password.value, firstName:firstName.value, lastName:lastName.value, email:email.value, jwtToken:tok};
		let js = JSON.stringify(obj);

		var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/edituser'),	
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };

		axios(config).then(function (response) 
        {
            var res = response.data;

            if (res.error) 
            {
                setMessage('Login Failed.');
            }
            else 
            {	
                storage.storeToken(res.jwtToken);

                window.location.href = '/profile';


				setMessage('Information Saved');
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });   
	};

    const doEditHealth = async event => 
	{
		event.preventDefault();

        var tok = storage.retrieveToken();
		let obj = {userId:userId, age:age.value, height:height.value, goalWeight:goalWeight.value, goalCalories:goalCalories.value, jwtToken:tok};
		let js = JSON.stringify(obj);

		var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/editHealth'),	
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };

		axios(config).then(function (response) 
        {
            var res = response.data;

            if (res.error) 
            {
                setMessage('Login Failed.');
            }
            else 
            {	
                storage.storeToken(res.jwtToken);

                window.location.href = '/profile';
				setMessage('Information Saved');
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });   
	};

	return (
		<div id="ProfileDiv">
			<form onSubmit={doEditUser}>
			<span id="inner-title">Type In New User Information.</span><br />
            <input type="text" id="username" placeholder="Username..." 
				ref={(c) => username = c} /> <br />
            <input type="password" id="password" placeholder="Password..." 
				ref={(c) => password = c} /> <br />
            <input type="text" id="firstName" placeholder="First Name..." 
				ref={(c) => firstName = c} /> <br />
            <input type="text" id="lastName" placeholder="Last Name..." 
				ref={(c) => lastName = c} /> <br />
            <input type="text" id="email" placeholder="Email..." 
				ref={(c) => email = c} /> <br />
            <input type="submit" id="editUserButton" class="buttons" value = "Save Changes..."
				onClick={doEditUser} />
            </form>
            <form onSubmit={doEditHealth}>
            <span id="inner-title">Type In New Health Information.</span><br />
            <input type="number" id="age" placeholder="Age..." 
				ref={(c) => age = c} /> <br />
            <input type="text" id="height" placeholder="Height..." 
				ref={(c) => height = c} /> <br />
            <input type="number" id="goalWeight" placeholder="Goal Weight..." 
				ref={(c) => goalWeight = c} /> <br />  
            <input type="number" id="goalCalories" placeholder="Goal Calories..." 
				ref={(c) => goalCalories = c} /> <br />      
			<input type="submit" id="editHealthButton" class="buttons" value = "Save Changes..."
				onClick={doEditHealth} />
            </form>
            <form>
            <span id="editHealthResult">{message}</span>
            </form>
            <form action = "/home">
			<input type="submit" id="loginRedirectButton" class="buttons" value = "Go to Home"/>
			</form>
			
		</div>
	);
};

export default Profile;

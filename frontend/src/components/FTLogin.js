import React, {useState} from 'react';
import axios from 'axios';

function FTLogin()
{
	let bp = require('./Path.js');
	var storage = require('../tokenStorage.js');

	let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;

    var height = '';
    var age = 0;
    var goalWeight = 0;
    var startWeight = 0;
    var calorieGoal = 0;
	var activityLevel = 0;
    const [message, setMessage] = useState('');

	const doFTLogin = async event => 
	{
		event.preventDefault();

        var tok = storage.retrieveToken();
		let obj = {userId:userId, activityLevel:activityLevel.value, height:height.value, age:age.value, goalWeight:goalWeight.value, startWeight:startWeight.value, calorieGoal:calorieGoal.value, jwtToken:tok};
		let js = JSON.stringify(obj);

		var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/ftlogin'),	
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

				setMessage('');
				window.location.href = '/home';
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });   
	};

	return (
		<div id="ftLoginDiv">
			<form onSubmit={doFTLogin}>
			<span id="inner-title">Welcome to Elan! Please Enter Information.</span><br />
            <input type="number" id="age" placeholder="Age..." 
				ref={(c) => age = c} /> <br />
            <input type="text" id="height" placeholder="Height(Ft. In.)..." 
				ref={(c) => height = c} /> <br />
            <input type="number" id="startWeight" placeholder="Current Weight in lbs..." 
				ref={(c) => startWeight = c} /> <br />
            <input type="number" id="goalWeight" placeholder="Goal Weight in lbs..." 
				ref={(c) => goalWeight = c} /> <br />
            <input type="number" id="calorieGoal" placeholder="Calorie Goal..." 
				ref={(c) => calorieGoal = c} /> <br />
            <input type="number" id="activityLevel" placeholder="Activity Level..." 
				ref={(c) => activityLevel = c} /> <br />  
			<input type="submit" id="ftLoginButton" class="buttons" value = "Login..."
				onClick={doFTLogin} />
			</form>
			<span id="ftLoginResult">{message}</span>
		</div>
	);
};

export default FTLogin;

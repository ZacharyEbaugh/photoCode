import React, {useState} from 'react';
import axios from 'axios';

function Home()
{
	let bp = require('./Path.js');
	var storage = require('../tokenStorage.js');

	let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;

    var age = 0;
    
    const [message, setMessage] = useState('');

	const doFTLogin = async event => 
	{
		event.preventDefault();

        var tok = storage.retrieveToken();
		let obj = {userId:userId, jwtToken:tok};
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
				window.location.href = '/cards';
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });   
	};

	return (
		<div id="homeDiv">
            <form action = "/profile">
			<input type="submit" id="loginRedirectButton" class="buttons" value = "Profile"/>
			</form>
            <form action = "/food">
			<input type="submit" id="addFoodButton" class="buttons" value = "Food Options"/>
			</form>
            <form action = "/meal">
			<input type="submit" id="addFoodButton" class="buttons" value = "Meal Options"/>
			</form>
            <form action = "/weight">
			<input type="submit" id="addFoodButton" class="buttons" value = "Weight Options"/>
			</form>
			<span id="homeResult">{message}</span>
		</div>
	);
};

export default Home;
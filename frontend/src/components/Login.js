import React, {useState} from 'react';
import axios from 'axios';

function Login()
{
	var storage = require('../tokenStorage.js');
	let bp = require('./Path.js');

	var login;
	var password;
	const [message, setMessage] = useState('');

	const doLogin = async event => 
	{
		event.preventDefault();

		let obj = {login:login.value, password:password.value};
		let js = JSON.stringify(obj);

		var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/login'),	
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
                setMessage('User/Password combination incorrect');
            }
            else 
            {	
				if(res.ev === 0)
				{
					setMessage('Please verify email');
				}
				else
				{
					storage.storeToken(res.token);
					var jwt = require('jsonwebtoken');
		
					var ud = jwt.decode(storage.retrieveToken(),{complete:true});
					var userId = ud.payload.userId;
					var firstName = ud.payload.firstName;
					var lastName = ud.payload.lastName;
					
					let user = {firstName:firstName,lastName:lastName,id:userId}
					localStorage.setItem('user_data', JSON.stringify(user));

					setMessage('');

					if(res.ftl === 0)
					{
						window.location.href = '/ftLogin';
					}
					else
					{
						window.location.href = '/home';
					}
				}
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });  
	};

	return (
		<div id="loginDiv">
			<form onSubmit={doLogin}>
			<span id="inner-title" >Please Log In</span><br />
			<input type="text" id="login" placeholder="Login" 
				ref={(c) => login = c} /> <br />
			<input type="password" id="password" placeholder="Password" 
				ref={(c) => password = c} /> <br />
			<input type="submit" id="loginButton" class="buttons" value = "Login"
				onClick={doLogin} />
			<span id="loginResult">{message}</span>
			</form>
			<form action = "/forgotpassword">
			<input type="submit" id="forgotPasswordButton" class="buttons" value = "Forgot Password"/>
			</form>
			<form action = "/register">
			<input type="submit" id="registerRedirectButton" class="buttons" value = "Register"/>
			</form>
		</div>
	);
};

export default Login;
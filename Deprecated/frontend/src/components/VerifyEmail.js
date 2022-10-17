import React, {useState} from 'react';
import {useLocation} from 'react-router-dom'
import axios from 'axios';

function VerifyEmail()
{
	let bp = require('./Path.js');

	const search = useLocation().search;
	const ahjst = new URLSearchParams(search).get('ahjst');

	const [message, setMessage] = useState('');

	const doVerifyEmail = async event => 
	{
		event.preventDefault();

		let obj = {ahjst:ahjst};
		let js = JSON.stringify(obj);

		var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/verifyemail'),	
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
				setMessage('Your Email is Verified');
			}
        })
        .catch(function (error) 
        {
            console.log(error);
        });
	};

	return (
		<div id="verifyEmailDiv">
			<form onSubmit={doVerifyEmail}>
			<span id="inner-title">Please Verify Email</span><br />
			<input type="submit" id="verifyEmailButton" class="buttons" value = "Verify Email"
				onClick={doVerifyEmail} />
			<span id="verifyEmailResult">{message}</span>
			</form>
			<form action = "/">
			<input type="submit" id="loginRedirectButton" class="buttons" value = "Go to Login"/>
			</form>
		</div>
	);
};

export default VerifyEmail;
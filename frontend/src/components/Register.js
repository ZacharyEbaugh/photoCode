import React, {useState} from 'react';
import axios from 'axios';

function Register()
{
    let bp = require('./Path.js');

    var username = '';
    var password = '';
    var firstName = '';
    var lastName = '';
    var email = '';
    const [message, setMessage] = useState('');

    const doRegister = async event => 
    {
        event.preventDefault();

        let obj = {username:username.value, password:password.value, firstName:firstName.value, lastName:lastName.value, email:email.value, firstTimeLogin:0, emailVerify:0, forgotPasswordToken:"0"};
        let js = JSON.stringify(obj);

        var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/register'),	
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
                setMessage('API Error:' + res.error );
            }
            else 
            {	
				setMessage('User Registered');
                window.location.href = '/'
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });  
    };

    return(
        <div id="RegisterDiv">
            <form onSubmit={doRegister}>
            <span id="inner-title">Register</span><br />
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
            <input type="submit" id="registerButton" class="buttons" value = "Register"
                onClick={doRegister} />
            <span id="registerResult">{message}</span>
            </form>
            <form action = "/">
			<input type="submit" id="loginRedirectButton" class="buttons" value = "Go to Login"/>
			</form>
        </div>
    );
};

export default Register;
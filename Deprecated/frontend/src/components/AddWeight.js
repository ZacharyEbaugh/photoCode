import React, {useState} from 'react';
import axios from 'axios';

function AddWeight()
{
    var storage = require('../tokenStorage.js');
    let bp = require('./Path.js');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;

    var date = '';
    var weight = 0;
 
    const [message,setMessage] = useState('');
 
    const doAddWeight = async event => 
    {
        event.preventDefault();

        var tok = storage.retrieveToken();
        let obj = {date:date.value, weight:weight.value, userId:userId, jwtToken:tok};
        let js = JSON.stringify(obj);

        var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/addweight'),	
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
        axios(config).then(function(response) 
        {
            var res = response.data;
            if (res.error) 
            {
                setMessage( "API Error:" + res.error );
            }
            else 
            {	
                setMessage('Food has been added');
                
                storage.storeToken(res.jwtToken);
                window.location.href = '/weight';
            }
        })
        .catch(function(error) 
        {
            setMessage(error);
        });    
    };

    return(
        <div id="AddWeightDiv">
            <form onSubmit={doAddWeight}>
            <span id="inner-title">Log Your Weight</span><br />
            <input type="date" id="date" placeholder="Type In Date" 
            ref={(c) => date = c} /> <br />      
            <input type="number" id="weight" placeholder="Weight" 
            ref={(c) => weight = c} /> <br />        
            <input type="submit" id="addWeightButton" class="buttons" value = "Log Weight"
            onClick={doAddWeight} />
            </form>
            <span id="addWeightResult">{message}</span>
        </div>
    );
};

export default AddWeight;

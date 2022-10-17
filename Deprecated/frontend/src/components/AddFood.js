import React, {useState} from 'react';
import axios from 'axios';

function AddFood()
{
    var storage = require('../tokenStorage.js');
    let bp = require('./Path.js');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;

    var foodName = 0;
    var foodProtein = 0;
    var foodCarbs = 0;
    var foodSugar = 0;
    var foodFat = 0;
    var foodSodium = 0;
    var foodCalorie = 0;
    var foodServeSize = 0;
    var foodType = '';
    var ssType = ''; 
    var foodPhase = '';

    const [message,setMessage] = useState('');
    
    const doAddFood = async event => 
    {
        event.preventDefault();

        var tok = storage.retrieveToken();
        let obj = {userId:userId, foodName:foodName.value,foodProtein:foodProtein.value, foodCarbs:foodCarbs.value, foodSugar:foodSugar.value, foodFat:foodFat.value,foodSodium:foodSodium.value, foodCalorie:foodCalorie.value, foodServeSize:foodServeSize.value, foodType:foodType.value, ssType:ssType.value, foodPhase:true, jwtToken:tok};
        let js = JSON.stringify(obj);

        var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/addfood'),	
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
                window.location.href = '/food';
            }
        })
        .catch(function(error) 
        {
            setMessage(error);
        });   
    };

    return(
        <div id="AddFoodDiv">
            <form onSubmit={doAddFood}>
            <span id="inner-title">Please Enter a Foods Information</span><br />
            <input type="text" id="foodName" placeholder="Food Name..." 
                ref={(c) => foodName = c} /> <br />
            <input type="number" id="foodProtein" placeholder="Protein..." 
                ref={(c) => foodProtein = c} /> <br />        
            <input type="number" id="foodCarbs" placeholder="Carbohydrates..." 
                ref={(c) => foodCarbs = c} /> <br />
            <input type="number" id="foodSugar" placeholder="Sugar..." 
                ref={(c) => foodSugar = c} /> <br />
            <input type="number" id="foodFat" placeholder="Fat..." 
                ref={(c) => foodFat = c} /> <br />
            <input type="number" id="foodSodium" placeholder="Sodium..." 
                ref={(c) => foodSodium = c} /> <br />
            <input type="number" id="foodCalorie" placeholder="Calories..." 
                ref={(c) => foodCalorie = c} /> <br />
            <input type="number" id="foodServeSize" placeholder="Serving Size..." 
                ref={(c) => foodServeSize = c} /> <br />
            <input type="text" id="foodType" placeholder="Food Type (Ex: Fruit)..." 
                ref={(c) => foodType = c} /> <br />
            <input type="text" id="ssType" placeholder="Unit (Ex: Grams...)" 
                ref={(c) => ssType = c} /> <br />
            <input type="submit" id="addFoodButton" class="buttons" value = "Add Food."
                onClick={doAddFood} />
            </form>
            <span id="addFoodResult">{message}</span>
        </div>
    );
};

export default AddFood;
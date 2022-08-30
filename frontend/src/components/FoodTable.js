import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function FoodTable()
{
    var storage = require('../tokenStorage.js');
    let bp = require('./Path.js');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
 
    const[foods, setfood] = useState([]);
    const [message,setMessage] = useState('');
    const [isLoading, setisLoading] = useState(true);

    const doGetFood = () => 
    {
        var tok = storage.retrieveToken();
        let obj = {userId:userId, jwtToken:tok};
        let js = JSON.stringify(obj);

        var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/getAllFood'),	
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
                storage.storeToken(res.jwtToken);
                
                if(res.foods === undefined)
                {
                    setfood([])
                }
                else
                {
                    setfood(res.foods.sort((a,b) => (a.Name > b.Name) ? 1: -1));
                }

                console.log(res.foods.sort((a,b) => (a.Name > b.Name) ? 1: -1));
                setisLoading(false);
            }
        })
        .catch(function(error) 
        {
            setMessage(error);
        });    
    };

    const doDeleteFood = (foodId) => 
    {
        console.log(foodId);
        var tok = storage.retrieveToken();
        let obj = {foodId:foodId, jwtToken:tok};
        let js = JSON.stringify(obj);

        var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/deleteFood'),	
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
                storage.storeToken(res.jwtToken);
                window.location.href = "/food";
            }
        })
        .catch(function(error) 
        {
            setMessage(error);
        });    
    };

    useEffect(() => {
        if(isLoading){
            doGetFood();
        }
      }, [doGetFood]);

    return(
        <div id="GetWeightDiv">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Protein (Per Serving) </th>
                    <th scope="col">Carbohydrates (Per Serving)</th>
                    <th scope="col">Sugar (Per Serving)</th>
                    <th scope="col">Fat (Per Serving)</th>
                    <th scope="col">Sodium (Per Serving)</th>
                    <th scope="col">Calories (Per Serving)</th>
                    <th scope="col">Food Type</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                    
                        foods.map(element => {
                            return (
                                <tr>
                                <th scope="row">{element.Name}</th>
                                <td>{element.Protein}g</td>
                                <td>{element.Carbohydrates}g</td>
                                <td>{element.Sugar}g</td>
                                <td>{element.Fat}g</td>
                                <td>{element.Sodium}g</td>
                                <td>{element.Calories}</td>
                                <td>{element.Food_Type}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <form action = "/home">
			<input type="submit" id="loginRedirectButton" class="buttons" value = "Go to Home"/>
			</form>
        </div>
    );
};

export default FoodTable;

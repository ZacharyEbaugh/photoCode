import React, {useState, useEffect} from 'react';
import axios from 'axios';

function MealHistoryTable()
{
    var storage = require('../tokenStorage.js');
    let bp = require('./Path.js');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
 
    const[weights, setWeights] = useState([]);
    const [message,setMessage] = useState('');
    const [isLoading, setisLoading] = useState(true);

    const doGetWeight = () => 
    {
        var tok = storage.retrieveToken();
        let obj = {userId:userId, jwtToken:tok};
        let js = JSON.stringify(obj);

        var config = 
        {
        	method: 'post',
            url: bp.buildPath('api/getMealHistory'),	
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

                if(res.diet !== undefined)
                {
                    console.log(res.diet);
                    setWeights(res.diet.sort((a,b) => (a.Date > b.Date) ? 1: -1));
                }
        
                setisLoading(false);
            }
        })
        .catch(function(error) 
        {
            setMessage(error);
        });    
    };

    useEffect(() => {
        if(isLoading){
            doGetWeight();
        }
      }, [doGetWeight]);

    return(
        <div id="GetWeightDiv">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Total Calories for the Day</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        weights.map(element => {
                            return (
                                <tr>
                                <th scope="row">{new Date(element.Date).toDateString()}</th>
                                <td>{element.Total_Calories}</td>
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

export default MealHistoryTable;

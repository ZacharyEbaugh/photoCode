import React, {useEffect, useState} from 'react';
import axios from 'axios';

const AddMeal = () =>
{
	let bp = require('./Path.js');
	var storage = require('../tokenStorage.js');

	let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    var userId = ud.id;

    const [message, setMessage] = useState('');
    const [meals, setMeals] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [totalCal, setTotalCalories] = useState(0);

    var tok = storage.retrieveToken();
    let obj = {userId:userId, jwtToken:tok};
    let js = JSON.stringify(obj);

    const updatedSelect = (meal) => {
        console.log(meal);
        if(selected === null)
        {
            setSelected(meal);
        }
        else if(selected === meal)
        {
            setSelected(null);
        }
        else
        {
            setSelected(meal);
        }
    }

    const PlaceMeal = () => {
        console.log(selected);

        if(selected === null)
        {
            return;
        }
        else
        {   
            console.log(selected);
            console.log(selected._id.toString());
            console.log(userId);
            let obj = {userId:userId, calories: selected.Calories, mealId:selected._id.toString(), jwtToken:tok};
            let js = JSON.stringify(obj);
            console.log(js);
            var config = 
            {
                method: 'post',
                url: bp.buildPath('api/addMealtoDiary'),	
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
                    window.location.href = '/mealdiary';
                }
            })
            .catch(function (error) 
            {
                console.log(error);
            });
        }   
    }

    const doGetMeal = () => 
    {
        var config = 
        {
            method: 'post',
            url: bp.buildPath('api/getAllMeals'),	
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
                setMeals(res.meals);
                setLoading(false);
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });   
    }

    useEffect(() => {
        if(isLoading){
            doGetMeal();
        }
      }, [doGetMeal]);


	return (

		<div id="searchMeal">
            <form action = "/Meal">
			<input type="submit" id="loginRedirectButton" class="buttons" value = "Make A Meal"/>
			</form>
            <p>Log A Meal For Today:</p>
			<input placeholder="Enter Meal Name" onChange={event => setSearch(event.target.value)} />
            {
                meals.filter(meal => {
                    if (search === '') {
                    return meal;
                    } else if (meal.Name.toLowerCase().includes(search.toLowerCase())) {
                    return meal;
                    }
                }).map((meal, index) => 
                {if(index < 5)
                    return (
                    <div className="box" onClick = {() => updatedSelect(meal)} key={index}>
                    <p>{meal.Name}</p>
                    <p>{meal.Calories}</p>
                    {
                        selected === meal ? <p>*Selected*</p> : null 
                    }
                    </div>
                )})
            }

            <p onClick={() => PlaceMeal()}>Log A Meal</p>
		</div>

	);
};

export default AddMeal;

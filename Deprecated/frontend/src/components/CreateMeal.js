import React, {useEffect, useState} from 'react';
import axios from 'axios';

const CreateMeal = () =>
{
	let bp = require('./Path.js');
	var storage = require('../tokenStorage.js');

	let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;

    const [message, setMessage] = useState('');
    const [meals, setMeals] = useState([]);
    const [search, setSearch] = useState('');
    const [mealName, setMealName] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [totalCal, setTotalCalories] = useState(0);

    var tok = storage.retrieveToken();
    let obj = {userId:userId, jwtToken:tok};
    let js = JSON.stringify(obj);

    const updateSelected = (meal) => {
        console.log(meal);
        if((selected.length > 0) && selected.includes(meal))
        {
            setSelected(selected.filter(function(item) {
                return item.Name !== meal.Name;
            }))
            setTotalCalories(totalCal-meal.Calories);
        }
        else
        {
            if(selected.length === 0)
            {
                setSelected([meal]);
            }
            else 
            {
                setSelected([...selected, meal]);
            }
            setTotalCalories(totalCal+meal.Calories);
        }
    }

    const StoreMeal = () => {
        console.log(selected);

        if(selected.length < 0)
        {
            return;
        }
        else
        {
            let i;
            let calories = 0;
            let protein = 0;
            let carbs = 0;
            let sugar = 0;
            let fat = 0;
            let sodium = 0;
            let foodArray = [];
            let string;

            for(i = 0; i < selected.length; i++)
            {
                protein += selected[i].Protein;
                carbs += selected[i].Carbohydrates;
                sugar += selected[i].Sugar;
                fat += selected[i].Fat;
                sodium += selected[i].Sodium;
                calories += selected[i].Calories;
                string = {FoodIDs: selected[i]._id.toString()};
                foodArray.push(string);
            }

            let obj = {userId:userId, mealName:mealName, mealCarbs:carbs, mealSugar:sugar, mealFat:fat, mealSodium:sodium, foodArray:foodArray, mealCalories:calories, mealProtein:protein, jwtToken:tok};
            let js = JSON.stringify(obj);

            var config = 
            {
                method: 'post',
                url: bp.buildPath('api/createMeal'),	
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
                    window.location.href = '/meal';
                }
            })
            .catch(function (error) 
            {
                console.log(error);
            });
        }   
    }

    const doGetFoods = () => 
    {
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
                setMeals(res.foods);
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
            doGetFoods();
        }
      }, [doGetFoods]);


	return (

		<div id="searchMeal">
            <form action = "/MealDiary">
			<input type="submit" id="loginRedirectButton" class="buttons" value = "Log A Meal"/>
			</form>
            <p>Create A Meal:</p>
            <input placeholder="New Meal Name" onChange={event => setMealName(event.target.value)} />
			<input placeholder="Search for Foods" onChange={event => setSearch(event.target.value)} />
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
                    <div className="box" onClick = {() => updateSelected(meal)} key={index}>
                    <p>{meal.Name}</p>
                    <p>{meal.Calories}</p>
                    {
                        selected.includes(meal) ? <p>*Selected*</p> : null 
                    }
                    </div>
                )})
            }

            <p onClick={() => StoreMeal()}>Save New Food</p>
		</div>

	);
};

export default CreateMeal;

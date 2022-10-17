import React from 'react';

import PageTitle from '../components/PageTitle';
import AddMeal from '../components/AddMeal';
import CreateMeal from '../components/CreateMeal';
import MealTable from '../components/MealTable';
//import AddWeight from '../components/AddWeight';

const MealPage = () =>
{
    return(
		<div>
			<PageTitle />
			<CreateMeal />
			<MealTable/>
    	</div>
    );
};

export default MealPage;
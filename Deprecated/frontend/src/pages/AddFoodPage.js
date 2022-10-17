import React from 'react';

import PageTitle from '../components/PageTitle';
import AddFood from '../components/AddFood';
import FoodTable from '../components/FoodTable';

const AddFoodPage = () =>
{
    return(
		<div>
			<PageTitle />
			<AddFood/>
			<FoodTable />
		</div>
    );
};

export default AddFoodPage;
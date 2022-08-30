import React from 'react';

import PageTitle from '../components/PageTitle';
import AddMeal from '../components/AddMeal';
import MealHistoryTable from '../components/MealHistoryTable';

const MealDiaryPage = () =>
{
    return(
		<div>
			<PageTitle />
			<AddMeal />
			<MealHistoryTable />
		</div>
    );
};

export default MealDiaryPage;
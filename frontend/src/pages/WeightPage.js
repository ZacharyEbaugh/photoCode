import React from 'react';

import PageTitle from '../components/PageTitle';
import AddWeight from '../components/AddWeight';
import WeightTable from '../components/WeightTable';

const WeightPage = () =>
{
    return(
		<div>
			<PageTitle />
			<AddWeight />
			<WeightTable />
		</div>
    );
};

export default WeightPage;
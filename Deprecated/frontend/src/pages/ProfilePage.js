import React from 'react';
import LoggedInName from '../components/LoggedInName';

import PageTitle from '../components/PageTitle';
import Profile from '../components/Profile';

const ProfilePage = () =>
{
	return(
		<div>
			<PageTitle />
			<Profile />
			<LoggedInName />
		</div>
	);
};

export default ProfilePage;

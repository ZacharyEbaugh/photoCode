import React from 'react';
import './App.css';

import {BrowserRouter, Routes, Route} from "react-router-dom";

// Login and Signup Pages.
import LoginPage from './pages/LoginPage';
import FTLoginPage from './pages/FTLoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Landing Page and Profile Pages.
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

// Weight Related Pages.
// Displays Graph, Allows to Log Weight, Redirects to WeightDiary.
import WeightPage from './pages/WeightPage';
import WeightDiaryPage from './pages/WeightDiaryPage';

// Meal Related Pages.
import AddFoodPage from './pages/AddFoodPage';
import MealPage from './pages/MealPage';
import MealDiaryPage from './pages/MealDiaryPage';
// Allows to Manually Input Meals/Combine Foods.
import CreateMealPage from './pages/CreateMealPage';


import CardPage from './pages/CardPage';

function App() {
return (
	<BrowserRouter>
		<Routes>
			<Route path="/" index element={<LoginPage />} />
			<Route path="/ftLogin" index element={<FTLoginPage />} />
			<Route path="/register" index element={<RegisterPage />} />
			<Route path="/verifyemail" index element={<VerifyEmailPage />} />
			<Route path="/forgotpassword" index element={<ForgotPasswordPage />} />
			<Route path="/resetpassword" index element={<ResetPasswordPage />} />

			<Route path="/home" index element={<HomePage />} />
			<Route path="/profile" index element={<ProfilePage />} />
			
			<Route path="/weight" index element={<WeightPage />} />
			<Route path="/weightdiary" index element={<WeightDiaryPage />} />

			<Route path="/food" index element={<AddFoodPage />} />
			<Route path="/meal" index element={<MealPage />} />
			<Route path="/mealdiary" index element={<MealDiaryPage />} />
			<Route path="/createmeal" index element={<CreateMealPage />} />

			<Route path="/cards" index element={<CardPage />} />


		</Routes>
	</BrowserRouter>
);
}

export default App;

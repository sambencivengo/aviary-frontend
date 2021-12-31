import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'antd/dist/antd.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import SpottingsContainer from './components/SpottingsContainer';
import SpottingForm from './components/SpottingForm';
import FeedContainer from './components/FeedContainer';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/home" element={<Home />} />
					<Route path="/myaviary" element={<SpottingsContainer />} />
					<Route path="/spotabird" element={<SpottingForm />} />
					<Route path="/feed" element={<FeedContainer />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

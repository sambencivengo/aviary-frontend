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
import UserAviary from './components/UserAviary';
import UserAviaryContainer from './components/UserAviaryContainer';
import UserProvider from './components/UserProvider';
import { Space, Typography } from 'antd';

const { Title } = Typography;
ReactDOM.render(
	// <React.StrictMode>
	<BrowserRouter>
		<UserProvider>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/home" element={<Home />} />
					<Route path="/myaviary" element={<SpottingsContainer />} />
					<Route path="/spotabird" element={<SpottingForm />} />
					<Route path="/feed" element={<FeedContainer />} />
					<Route path="/aviary/:userId" element={<UserAviary />} />
					{/* <Route path=":userId" element={<UserAviary />} /> */}
					{/* </Route> */}
				</Route>

				<Route
					path="*"
					element={
						<>
							<main
							// style={{
							// 	justifyContent: 'center',
							// 	padding: '1rem',
							// }}
							>
								<Space
									direction="horizontal"
									style={{
										width: '100%',
										justifyContent: 'center',
									}}
								>
									<img
										src="/logoBird4.png"
										style={{
											paddingTop: '20vh',
											maxHeight: '60vh',
										}}
									/>
								</Space>
								<Space
									direction="horizontal"
									style={{
										width: '100%',
										justifyContent: 'center',
									}}
								>
									<Title level={3}>
										Whoops! There is nothing here!
									</Title>
								</Space>
							</main>
						</>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</UserProvider>
	</BrowserRouter>,
	// </React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

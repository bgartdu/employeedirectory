import React from 'react';
import logo from './logo.svg';
import './App.css';
import EmployeeDirectory from "./EmployeeDirectory"

function App() {
	return (
		<div className="App">
			<div className="row">
				<div className="col s12 blue darken-3 white-text">b</div>
				<div className="col s12 red red-text">c</div>
			</div>
			<EmployeeDirectory />
		</div>
	);
}

export default App;

import React from 'react';
import EmployeeLine from "./EmployeeLine"

class EmployeeDirectory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: "",
			error: null,
			isLoaded: false,
			items: []
		};
		this.employeeMatchesSearch = (employee) => {
			let search = this.state.search.toLowerCase();

			return search === ""
				|| (employee.name.toLowerCase().includes(search))
				|| (employee.email.toLowerCase().includes(search))
				|| (employee.dob.toLowerCase().includes(search))
				|| (employee.cell.toLowerCase().includes(search))
		}
	}

	
	
	async componentDidMount() {
		try {
			let res = await fetch("https://randomuser.me/api/?results=100&nat=us")
			let result = await res.json();
			let employees = result.results.map(it => {
				return {
					name: it.name.first + " " + it.name.last,
					email: it.email,
					dob: it.dob.date,
					cell: it.cell,
					picture: it.picture.thumbnail
				}
			})
			
			this.setState({
				isLoaded: true,
				items: employees,
			})
		} catch (error){
			this.setState({
				isLoaded: true,
				error,
			})
		}
	}

	handleSearch = event => {
		// console.log(event.target.value)
		const filter = event.target.value
		this.setState({search: filter})
	}
	
	
	render() {

		const { error, isLoaded, items } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>
		}
		
		return  <div className="row">
			<div className="col s4 white white-text">.</div>
			<div className="col s4 center">
				<input id = "searchField" onChange = {this.handleSearch}></input>
			</div>
			<div className="col s4 white white-text">.</div>
			<div className="col s12 white white-text">.</div>
			
			<div className="col s1">Image</div>
			<div className="col s3">Name</div>
			<div className="col s2">Phone</div>
			<div className="col s4">Email</div>
			<div className="col s2">DOB</div>

			<div className="col s12 white-text"><h5>spacer</h5></div>
			
			{items
				.filter(this.employeeMatchesSearch)
				.map(item => (
				<EmployeeLine picture = {item.picture}
										name={item.name}
										cell={item.cell}
										email={item.email}
										dob={item.dob}/>

			))}
			
			</div>
	}
}

export default EmployeeDirectory;
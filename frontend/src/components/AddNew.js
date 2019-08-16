import React from 'react';
import axios from 'axios';

class AddNew extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			url: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const { name, value } = event.currentTarget;
		this.setState({
			[name]: value
		});
	}

	async handleSubmit(event) {
		event.preventDefault(); //prevents page from refreshing on submit
		const baseURL = this.props.baseURL;
		const response = await axios.post(`${baseURL}/bookmarks`, {
			name: this.state.name,
			url: this.state.url
		});
		this.setState({
			name: '',
			url: ''
		});
		this.props.handleAddBookmark(response.data);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					type='text'
					id='name'
					name='name'
					placeholder='Name'
					onChange={this.handleChange}
					required={true}
					value={this.state.name}
				/>
				<input
					type='url'
					id='url'
					name='url'
					placeholder='URL'
					onChange={this.handleChange}
					required={true}
					value={this.state.url}
				/>
				<input type='submit' value='Add New' />
			</form>
		);
	}
}

export default AddNew;

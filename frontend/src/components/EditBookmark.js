import React from 'react';
import axios from 'axios';

class EditBookmark extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.bookmark.name,
			url: this.props.bookmark.url,
			id: this.props.bookmark._id
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
		const response = await axios.put(`${baseURL}/bookmarks/${this.state.id}`, {
			name: this.state.name,
			url: this.state.url
		});
		this.props.handleEditBookmarkShow(response.data);
		this.props.stopEditing();
	}

	render() {
		return (
			<form className='editForm' onSubmit={this.handleSubmit}>
				<h3>Edit {this.props.bookmark.name}</h3>
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
				<input type='submit' value='Save' />
			</form>
		);
	}
}

export default EditBookmark;

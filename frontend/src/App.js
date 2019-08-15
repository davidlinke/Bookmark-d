import React from 'react';
import axios from 'axios';
import AddNew from './components/AddNew.js';
import Show from './components/Show.js';
import './App.css';

let baseURL = 'http://localhost:3001';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookmarks: []
		};
		this.getBookmarks = this.getBookmarks.bind(this);
		this.handleAddBookmark = this.handleAddBookmark.bind(this);
	}

	async getBookmarks() {
		const response = await axios(`${baseURL}/bookmarks`);
		const data = response.data;
		this.setState({
			bookmarks: data
		});
	}

	handleAddBookmark(newBookmark) {
		console.log(newBookmark);
		const copyOfBookmarks = this.state.bookmarks;
		copyOfBookmarks.push(newBookmark);
		this.setState({
			bookmarks: copyOfBookmarks
		});
	}

	componentDidMount() {
		this.getBookmarks();
	}

	render() {
		return (
			<div>
				<div className='header'>
					<h1>Bookmark'd</h1>
					<AddNew
						handleAddBookmark={this.handleAddBookmark}
						baseURL={baseURL}
					/>
					<Show bookmarks={this.state.bookmarks} />
				</div>
			</div>
		);
	}
}

export default App;

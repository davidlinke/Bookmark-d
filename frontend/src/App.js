import React from 'react';
import axios from 'axios';
import AddNew from './components/AddNew.js';
import Show from './components/Show.js';

let baseURL = 'http://localhost:3001';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookmarks: []
		};
		this.getBookmarks = this.getBookmarks.bind(this);
		this.handleAddBookmark = this.handleAddBookmark.bind(this);
		this.handleEditBookmark = this.handleEditBookmark.bind(this);
		this.deleteBookmark = this.deleteBookmark.bind(this);
	}

	async getBookmarks() {
		const response = await axios(`${baseURL}/bookmarks`);
		const data = response.data;
		data.sort(this.sortByName);
		this.setState({
			bookmarks: data
		});
	}

	sortByName = (name1, name2) => {
		if (name1.name < name2.name) {
			return -1;
		}
		if (name1.name > name2.name) {
			return 1;
		}
		return 0;
	};

	handleAddBookmark(newBookmark) {
		const copyOfBookmarks = this.state.bookmarks;
		copyOfBookmarks.push(newBookmark);
		copyOfBookmarks.sort(this.sortByName);
		this.setState({
			bookmarks: copyOfBookmarks
		});
	}

	handleEditBookmark(existingBookmark) {
		const bookmarksArray = this.state.bookmarks;

		bookmarksArray.forEach(bookmark => {
			if (bookmark._id === existingBookmark._id) {
				bookmark.name = existingBookmark.name;
				bookmark.url = existingBookmark.url;
			}
		});

		bookmarksArray.sort(this.sortByName);

		this.setState({
			bookmarks: bookmarksArray
		});
	}

	deleteBookmark(id) {
		fetch(baseURL + '/bookmarks/' + id, {
			method: 'DELETE'
		}).then(response => {
			const findIndex = this.state.bookmarks.findIndex(
				bookmark => bookmark._id === id
			);
			const copyOfBookmarks = this.state.bookmarks;
			copyOfBookmarks.splice(findIndex, 1);
			this.setState({ bookmarks: copyOfBookmarks });
		});
	}

	componentDidMount() {
		this.getBookmarks();
	}

	render() {
		return (
			<div className='outer'>
				<div className='pageContainer'>
					<div className='header'>
						<h1>
							BOOKMARK
							<span className='bookmarkLogo' />D
						</h1>
					</div>
					<div className='main'>
						<AddNew
							handleAddBookmark={this.handleAddBookmark}
							baseURL={baseURL}
						/>
						<Show
							bookmarks={this.state.bookmarks}
							deleteBookmark={this.deleteBookmark}
							baseURL={baseURL}
							handleEditBookmark={this.handleEditBookmark}
						/>
					</div>
				</div>
				<div className='footer'>By Laura Seely &amp; David Linke </div>
			</div>
		);
	}
}

export default App;

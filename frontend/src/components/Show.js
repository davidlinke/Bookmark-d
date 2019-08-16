import React from 'react';
import EditBookmark from './EditBookmark.js';

class Show extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
			currentBookmark: {}
		};

		this.startEditing = this.startEditing.bind(this);
		this.stopEditing = this.stopEditing.bind(this);
		this.handleEditBookmarkShow = this.handleEditBookmarkShow.bind(this);
	}

	// FUNCTION
	// Set editmode to true and sets state
	startEditing = bookmark => {
		this.setState({
			editMode: !this.state.editMode,
			currentBookmark: bookmark
		});
	};

	stopEditing = () => {
		this.setState({
			editMode: false
		});
	};

	handleEditBookmarkShow(newBookmark) {
		this.props.handleEditBookmark(newBookmark);
	}

	render() {
		return (
			<div className='bookmarkOuter'>
				{this.state.editMode ? (
					<EditBookmark
						bookmark={this.state.currentBookmark}
						stopEditing={this.stopEditing}
						baseURL={this.props.baseURL}
						handleEditBookmarkShow={this.handleEditBookmarkShow}
					/>
				) : null}
				{this.props.bookmarks.length ? (
					<div>
						<div className='bookmarkGraphicUpper'>
							{this.props.bookmarks.map(bookmark => {
								return (
									<div className='bookmark' key={bookmark._id}>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href={bookmark.url}
										>
											<p className='inline'> {bookmark.name}</p>
										</a>
										<div className='bookmarkMenu'>
											<p
												className='inline edit'
												onClick={() => this.startEditing(bookmark)}
											>
												edit
											</p>
											<p className='inline divider'>/</p>
											<p
												className='inline delete'
												onClick={() => this.props.deleteBookmark(bookmark._id)}
											>
												delete
											</p>
										</div>
									</div>
								);
							})}
						</div>
						<div className='bookmarkGraphicLower' />
					</div>
				) : (
					<p>Add a bookmark to get started!</p>
				)}
			</div>
		);
	}
}

export default Show;

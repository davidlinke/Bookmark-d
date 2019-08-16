import React from 'react';

class Show extends React.Component {
	render() {
		return (
			<div className='bookmarkOuter'>
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
												// onClick={() => this.props.deleteBookmark(bookmark._id)}
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

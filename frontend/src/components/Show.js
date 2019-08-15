import React, { Component } from 'react';

class Show extends React.Component {
	render() {
		return (
			<div>
				<table>
					<tbody>
						{this.props.bookmarks.map(bookmark => {
							return (
								<tr key={'tr' + bookmark._id}>
									<td key={bookmark._id}> {bookmark.name}</td>
									<td key={bookmark._id}> {bookmark.url}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Show;

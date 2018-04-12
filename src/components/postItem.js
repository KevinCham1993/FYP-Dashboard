import React from 'react';

//This component renders each of the courses on the HomePage
const PostItem = (props) => {
	// console.log(props);
	return(
		<div className = 'threadItem grey lighten-4 row'>
			<div className = 'threadItem grey lighten-4 row'>
				<div className = 'threadTitle col s8'>
					{ props.post.post_text.replace("<co-content><text>", "").replace("</text></co-content>", "")}
				</div>
				<div className= 'threadViews col s2'>
					User<br/><b>{props.post.user}</b>
				</div>
				<div className= 'threadViews col s2'>
					Post Time<br/> <b>{props.post.post_time}</b>
				</div>
			</div>
		</div>
	);
}

export default PostItem;

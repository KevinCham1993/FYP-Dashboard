import React from 'react';
import ThreadItem from './threadItem';

//This component is a helper to render the list of Course Threads.
const ThreadList = (props) => {
	const threads = props.threads.map(thread => {
		return(
			<div key={thread.threadId} className = "threadListItem">
				<ThreadItem thread={thread} linkName={props.linkName} pageNum={props.pageNum}/>
			</div>
		);
	});
	return (
		<div>
			{threads}
		</div>
		);
}

export default ThreadList;
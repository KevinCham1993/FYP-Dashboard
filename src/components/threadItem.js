import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactTooltip from 'react-tooltip'

//helper for showing the text on Thread badges
const processBadge = (str) => {
	switch(str){
		case 'STAFF_RESPONDED':
			return 'Staff Replied';
			break;
		case 'STAFF_CREATED':
			return 'Staff Created';
			break;
		case 'INSTRUCTOR_CREATED':
			return 'Instructor Created';
			break;
		default:
			return '';
	}
}

//helper for rendering the Thread Badges
const threadBadge = (props) => {
	if(props.thread.answerBadge != '')
		if(props.thread.score > 0.5) {
			return (<span className= 'threadBadge chip ' style={{backgroundColor: '#ee6e73'}}>
					{processBadge(props.thread.answerBadge)}
				</span>);
		} else {
			return (<span className= 'threadBadge chip'>
					{processBadge(props.thread.answerBadge)}
				</span>);
		}
}

//Component for each of the thread items in the list of the Course Threads
const ThreadItem = (props) => {
	var now_time = moment(new Date());
	console.log(props);
	var link_href = 'https://www.coursera.org/learn/' + 'python-databases' + '/discussions/all/threads/' + props.thread.threadId
	return(
			<div className = 'threadItem grey lighten-4 row'>
				<Link to={`/course/${props.thread.courseId}/${props.pageNum}/${props.thread.threadId}/1`} >
					<span className = 'threadTitle col s9 truncate'>
						{ props.thread.title }
						<br />
						{props.thread.content == '' ? null : <span className='content'><i className="material-icons tiny icon">subdirectory_arrow_right</i>{props.thread.content.split(/<.*?>/).join('')}</span>}
					</span>
				</Link>
				<span className= 'threadViews col s1'>
					<b>{props.thread.viewCount}</b> <br/>views
				</span>
				<span className= 'threadViews col s1'>
					<b>{props.thread.totalAnswerCount}</b> <br/> replies
				</span>
				<span className= 'threadViews col s1'>
					<b>{props.thread.score.toFixed(3)}</b> <br/> <b data-tip="hello world">score</b><ReactTooltip />
				</span>
				<br />
					<a href={link_href}>
						<div className='col s12'>
						{threadBadge(props)}
						<span className = 'threadBy'>
							{moment(props.thread.lastAnsweredAt).isValid() ?
								'Last posted ' : 'Created '}
						</span>
						<span className = 'threadBy'>
							{moment(props.thread.lastAnsweredAt).isValid() ?
								moment.duration(now_time.diff(moment(props.thread.lastAnsweredAt))).humanize() :
								moment.duration(now_time.diff(moment(props.thread.createdAt))).humanize()
							} ago
						</span>
					</div>
				</a>
			</div>
	);
}

export default ThreadItem;

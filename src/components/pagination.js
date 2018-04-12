
import React from 'react';
import { Link } from 'react-router-dom';

//Component for pagination on the CourseThreads component/page
const Pagination = (props) => {
	var li_holder = [];
	console.log
	for (var i = 1; i <= (props.numberOfPages < 10 ? props.numberOfPages : 10); i++) {
		li_holder.push(<li className={props.currentPage == i ? 'active' : ''}><Link to={`${props.link}/${i}`}>{i}</Link></li>);
	}
	return (
		<div>
		<li className={props.currentPage > 1 ? 'waves-effect' : 'disabled'}><Link to={`${props.link}/${parseInt(props.currentPage)-1}`}><i className="material-icons">chevron_left</i></Link></li>
		{li_holder}
		<li className={props.currentPage < props.numberOfPages ? 'waves-effect' : 'disabled'}><Link to={`${props.link}/${parseInt(props.currentPage)+1}`}><i className="material-icons">chevron_right</i></Link></li>
		</div>
	);
}


export default Pagination;
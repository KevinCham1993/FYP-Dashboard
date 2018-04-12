import React from 'react';
import { Link } from 'react-router-dom';

//This component renders each of the courses on the HomePage
const CourseItem = (props) => {
	// console.log("debug: " + props.courseName)
	return(
		<Link to={`/course/${props.id}/1`} >
		<div className = 'courseItem'>
			<span className = 'courseName'>
				{ props.courseName }
			</span>
			<br />
			<span className='univ'>
				{props.univ}
			</span>
		</div>
		</Link>
	);
}

export default CourseItem;

import React from 'react';
import CourseItem from './courseItem';

//CourseList component is to render the list of Components using the CourseItem Component
//on the home page
const CourseList = (props) => {
	const courses = props.courses.map(course => {
		return(
			<div className = "courseListItem" key={course.courseId}>
				<CourseItem key = {course.courseId} id={course.courseId} courseName={course.courseId == "eQJvsjn9EeWJaxK5AT4frw" ? 'Using Databases with Python' : course.courseId} univ={course.courseId == "eQJvsjn9EeWJaxK5AT4frw" ? "University of Michigan" : "NUS"} />
			</div>
		);
	});
	return (
		<div>
			{courses}
		</div>
		);
}

export default CourseList;

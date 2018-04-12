import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import CourseList from './courseList'
import Loading from './loading';

//This component is for the home page which lists the Courses
export default class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = { courses : [], isLoading : true}
  }

  componentWillMount(){
    axios.get('http://localhost:8000/courses')
      .then(response => this.setState({courses : response.data}));
  }

  componentDidMount(){
      this.setState({isLoading : false});
    }

  render() {
    return ( this.state.isLoading ? <Loading/> :
      <div>
        <Navbar />
        <h3 className = "courseHeading"> List of Courses </h3>
        <div className = "courseList">
          <CourseList courses = {this.state.courses} />
        </div>

      </div>
    );
  }
}

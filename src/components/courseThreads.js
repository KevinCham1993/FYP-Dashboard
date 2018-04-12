import React from 'react';
import Navbar from './navbar';
import axios from 'axios';
import ThreadList from './threadList';
import { Link } from 'react-router-dom';
import Loading from './loading';
import Pagination from './pagination';
import {Tab, Tabs} from 'react-toolbox';

//This component lists the Threads for the Course Page
export default class CourseThreads extends React.Component {
	constructor(props) {
    	super(props);

    	this.state = { threads : [], courseInfo:{}, isLoading:true, index: 0, all_threads: []};
			this.handleTabChange = this.handleTabChange.bind(this);
  	}

  	//Get the list of Course Thread information from the server - using Axios library
  	componentWillMount(){
  		var params_id = this.props.match.params.id;
			// console.log("debug: ", params_id);
  		axios.get('http://localhost:8000/api/' + params_id)
				.then(response => {this.setState({threads : response.data}); console.log(response.data)  })
				.then(() => this.setState({all_threads : this.state.threads}));
      axios.get('http://localhost:8000/courses')
      	.then(response => this.setState({courseInfo : response.data.filter(function(data){ return data.courseId == params_id })[0]}));
  	}

  	//After Mounting the Component - render the page removing the 'Loading' page
  	componentDidMount(){
  		this.setState({isLoading : false});
  	}

		//for change of tabs for thread ordering/filtering
  	handleTabChange(index_num){
	    this.setState({index : index_num});
	    switch(index_num){
	    	//--------------top-------
	    	case 0:
	    	this.setState({threads : this.state.all_threads.sort((a, b) => {return b.score - a.score})});
	    		console.log(this.state.threads);
	    	break;

	    	//--------------latest-------
	    	case 1:

	    		this.setState({threads : this.state.all_threads.sort((a, b) => {return (b.lastAnsweredAt > b.createdAt ? b.lastAnsweredAt : b.createdAt) - (a.lastAnsweredAt > a.createdAt ? a.lastAnsweredAt : a.createdAt)})});
	    		console.log(this.state.threads);
	    	break;

	    	//--------------unanswered-------
	    	case 2:
	    		var threads = this.state.threads;

	    		var last_answered_only = threads.filter(function (entry) {
				    return (entry.totalAnswerCount == 0);
				});
	    		this.setState({threads : last_answered_only.sort((a, b) => {return (b.lastAnsweredAt > b.createdAt ? b.lastAnsweredAt : b.createdAt) - (a.lastAnsweredAt > a.createdAt ? a.lastAnsweredAt : a.createdAt)})});
	    	break;
	    }
	  };

	render() {
		return ( this.state.isLoading ? <Loading/> :
			<div>
				<Navbar />
				<div className="row">
					<div className="link_icon col s2">
						<Link className='link_back' to='/'><i className="material-icons medium icon">arrow_back</i></Link>
				    </div>
				    <div className="courseThreads col s8">
				    	<h4> Course Threads <i className="material-icons">chevron_right</i> {this.state.courseInfo.courseId == "eQJvsjn9EeWJaxK5AT4frw" ? 'Using Databases with Python' : this.state.courseInfo.courseId} </h4>
							<Tabs className = 'tabs' index={this.state.index} onChange={this.handleTabChange}>
				          <Tab label='TopScore'></Tab>
				          <Tab label='Latest' onActive={this.handleActive}></Tab>
				          <Tab label='Unanswered'></Tab>
				        </Tabs>
				    	<div className = "threadList">
	          				<ThreadList threads = {this.state.threads.slice((this.props.match.params.num-1)*10,this.state.threads.length > this.props.match.params.num*10 ? this.props.match.params.num*10: this.state.threads.length)} linkName={this.state.courseInfo.linkName} pageNum={this.props.match.params.num} />
	        			</div>
	        			<div className = 'pagination_component'>
	        			  <ul className="pagination">
	        			  	<Pagination numberOfPages={Math.ceil(this.state.threads.length/10)} link={`/course/${this.props.match.params.id}`} courseId={this.props.match.params.id} currentPage={this.props.match.params.num}/>
						  </ul>
						</div>
				    </div>
				</div>
		    </div>
		);
	}
}

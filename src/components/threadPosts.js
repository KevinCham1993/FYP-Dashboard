import React from 'react';
import Navbar from './navbar';
import axios from 'axios';
import PostList from './postList';
import { Link } from 'react-router-dom';
import Loading from './loading';
import Pagination from './pagination';

//This component lists the Threads for the Course Page
export default class ThreadPosts extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = { threadId: null, courseId: null, pageNum: null, posts: [], courseInfo: {}, isLoading:true}
  	}

  	//Get the list of Course Thread information from the server - using Axios library
  	componentWillMount(){

  		var thread_id = this.props.match.params.thread_id;
  		var course_id = this.props.match.params.course_id;
  		var page_num = this.props.match.params.page_num;
  		this.setState({threadId: thread_id});
  		this.setState({courseId: course_id});
  		this.setState({pageNum: page_num});

  		var id = course_id + '~' + thread_id;
  		// 
  		axios.get('http://localhost:8000/api/thread/' + id)
      		.then(response => {
      			this.setState({posts : response.data});
      			console.log(this.state.posts);
      		});

      	axios.get('http://localhost:8000/courses')
      		.then(response => this.setState({courseInfo : response.data.filter(function(data){ return data.courseId == course_id })[0]}));
  	}

  	//After Mounting the Component - render the page removing the 'Loading' page
  	componentDidMount(){
  		this.setState({isLoading : false});
  	}

	render() {
		return ( this.state.isLoading ? <Loading/> :
			<div>
				<Navbar />
				<div className="row">
					<div className="link_icon col s2">
						<Link className='link_back' to={`/course/${this.state.courseId}/${this.state.pageNum}`}><i className="material-icons medium icon">arrow_back</i></Link>
				    </div>
				    <div className="courseThreads col s8">
				    	<h4> Thread Posts <i className="material-icons">chevron_right</i> {this.state.courseId == null ? 'Error - 404' : this.state.courseId} <i className="material-icons">chevron_right</i>{this.state.threadId}</h4>
				    	<div className = "threadList">
	          				<PostList posts = {this.state.posts.slice((this.props.match.params.num-1)*10, this.state.posts.length > this.props.match.params.num*10 ? this.props.match.params.num*10: this.state.posts.length)} postPageNum={this.props.match.params.num} />
	        			</div>
	        			<div className = 'pagination_component'>
	        			  <ul className="pagination">
	        			  	<Pagination numberOfPages={Math.ceil(this.state.posts.length/10)} link={`/course/${this.state.courseId}/${this.state.pageNum}/${this.state.threadId}`} currentPage={this.props.match.params.num}/>
						  </ul>
						</div>
				    </div>
				</div>
			</div>
		);
	}
}

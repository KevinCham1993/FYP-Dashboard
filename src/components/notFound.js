import React from 'react';
import { Link } from 'react-router-dom';

//This page is rendered if a non-existent page is queried by the client/browser
export default class NotFound extends React.Component {
  render() {
    return (
      <div className="notFound">
        <h1>404</h1>
        <h2>Page not found!</h2>
        <p>
          <Link to="/">Go back to the main page</Link>
        </p>
      </div>
    );
  }
}

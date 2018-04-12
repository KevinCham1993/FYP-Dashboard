import React from 'react';

//This component is for the Navigation Bar at the top of the page
export default class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
            <a href ="/" className="brand-logo center font-logo-bold">Coursera Dashboard</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="http://wing.comp.nus.edu.sg/test/?page_id=19" target="_blank">About</a></li>
          </ul>
        </div>
    </nav>
    );
  }
}

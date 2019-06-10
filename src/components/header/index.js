import React, { Component } from 'react';
//import './index.scss';
import PropTypes from 'prop-types';

class header extends Component {
  render() {
    return (
      <header>
      	<div className="container">
        	<h1>{this.props.name}</h1>
        </div>
      </header>
    );
  }
}

header.propTypes = {
  name: PropTypes.string.isRequired
}

export default header;

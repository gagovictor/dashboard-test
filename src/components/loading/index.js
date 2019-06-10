import React, { Component } from 'react';
import './index.scss';

class footer extends Component {
  render() {
    return (
    	<div className="loading-label">
      		<h4 className="loading-label">
    			<div className="loading-icon lds-dual-ring"></div> Loading...
    		</h4>
    	</div>
    );
  }
}

export default footer;

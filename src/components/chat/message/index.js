import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

class chatMessage extends Component {
	constructor(props) {
		super(props);
        this.style = {
        };
	}

 	render() {
        const content = this.props.content;
		return (
            <div className={"row message" + (content.displayPortraitLeft ? " portrait-left " : " ")}>
                <div className="container">
                    <div class="content">
                        <h4>{content.userName}</h4> <span>{content.time}</span>
                        <p>{content.message}</p>
                    </div>
                    <div class={"portrait" + (content.me ? " me" : "")}>
                        {content.portrait && (<img src={content.portrait} alt={content.userName} />)}
                    </div>
                </div>
            </div>
   		);
 	}
}

chatMessage.propTypes = {
  content: PropTypes.object.isRequired
}

export default chatMessage;

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './index.scss';
import Loading from '../loading';

class widget extends Component {
	constructor(props) {
		super(props);
        this.state = {
            isLoading : true,
            data: [],
            error: null
        };
        this.style = {
            backgroundColor: this.props.header.color,
            backgroundImage: 'url(' + this.props.header.icon + ')'
        }
	}

 	render() {
        const header = this.props.header;
        const { isLoading, data, error } = this.state;
		return (
    		<div className={"widget" + (isLoading ? " loading" : "")}>
                {error && <p>{error.message}</p>}
                {!isLoading ? (
                    <div className="row">
                        <div className="icon" style={this.style}>
                        </div>
                        <div className="container">
                            <h2 className="row">{eval("data."+header.key)}</h2>
                            <h4 className="row">{header.title}</h4>
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}
        	</div>
   		);
 	}

    // Processa requisições à API
    componentDidMount() {
        this.fetchData();
    }

    // Resgata dados da API
    fetchData()
    {
        const wid = this;
        const data = this.props.data;
        fetch(this.props.api_url).
        then(function(response)
        {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1)
            {
                return response.json().then(function(json)
                {
                    wid.setState({
                        data: json,
                        isLoading: false,
                    });
                });
            } else {
                this.setState({ error : true, isLoading : false})
            }
        })
        .catch(error => this.setState({ error, isLoading : false }));
    }

}

widget.propTypes = {
  api_url: PropTypes.string.isRequired,
  header: PropTypes.object.isRequired
}

export default widget;

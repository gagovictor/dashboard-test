import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import ChatIcon from '../../assets/images/4all_chat_icon.jpg';
import ChatMessage from './message';
import Loading from '../loading';

class chat extends Component {
	constructor(props)
	{
		super(props);
        this.state = {
            isLoading : true,
            isSending : false,
            highlightInput : false,
            data: [],
            error: null
        };
        this.conversationContainer = React.createRef();
        this.messageInput = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

	loadMessages = () => {
		if(this.state.isLoading)
			return (<Loading />);

	    let conversation = []

	    for (let i = 0; i < this.state.data.length; i++)
	      conversation.push(<ChatMessage content={this.state.data[i]} key={"chat-message-"+i} />);

	    return conversation;
	}

    // Processa requisições à API
    componentDidMount() {
        this.fetchData();
    }

    // Resgata dados da API
    fetchData()
    {
        const chat = this;
        const data = this.props.data;
        fetch(this.props.api_url).
        then(function(response)
        {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1)
            {
                return response.json().then(function(json)
                {
                    chat.setState({
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

    handleChange(event) {
        this.setState({value: event.target.value, highlightInput : false });
    }

    handleSubmit(event)
    {
        event.preventDefault();

        if(this.state.isSending)
            return;

        const chat = this;

        if(chat.state.value == null || chat.state.value == '')
        {
            chat.messageInput.current.focus();
            chat.setState({ highlightInput : true });
            return;
        }

        chat.setState({ isSending : true });
        fetch(chat.props.api_url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: chat.state.value,
          })
        }).
        then(function(response)
        {
            chat.setState({ isSending : false });
            var contentType = response.headers.get("content-type");
            if(response.status == 201)
            {
                var newMessage = { userName: 'Eu', time: '1 min ago', message: chat.state.value, displayPortraitLeft: true, me: true};
                chat.setState({
                  data: [...chat.state.data, newMessage],
                  value: ''
                });
                chat.messageInput.current.focus();
                chat.conversationContainer.current.scrollTop = chat.conversationContainer.current.scrollHeight;
            } else {
                chat.setState({ error : true, isLoading : false})
            }
        })
        .catch(error => chat.setState({ error, isLoading : false }));
    }

	render()
	{
        const { isLoading, isSending, highlightInput, data, error } = this.state;
		return (
			<div id="chat" className="box" data-aos="fade-up">
				<div className="header row">
					<div className="chat-icon" style={{backgroundImage: 'url(' + ChatIcon + ')'}}></div>
					<h2>Chat</h2>
				</div>
				<hr className="row" />
				<div id="conversation" ref={this.conversationContainer}
                     className={isLoading ? "loading" : ""} >
					{this.loadMessages()}
				</div>
				<div className="row type">
					<form id="chat_input" onSubmit={this.handleSubmit} >
						<input type="text" name="message" placeholder="Type your message here..."
                               value={this.state.value} onChange={this.handleChange}
                               ref={this.messageInput}
                               className={highlightInput ? "highlighted" : ""} />
						<button type="submit" name="submit"
                               className={isSending ? "sending" : ""}>
                            {!isSending ? "Send" : "" }
                        </button>
					</form>
				</div>
			</div>
		);
  	}
}

chat.propTypes = {
  api_url: PropTypes.string.isRequired
}

export default chat;

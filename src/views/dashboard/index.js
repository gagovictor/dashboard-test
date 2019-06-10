import React, { Component } from 'react';
import Widget from '../../components/widget';
import wIconNewOrders from '../../assets/images/4all_db_icon01.jpg';
import wIconComments from '../../assets/images/4all_db_icon02.jpg';
import wIconNewUsers from '../../assets/images/4all_db_icon03.jpg';
import wIconPageviews from '../../assets/images/4all_db_icon04.jpg';
import SiteTrafficOverview from '../../components/siteTrafficOverview';
import Chat from '../../components/chat';

class dashboard extends Component {

	constructor(props) {
		super(props);
        this.widgets = {
            api_url : 'http://dev.4all.com:3050/widgets',
			new_orders : {
				title : 'New Orders',
                color : '#30a5ff',
                icon : wIconNewOrders,
                key : 'newOrders'
			},
            comments : {
            	title : 'Comments',
                color : '#ffb53e',
                icon : wIconComments,
                key : 'comments'
            },
            new_users : {
                title : 'New Users',
                color : '#1ebfae',
                icon : wIconNewUsers,
                key : 'newUsers'
            },
            page_views : {
                title : 'Page Views',
                color : '#f9243f',
                icon : wIconPageviews,
                key : 'pageViews'
            }
		};
        this.graph = {
            api_url : 'http://dev.4all.com:3050/pageViews'
        }
        this.chat = {
            api_url : 'http://dev.4all.com:3050/messages'
        };
	}

 	render() {
		return (
    		<div id="dashboard">
                <section className="space">
                    <div className="container widgets" data-aos="fade-up">
                    <Widget api_url={this.widgets.api_url} header={this.widgets.new_orders} />
                    <Widget api_url={this.widgets.api_url} header={this.widgets.comments} />
                    <Widget api_url={this.widgets.api_url} header={this.widgets.new_users} />
                    <Widget api_url={this.widgets.api_url} header={this.widgets.page_views} />
                    </div>
                </section>
                <section className="row space">
                    <div className="container">
                        <SiteTrafficOverview api_url={this.graph.api_url} />
                    </div>
                </section>
                <section className="row space">
                    <div className="container">
                        <Chat api_url={this.chat.api_url} />
                    </div>
                </section>
        	</div>
   		);
 	}

}

export default dashboard;

import React, { Component } from 'react';
import Chart from "chart.js";
import PropTypes from 'prop-types';
import 'chart.js/dist/Chart.css';
import './index.scss';
import Loading from '../loading';

class siteTrafficOverview extends Component {

	constructor(props) {
		super(props);
		this.state = {
            isLoading : true,
            data: [],
            error: null
		};
	}

 	render() {
        const { isLoading, data, error } = this.state;
		return (
    		<div className="graph box" id="traffic-overview" data-aos="fade-up">
                <div className="container">
                    <div className="row">
                        <h2>Site Traffic Overview</h2>
                    </div>
                    <hr className="row" />
                    <div className={"row graph-wrapper" + (isLoading ? " loading" : "")} >
                    {error ? <p>{error.message}</p> : null}
                    {!isLoading ? (
                        <canvas id="chart"></canvas>
                    ) : (
                        <Loading />
                    )}
                    </div>
                </div>
            </div>
   		);
 	}

    // Processa requisições à API
    componentDidMount() {
        this.fetchData();
    }

    // Resgata dados da API e inicializa grafico
    fetchData()
    {
        var chart = this;
        fetch(this.props.api_url).then(function(response)
        {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1)
            {
                return response.json().then(function(json)
                {
                    chart.setState({
                        data: json,
                        isLoading: false,
                    });
                    chart.mountGraph();
                });
            } else {
                this.setState({ error : true, isLoading : false})
            }
        })
        .catch(error => this.setState({ error, isLoading : false }));
    }

    // Inicializa grafico
    mountGraph()
    {
        if(!document.querySelector('#chart'))
            return;

        // Processa dados recebidos da API
        const { isLoading, data, error } = this.state;

        // Objeto dataSets contém os dados retornados da API
        // reordenados para utilização pelo gráfico.
        var x;
        var i = 1;
        var dataSets = Array();
        dataSets[0] = Object.keys(data[0]);
        for(var k in data[0])
        {   // Loop chaves
            dataSets[i] = new Array();
            for(var x in data)
            {   // Loop valores
                dataSets[i].push(data[x][k]);
            }
            i++;
        }

        // Inicialização chart.js
        Chart.defaults.global.pointHitDetectionRadius = 1;
        Chart.defaults.global.legend = false;
        var lineChartData = {
            labels: dataSets[1],
            datasets: [{
                label: "Page Views",
                borderColor: '#30a4ff',
                pointBackgroundColor: '#30a4ff',
                backgroundColor: 'rgba(48, 164, 255, 0.3)',
                fill: true,
                borderWidth: 2,
                pointBorderWidth: 1.5,
                pointBorderColor: "#ffffff",
                data: dataSets[2],
            }]
        };

        var chartEl = document.getElementById('chart');
        this.graph = new Chart(chartEl, {
            type: 'line',
            data: lineChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    enabled: true,
                    mode: 'index',
                    position: 'nearest',
                    backgroundColor: '#ffffff',
                    cornerRadius: 0,
                    xPadding: 15,
                    yPadding: 15,
                    titleFontFamily: "'Gotham', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    bodyFontFamily: "'Gotham', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    titleFontColor: '#111111',
                    bodyFontColor: '#111111'
                }
            }
        });
    }
}

siteTrafficOverview.propTypes = {
  api_url: PropTypes.string.isRequired
}

export default siteTrafficOverview;

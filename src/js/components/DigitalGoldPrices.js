import React, { Component } from 'react';
import axios from 'axios';
import utility from '../renderer/Utility';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { Button } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import DateAdapter from '@material-ui/lab/AdapterMoment';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';

export default class DigitalGoldPrices extends Component {
    state = {}
    config = require('../../config').configs

    updateChartData = (days) => {
        let getPricesUrl = utility.FormatString(this.config.getPricesUrl, [days])
        axios.get(getPricesUrl)
             .then(results => {
                var priceData = [];
                var minimumPrice = 99999999999, maximumPrice = 0

                for(let i=0; i<results.data.length; i++) {
                    var openPrice = Number(results.data[i].openPrice);
                    var highestPrice = Number(results.data[i].highestPrice);
                    var lowestPrice = Number(results.data[i].lowestPrice);
                    var closePrice = Number(results.data[i].closePrice);

                    priceData.push({ label: results.data[i].date, y: [ openPrice, highestPrice, lowestPrice, closePrice ] });

                    minimumPrice = Math.min(minimumPrice, lowestPrice);
                    maximumPrice = Math.max(maximumPrice, highestPrice);

                }

                this.setState({
                    isLoaded: true,
                    price: priceData,
                    minimumPrice: minimumPrice - 100,
                    maximumPrice: maximumPrice + 100,
                })
            })
    }

    refreshHandler = () => {
        axios.post(this.config.savePricesUrl)
            .then(() => this.updateChartData(100))
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        }
    }

    componentDidMount() {
        this.updateChartData(100)
    }

    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            zoomEnabled: true,
            theme: "light2", // "dark2"
            title:{
                text: "MMTC PAMP Gold Prices"
            },
            axisY: {
                title: "Rate(per 1g)",
                suffix: "₹",
                minimum: this.state.minimumPrice,
                maximum: this.state.maximumPrice,
            },
            axisX: {
                title: "Date",
                interval: 7
            },
            toolTip: {
                shared: true
            },
            data: [
                {
                    type: "candlestick",
                    name: "Actual prices",
                    tooltip: "{label}: {y}",
                    dataPoints: this.state.price,
                }
            ]
        };

        return (
            <div>
                {
                    this.state.isLoaded &&
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                title='Refresh' variant='contained' startIcon={<Refresh/>}
                                style={{color: 'green', fontSize: '20px', background: 'white'}}
                                onClick={() => this.refreshHandler()}>
                                Refresh
                            </Button>
                        </div>

                        <CanvasJSChart options = {options} /> <br/>

                        <div>
                            <Button
                                title='1w' variant='outlined'
                                onClick={() => this.updateChartData(7)} >
                                1w
                            </Button>

                            <Button
                                title='1m' variant='outlined'
                                onClick={() => this.updateChartData(30)} >
                                1m
                            </Button>

                            <Button
                                title='6m' variant='outlined'
                                onClick={() => this.updateChartData(180)} >
                                6m
                            </Button>

                            <Button
                                title='1y' variant='outlined'
                                onClick={() => this.updateChartData(365)} >
                                1y
                            </Button>
                        </div>
                    </div>
                }
            </div>
        );
    };
}

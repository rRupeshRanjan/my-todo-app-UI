import React, { Component } from 'react';
import axios from 'axios';
import utility from '../renderer/Utility';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { Button, TextField, InputAdornment } from '@material-ui/core';
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
                var priceData = [], buyPrices = [], sellPrices = [];
                var minimumPrice = 99999999999, maximumPrice = 0
                var minimumDate = '', maximumDate = ''

                for(let i=0; i<results.data.length; i++) {
                    var currPrice = Number(results.data[i].price);
                    var buyPrice = Number((currPrice * 1.03).toFixed(2));
                    var sellPrice = Number((currPrice / 1.03).toFixed(2));
                    var currDate = results.data[i].date;

                    priceData.push({ label: currDate, y: currPrice });
                    buyPrices.push({ label: currDate, y: buyPrice });
                    sellPrices.push({ label: currDate, y: sellPrice });

                    minimumPrice = Math.min(minimumPrice, sellPrice);
                    maximumPrice = Math.max(maximumPrice, buyPrice);

                    if(i === 0)
                        minimumDate = currDate;
                    else if(i === results.data.length-1)
                        maximumDate = currDate;
                }

                this.setState({
                    isLoaded: true,
                    price: priceData,
                    buyPrices: buyPrices,
                    sellPrices: sellPrices,
                    minimumPrice: minimumPrice - 100,
                    maximumPrice: maximumPrice + 100,
                    minimumDate: utility.ConvertStringToDate(minimumDate),
                    maximumDate: utility.ConvertStringToDate(maximumDate),
                    buyDate: minimumDate,
                    sellDate: maximumDate,
                    weight: 0
                })

                this.setProfit()
            })
    }

    setProfit = () => {
        axios.get(utility.FormatString(this.config.pnlCalculateUrl, [this.state.buyDate, this.state.sellDate]))
             .then(results => this.setState({ profit: Number(results.data.PnL * this.state.weight).toFixed(2) }));
    }

    setSellDate = (date) => {
        this.setState({
            sellDate: utility.ConvertDateFormat(date, "YYYY-MM-DD")
        })
    }

    setBuyDate = (date) => {
        this.setState({
            buyDate: utility.ConvertDateFormat(date, "YYYY-MM-DD")
        })
    }

    setWeight = (event) => {
        this.setState({
            weight: event.target.value
        })
    }

    refreshHandler = () => {
        axios.post(this.config.savePricesUrl)
            .then(() => this.updateChartData())
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            type: "line"
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
            theme: "light1", // "dark2"
            title:{
                text: "Historical Gold Prices"
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
                    type: this.state.type,
                    name: "Actual prices",
                    tooltip: "{label}: {y}",
                    dataPoints: this.state.price,
                },
                {
                    type: this.state.type,
                    name: "Buying prices",
                    tooltip: "{label}: {y}",
                    dataPoints: this.state.buyPrices,
                },
                {
                    type: this.state.type,
                    name: "Selling prices",
                    tooltip: "{label}: {y}",
                    dataPoints: this.state.sellPrices,
                },
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
                        <br/>

                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DatePicker
                                label="Buy Date"
                                value={this.state.buyDate}
                                minDate={this.state.minimumDate}
                                maxDate={utility.ConvertStringToDate(this.state.sellDate)}
                                onChange={(newValue) => this.setBuyDate(newValue)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DatePicker
                                label="Sell Date"
                                value={this.state.sellDate}
                                minDate={utility.ConvertStringToDate(this.state.buyDate)}
                                maxDate={this.state.maximumDate}
                                onChange={(newValue) => this.setSellDate(newValue)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <TextField
                            label="Quantity"
                            value={this.state.weight}
                            onChange={(newValue) => this.setWeight(newValue)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                            }}
                        />

                        <Button
                            title='Calculate PnL' variant='outlined'
                            onClick={() => this.setProfit()} >
                            Calculate PnL
                        </Button>

                        <br/><br/>
                        <div style={{ padding: '10px', borderTop: '1px solid blue', fontSize: '18px', fontWeight: 'bold' }}>
                            Your PnL: {this.state.profit}
                        </div>
                    </div>
                }
            </div>
        );
    };
}

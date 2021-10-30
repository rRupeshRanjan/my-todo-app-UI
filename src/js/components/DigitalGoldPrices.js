import React, { Component } from 'react';
import axios from 'axios';
import utility from '../renderer/Utility';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { Button, TextField } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import DateAdapter from '@material-ui/lab/AdapterMoment';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';

export default class DigitalGoldPrices extends Component {
    state = {}

    updateChartData = (results) => {
        var priceData = [], buyPrice = [], sellPrice = [];
        var minimumPrice = 99999999999, maximumPrice = 0;
        var minimumDate = '', maximumDate = '';

        for(let i=0; i<results.data.length; i++) {
            var currPrice = Number(results.data[i].price);
            var currDate = results.data[i].date;

            priceData.push({ label: currDate, y: currPrice });
            buyPrice.push({ label: currDate, y: currPrice * 1.03 });
            sellPrice.push({ label: currDate, y: currPrice / 1.03 });

            minimumPrice = Math.min(minimumPrice, currPrice / 1.03);
            maximumPrice = Math.max(maximumPrice, currPrice * 1.03);

            if(i === 0)
                minimumDate = currDate;
            if(i === results.data.length-1)
                maximumDate = currDate;
        }

        this.setState({
            price: priceData,
            buyPrice: buyPrice,
            sellPrice: sellPrice,
            minimumPrice: minimumPrice - 100,
            maximumPrice: maximumPrice + 100,
            minimumDate: utility.ConvertStringToDate(minimumDate),
            maximumDate: utility.ConvertStringToDate(maximumDate),
            buyDate: minimumDate,
            sellDate: maximumDate,
            isLoaded: true,
        });
        this.setProfit();
    }

    setProfit = () => {
        axios.get(`http://localhost:8080/pnl/calculatePnl?buyDate=${this.state.buyDate}&sellDate=${this.state.sellDate}`)
            .then(results => this.setState({ profit: results.data.PnL.toFixed(2) }));
    }

    setSellDate = (date) => {
        this.setState({ sellDate: utility.ConvertDateFormat(date, "YYYY-MM-DD") });
    }

    setBuyDate = (date) => {
        this.setState({ buyDate: utility.ConvertDateFormat(date, "YYYY-MM-DD") });
    }

    refreshHandler = () => {
        axios.post(`http://localhost:8080/digital-gold-prices/save-historical-prices`)
            .then(() => axios.get(`http://localhost:8080/digital-gold-prices/get-historical-prices`))
            .then(results => this.updateChartData(results));
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            type: "line",
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/digital-gold-prices/get-historical-prices`)
            .then(results => this.updateChartData(results));
    }

    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            zoomEnabled: true,
            theme: "dark1", // "light1", "dark1", "dark2"
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
                interval: 1
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
                    dataPoints: this.state.buyPrice,
                },
                {
                    type: this.state.type,
                    name: "Selling prices",
                    tooltip: "{label}: {y}",
                    dataPoints: this.state.sellPrice,
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

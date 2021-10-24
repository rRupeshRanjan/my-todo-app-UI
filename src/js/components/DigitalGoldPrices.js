import React, { Component } from 'react';
import axios from 'axios';
import {CanvasJSChart} from 'canvasjs-react-charts';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import utility from '../renderer/Utility';
import moment from 'moment'

export default class DigitalGoldPrices extends Component {
    state = {}

    getProfit = () => {
        console.log("buy date", this.state.buyDate);
        console.log("sell date", this.state.sellDate);

        var buyPrice = 0, sellPrice = 0;
        for(const item of this.state.buyPrice) {
            if(item.label === this.state.buyDate) {
                buyPrice = item.y;
                break;
            }
        }

        for(const item of this.state.sellPrice) {
            if(item.label === this.state.sellDate) {
                sellPrice = item.y;
                break;
            }
        }

        this.setState({ profit: sellPrice - buyPrice });
        console.log(this.state);
    }

    setSellDate = (date) => {
        this.setState({ sellDate: utility.ConvertDateFormat(date, "YYYY-MM-DD") });
        this.getProfit();
    }

    setBuyDate = (date) => {
        this.setState({ buyDate: utility.ConvertDateFormat(date, "YYYY-MM-DD") });
        this.getProfit();
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
            .then(results => {
                var priceData = [], buyPrice = [], sellPrice = [];
                var minimumPrice = 99999999999, maximumPrice = 0;
                var minimumDate = '', maximumDate = '';

                for(let i=0; i<results.data.length; i++) {
                    var currPrice = Number(results.data[i].price);
                    var currDate = results.data[i].date;

                    priceData.push({ label: currDate, y: currPrice });
                    buyPrice.push({  label: currDate, y: currPrice * 1.03 });
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
                    minimumDate: minimumDate,
                    maximumDate: maximumDate,
                    buyDate: minimumDate,
                    sellDate: maximumDate,
                    isLoaded: true,
                });
                this.getProfit();
            });
    }

    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            zoomEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
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
                    <CanvasJSChart options = {options} />
                    // TODO:: Add date inputs
                }
            </div>
        );
    };
}

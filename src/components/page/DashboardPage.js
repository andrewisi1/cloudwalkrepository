// src/components/page/DashboardPage.js

import React from 'react';
import PropTypes from 'prop-types';
import statsjson from '../../utils/stats.json'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AirlineSeatIcon from '@material-ui/icons/AirlineSeatFlat';
import ReportIcon from '@material-ui/icons/Report';

import { Sticker } from '@stickyboard/core';
import {
    LineChart,
    MultiLineChart,
    BarChart,
    StackedBarChart,
    ComposedChart,
    PieChart,
    RadarChart,
    AreaChart,
    ScatterChart,
    Treemap,
} from '@stickyboard/recharts';
import { NumberWidget } from '@stickyboard/number';
import { HeatMap } from '@stickyboard/openlayers';

import ApiManager from 'network/ApiManager';
import StatusCode from 'network/StatusCode';

import LocalStorageManager from 'manager/LocalStorageManager';

import PageBaseContainer from 'redux/containers/PageBaseContainer';

import LocalStorageConst from 'constants/LocalStorageConst';

const styles = (theme) => ({
    root: {},
});

const initialLayout = {
    lg: [
        { i: 'Status', x: 0, y: 0, w: 12, h: 1 },
        { i: 'Uptimeevents', x: 0, y: 1, w: 3, h: 2 },
        { i: 'Uptimenow', x: 3, y: 1, w: 3, h: 2 },
        { i: 'DowntimeEvents', x: 6, y: 1, w: 3, h: 2 },
        { i: 'DowntimeNow', x: 9, y: 1, w: 3, h: 2 },
        { i: 'UptimeGraphs', x: 3, y: 5, w: 3, h: 2 },
        { i: 'DowntimeGraphs', x: 6, y: 5, w: 3, h: 2 },
    ],
    md: [
        { i: 'Status', x: 0, y: 0, w: 12, h: 1 },
        { i: 'Uptimeevents', x: 0, y: 1, w: 3, h: 2 },
        { i: 'Uptimenow', x: 3, y: 1, w: 3, h: 2 },
        { i: 'DowntimeEvents', x: 6, y: 1, w: 3, h: 2 },
        { i: 'DowntimeNow', x: 9, y: 1, w: 3, h: 2 },
        { i: 'UptimeGraphs', x: 3, y: 5, w: 3, h: 2 },
        { i: 'DowntimeGraphs', x: 6, y: 5, w: 3, h: 2 },
    ],
    sm: [
        { i: 'Status', x: 0, y: 0, w: 8, h: 1 },
        { i: 'Uptimeevents', x: 0, y: 1, w: 4, h: 2 },
        { i: 'Uptimenow', x: 4, y: 1, w: 4, h: 2 },
        { i: 'DowntimeEvents', x: 0, y: 3, w: 4, h: 2 },
        { i: 'DowntimeNow', x: 4, y: 3, w: 4, h: 2 },
        { i: 'UptimeGraphs', x: 4, y: 7, w: 4, h: 2 },
        { i: 'DowntimeGraphs', x: 0, y: 9, w: 4, h: 2 },
    ],
    xs: [
        { i: 'Status', x: 0, y: 0, w: 6, h: 1 },
        { i: 'Uptimeevents', x: 0, y: 1, w: 3, h: 2 },
        { i: 'Uptimenow', x: 3, y: 1, w: 3, h: 2 },
        { i: 'DowntimeEvents', x: 0, y: 3, w: 3, h: 2 },
        { i: 'DowntimeNow', x: 3, y: 3, w: 3, h: 2 },
        { i: 'UptimeGraphs', x: 3, y: 7, w: 3, h: 2 },
        { i: 'DowntimeGraphs', x: 0, y: 9, w: 3, h: 2 },
    ],
    xxs: [
        { i: 'Status', x: 0, y: 0, w: 4, h: 1 },
        { i: 'Uptimeevents', x: 0, y: 1, w: 4, h: 3 },
        { i: 'Uptimenow', x: 0, y: 4, w: 4, h: 3 },
        { i: 'DowntimeEvents', x: 0, y: 7, w: 4, h: 3 },
        { i: 'DowntimeNow', x: 0, y: 10, w: 4, h: 3 },
        { i: 'UptimeGraphs', x: 0, y: 18, w: 4, h: 3 },
        { i: 'DowntimeGraphs', x: 0, y: 21, w: 4, h: 3 },
    ],
};

const initialBlocks = [
    { i: 'Status' },
    { i: 'Uptimeevents' },
    { i: 'Uptimenow' },
    { i: 'DowntimeEvents' },
    { i: 'DowntimeNow' },
    { i: 'UptimeGraphs' },
    { i: 'DowntimeGraphs' },
];
let statslabeldatajson = statsjson
class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

    }
    
    getDataJson = () => {
        statslabeldatajson = statsjson
        this.setState({
            statslabeldatajson: statslabeldatajson
        })
    setInterval(this.getDataJson, 1000)
    }

    componentDidMount() {
   //     ApiManager.CloudwalkMonitor.readBrief(this.readJson);
     //   this.readJson()
    this.getDataJson()
    setInterval(this.getDataJson, 1000)
    }
        
/*
    readJson = (statusCode, response) => {
        switch (statusCode) {
            case StatusCode.OK:
                var data;
                data = statsjson;
                statusLatestDict = {
                    Health: '',
                    Unhealth:'',
                    Timeout:'',
                    Uptime:''
                }
                statusLatestDict["Health"] = data.qththres
                statusLatestDict["Unhealth"] = data.qtunthres
                statusLatestDict["Timeout"] = data.qtimeout
                statusLatestDict["Uptime"] = data.qtuptime

                console.log("Estou aqui")

            this.setState({
                statusLatestDict: statusLatestDict
                });
                break;
            default:
                alert(response.msg);
                break;
        }
    };
  */ 
/*
    readLatestCallback = (statusCode, response) => {
        switch (statusCode) {
            case StatusCode.OK:
                let countryLatestDict = {};

                response.forEach((data) => {
                    const {
                        countryregion,
                        provincestate,
                        location,
                        confirmed,
                        deaths,
                        recovered,
                        lastupdate,
                    } = data;

                    // Extract country region list
                    let name = countryregion;
                    if (provincestate !== '') {
                        name += ` (${provincestate})`;
                    }

                    countryLatestDict[name] = {
                        name: name,
                        location: location,
                        confirmed: confirmed,
                        deaths: deaths,
                        recovered: recovered,
                        lastUpdate: lastupdate,
                    };
                });

                this.setState({
                    countryLatestDict: countryLatestDict,
                });
                break;
            default:
                alert(response.msg);
                break;
        }
    };

    readTimeseriesCallback = (statusCode, response) => {
        switch (statusCode) {
            case StatusCode.OK:
                let countryTimeseriesDict = {};

                // Sort country by name
                response.sort((a, b) => {
                    return `${a.countryregion}${a.provincestate}` <
                        `${b.countryregion}${b.provincestate}`
                        ? -1
                        : 1;
                });

                response.forEach((data) => {
                    const {
                        countryregion,
                        provincestate,
                        location,
                        timeseries,
                        lastupdate,
                    } = data;

                    // Extract country region list
                    let name = countryregion;
                    if (provincestate !== '') {
                        name += ` (${provincestate})`;
                    }

                    // Extract timeseries data for each country region
                    const timeseriesData = timeseries;
                    const convertedTimeseries = Object.keys(timeseriesData).map(
                        (key) => {
                            return {
                                ...timeseriesData[key],
                                date: key,
                            };
                        }
                    );

                    countryTimeseriesDict[name] = {
                        name: name,
                        location: location,
                        timeseries: convertedTimeseries,
                        lastUpdate: lastupdate,
                    };
                });

                this.setState({
                    countryTimeseriesDict: countryTimeseriesDict,
                });
                break;
            default:
                alert(response.msg);
                break;
        }
    };
*/
    titlestatus = 'Status'
    titlesuptime= 'Uptimeevents'
    titlesupnow= 'Uptimenow'
    titlesdownevt= 'DowntimeEvents'
    titlesdownnow= 'DowntimeNow'
    titlesupgraphs= 'UptimeGraphs'
    titlesdowngraphs= 'DowntimeGraphs'

    generateBlock = (block) => {
 
        const { theme } = this.props;

        const colors = theme.colors.colorArray;

        const inputDataLabel = statslabeldatajson;

        switch (block.i) {
            case 'Status':
                return (
                    <Sticker key={block.i}>
                        <div style={{ fontSize: 32, fontWeight: 'bold' }}>
                            Status
                             
                        </div>
                    </Sticker>
                );
            case 'Uptimeevents':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            backgroundColor={theme.colors.colorArray[0]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Uptime Events'}
                            value={inputDataLabel ? inputDataLabel.qththres: '-'}
                            unit={''}
                        />
                    </Sticker>
                );
            case 'Uptimenow':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            backgroundColor={theme.colors.colorArray[2]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Uptime Now'}
                            value={inputDataLabel ? inputDataLabel.qththres: '-'}
                            unit={''}
                        />
                    </Sticker>
                );
            case 'DowntimeEvents':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            backgroundColor={theme.colors.colorArray[1]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Downtime Events'}
                            value={inputDataLabel ? inputDataLabel.qtimeout: 
                                
                                
                                
                                '-'}
                            unit={''}
                        />
                    </Sticker>
                );
            case 'DowntimeNow':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            backgroundColor={theme.colors.colorArray[4]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Downtimenow'}
                            value={inputDataLabel ? inputDataLabel.qtunthres: '\n\n\n-'}
                            unit={'%'}
                        />
                    </Sticker>
                );
            case 'UptimeGraphs':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            backgroundColor={theme.colors.colorArray[5]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Up Time'}
                            value={inputDataLabel ? inputDataLabel.qtuptime: '-'}
                            unit={''}
                        />
                    </Sticker>
                );
            case 'DowntimeGraphs':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            backgroundColor={theme.colors.colorArray[4]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Down Time'}
                            value={inputDataLabel ? inputDataLabel.qtimeout: '-'}
                            unit={''}
                        />
                    </Sticker>
                );
                /*
            case 'LineChart':
                return (
                    <Sticker key={block.i}>
                        <MultiLineChart
                            data={inputDataLabel}
                            xAxisDataKey={'date'}
                            lineDataArray={[
                                {
                                    key: 'Uptime',
                                    name: 'Up Time',
                                    color: colors[2],
                                },
                                {
                                    key: 'Timeout',
                                    name: 'Down Time',
                                    color: colors[1],
                                },
                            ]}
                        />
                    </Sticker>
                );

                */
        }
    };

    render() {
        return (
            <PageBaseContainer
                generateBlock={this.generateBlock}
                initialLayout={initialLayout}
                initialBlocks={initialBlocks}
            />
        
        );
    
    }
}

DashboardPage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DashboardPage);

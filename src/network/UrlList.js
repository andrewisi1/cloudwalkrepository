// src/network/UrlList.js

const BASE_URL = 'https://google.com';

var UrlList = {
    CloudwalkMonitor: {
        getBriefUrl: () => {
            return `${BASE_URL}`;
        },
        /*
        getLatestUrl: () => {
            return `${API_BASE_URL}/latest`;
        },

        getTimeseriesUrl: () => {
            return `${API_BASE_URL}/timeseries`;
        },
    */},

}

module.exports = UrlList;

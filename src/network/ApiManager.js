import RestClient from './RestClient';
import UrlList from './UrlList';

const ApiManager = {
    CloudwalkMonitor : {
        readBrief: (callback) => {
            RestClient.sendGetRequest(UrlList.CloudwalkMonitor.getBriefUrl(), callback);
        },
 },
}

export default ApiManager;

// src/components/page/RiskRankingPage.js

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import { Sticker } from '@stickyboard/core';
import { TableWithPagination } from '@stickyboard/table';

import ApiManager from 'network/ApiManager';
import StatusCode from 'network/StatusCode';
import loggingjson from '../../utils/console.json'
import PageBaseContainer from 'redux/containers/PageBaseContainer';

const styles = (theme) => ({
    root: {},
});

const initialLayout = {
    lg: [{ i: 'RankingTable', x: 0, y: 0, w: 12, h: 15 }],
    md: [{ i: 'RankingTable', x: 0, y: 0, w: 12, h: 15 }],
    sm: [{ i: 'RankingTable', x: 0, y: 0, w: 12, h: 15 }],
    xs: [{ i: 'RankingTable', x: 0, y: 0, w: 12, h: 15 }],
    xxs: [{ i: 'RankingTable', x: 0, y: 0, w: 12, h: 15 }],
};



getLogging = () => {
    var Logging = React.createClass({
        render: function() {
            return <div><pre>{JSON.stringify(loggingjson, null, 2) }</pre></div>;
            React.render(<Hello />, document.getElementById('container'));

        }
    });
    }

const initialBlocks = [{ i: 'RankingTable' }];

class RiskRankingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Data
            sortedLatestList: [],
        };
    }



    componentDidMount() {
        this.interval = setInterval(() => this.setState( this.getLogging() ), 1000);    }

    generateBlock = (block, data) => {
        const { sortedLatestList } = data;
        const { theme } = this.props;

        const colors = theme.colors.colorArray;

        switch (block.i) {
            case 'RankingTable':
                return (
                    <Sticker key={block.i}>
                        <TableWithPagination
                            title={'Risk Ranking (Sorted by # of confirmed)'}
                            data={sortedLatestList}
                            rowsPerPage={10}
                        />
                    </Sticker>
                );
        }
    };

    render() {
        return (
            <PageBaseContainer
                data={this.state}
                getLogging={this.getLogging}
                generateBlock={this.generateBlock}
                initialLayout={initialLayout}
                initialBlocks={initialBlocks}
            />
        );
    }
}

RiskRankingPage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(RiskRankingPage);

// src/components/base/PageBase.js

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';

import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import TvIcon from '@material-ui/icons/Tv';

import { Board } from '@stickyboard/core';

import ApiManager from 'network/ApiManager';
import StatusCode from 'network/StatusCode';
import CookieManager from 'network/CookieManager';

import MessageSnackbar from 'components/ui/MessageSnackbar';

import Const from 'constants/Const';

const styles = (theme) => ({
    root: {
        backgroundColor: theme.colors.contentBackground,
    },
    menuContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'absolute',
        height: 120,
        right: 16,
        bottom: 16,
        zIndex: 2000,
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
});

class PageBase extends React.Component {
    constructor(props) {
        super(props);
        this.board = React.createRef();

        this.state = {
            currentBreakpoint: 'lg',
            layouts: undefined,
            blocks: undefined,
            isEditingMode: true,
            isMenuOpen: false,
        };
    }

    componentDidMount() {
        this.initializeLayout();
    }

    setInitialLayout = () => {
        this.setState({
            layouts: this.props.initialLayout,
            blocks: this.props.initialBlocks,
        });
    };

    initializeLayout = () => {
  
        this.setInitialLayout();
 
    };

    handleCloseMenu = () => {
        this.setState({ isMenuOpen: false });
    };

    handleOpenMenu = () => {
        this.setState({ isMenuOpen: true });
    };

    onSaveLayout = () => {
 
    };

    render() {
        const { layouts, blocks, isEditingMode, isMenuOpen } = this.state;
        const {
            classes,
            theme,
            data,
            generateBlock,
            messageSnackbar,
        } = this.props;

        if (!layouts || !blocks) {
            return null;
        }

        return (
            <div className={classes.root}>
                <Board
                    ref={this.board}
                    layouts={layouts}
                    onLayoutChange={(newLayouts) => {
                        console.log(JSON.stringify(newLayouts));
                        this.setState({ layouts: newLayouts });
                    }}
                    onSaveLayout={this.onSaveLayout}>
                    {blocks.map((block, index) => {
                        return generateBlock(block, data);
                    })}
                </Board>

                <div className={classes.menuContainer}>
                    <SpeedDial
                        ariaLabel="SpeedDial"
                        className={classes.speedDial}
                        icon={<MenuIcon />}
                        onClose={this.handleCloseMenu}
                        onOpen={this.handleOpenMenu}
                        open={isMenuOpen}
                        direction={'up'}>
                        <SpeedDialAction
                            icon={<EditIcon />}
                            tooltipTitle={'Toggle Edit mode'}
                            onClick={() => {
                                this.board.current.toggleEditingMode();
                            }}
                        />

                        <SpeedDialAction
                            icon={<TvIcon />}
                            tooltipTitle={'Toggle TV mode'}
                            onClick={() => {
                                this.board.current.toggleTvMode();
                            }}
                        />
                    </SpeedDial>
                </div>

                {/* Message Snackbar */}
                <MessageSnackbar
                    open={messageSnackbar.open}
                    message={messageSnackbar.message}
                />
            </div>
        );
    }
}

PageBase.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    generateBlock: PropTypes.func.isRequired,
    initialLayout: PropTypes.object.isRequired,
    initialBlocks: PropTypes.array.isRequired,
};

export default withStyles(styles, { withTheme: true })(PageBase);

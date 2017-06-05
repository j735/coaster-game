import React from 'react';

const GameOverlay = React.createClass({

    getInitialState: function () {

        return {
            notice: ''
        };
    },

    componentWillMount: function () {

        this.getState = this.props.getState;
        this.updateState = this.props.updateState;
        this.config = this.props.configData;
        this.pubsub = this.props.pubsub;
    },

    componentDidMount: function () {

        // Define component elements and make them available to object
        this.overlay = document.getElementById( 'game-overlay' );

        // Subscribe to custom events
        this.showOverlayToken = this.pubsub.subscribe( 'showOverlay', this.showOverlay );
        this.hideOverlayToken = this.pubsub.subscribe( 'hideOverlay', this.hideOverlay );
        this.cautionTimeToken = this.pubsub.subscribe( 'cautionTime', this.cautionTime );
        this.endTimeToken = this.pubsub.subscribe( 'endTime', this.endTime );
    },

    componentWillUnmount: function () {

        this.pubsub.unsubscribe( this.showOverlayToken );
        this.pubsub.unsubscribe( this.hideOverlayToken );
        this.pubsub.unsubscribe( this.cautionTimeToken );
        this.pubsub.unsubscribe( this.endTimeToken );
    },

    cautionTime: function () {

    },

    endTime: function () {

        this.setState( { notice: 'Time\'s up!' } );

        this.showOverlay();
    },

    btnClick: function () {

        this.pubsub.publish( 'nextButton' );
    },

    showOverlay: function () {

        this.overlay.classList.add( 'active' );
    },

    hideOverlay: function () {

        console.log('hideOverlay');

        this.overlay.classList.remove( 'active' );
    },

    render: function () {

        return (
            <div id="game-overlay">
                <div className="notice">{ this.state.notice }</div>
                <button id="next-btn" onMouseUp={ this.btnClick }>Next &rsaquo;</button>
            </div>
        );
    }
});

export default GameOverlay;

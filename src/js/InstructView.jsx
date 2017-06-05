import React from 'react';

const InstructView = React.createClass({

    componentWillMount: function () {

        this.config = this.props.configData;
        this.pubsub = this.props.pubsub;
        this.moveView = this.props.helpers.moveView;
        this.getView = this.props.helpers.getView;
    },

    componentDidMount: function () {

        this.instructView = document.getElementById( 'instruct-view' );
        this.gameView = document.getElementById( 'game-view' );

        // Subscribe to custom events
        this.swipeLeftToken = this.pubsub.subscribe( 'swipeLeft', this.nextView() );
    },

    componentWillUnmount: function () {

        this.pubsub.unsubscribe( this.swipeLeftToken );
    },

    shouldComponentUpdate: function ( nextProps, nextState ) {

        // This view never needs to re-render
        return false;
    },

    nextView: function () {

        const endCallback = () => {

            this.pubsub.publish( 'startQuestion' );
        };

        // Return function for pubsub listener
        return () => {

            // GA code
            ga( 'send', 'event', {
                eventCategory: 'Game',
                eventAction: 'Click',
                eventLabel: 'Take a Shot Button'
            });

            const currView = this.getView();

            if ( currView !== 'instruct-view' ) return;

            this.moveView( this.instructView, this.gameView, endCallback );
        };
    },

    render: function () {

        return (
            <div id="instruct-view" className="view resize">
                <div id="game-logo-wrapper">
                    { this.config.gameLogo }
                </div>
                <p>
                    Guess the cocktail based on the letter of the alphabet. The more you get right, the more we respect you.
                </p>
                <p>
                    Everybody who completes the game will be entered to win boozy prizes.
                </p>
                <p>
                    30 seconds per letter. As many guesses as it takes, drunky.
                </p>
                <button id="instruct-next-btn" className="next-btn" onMouseUp={ this.nextView() }></button>
            </div>
        );
    }
});

export default InstructView;

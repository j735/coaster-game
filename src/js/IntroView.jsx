import React from 'react';

const IntroView = React.createClass({

    componentWillMount: function () {

        this.config = this.props.configData;
        this.pubsub = this.props.pubsub;
        this.moveView = this.props.helpers.moveView;
    },

    componentDidMount: function () {

        this.introView = document.getElementById( 'intro-view' );
        this.instructView = document.getElementById( 'instruct-view' );
    },

    shouldComponentUpdate: function ( nextProps, nextState ) {

        // This view never needs to re-render
        return false;
    },

    startGame: function () {

        // GA code
        ga( 'send', 'event', {
            eventCategory: 'Game',
            eventAction: 'Click',
            eventLabel: 'Play Button'
        });

        const introView = this.introView
            , instructView = this.instructView
            ;

        const viewFunction = () => {

            return () => {

                this.moveView( introView, instructView );
            }
        };

        // Scroll to top callback
        const scrollTo = ( element, to, duration, endCb ) => {

            // Animation end
            if ( duration <= 0 ) {

                if ( endCb ) endCb(); //if callback passed, run it

                return;
            }

            const difference = to - element.scrollTop
                , perTick = difference / duration * 10
                ;

            setTimeout( function () {

                element.scrollTop = element.scrollTop + perTick;

                if ( element.scrollTop === to ) {

                    if ( endCb ) endCb(); //if callback passed, run it

                    return;
                }

                scrollTo( element, to, duration - 10, endCb );

            }, 10 );
        };

        // Scroll to top
        scrollTo( document.body, 0, 500, viewFunction() );
    },

    render: function () {

        return (
            <div id="intro-view" className="view active resize full-height">
                <div className="overlay">
                    { this.config.gameLogo }
                    <p className="instructions">
                        Think you know cocktails? <span>Here are 26 chances to prove it.</span>
                    </p>
                    <button id="start-btn" onMouseUp={ this.startGame }></button>
                </div>
                <div className="bottom-bg"></div>
                <div className="bottom"></div>
            </div>
        );
    }
});

export default IntroView;

import React from 'react';

const ProgressBar = React.createClass({

    getInitialState: function () {

        return {
            countRunning: false,
            timerRemainder: this.props.configData.countdownDuration
        };
    },

    componentWillMount: function () {
    
        this.config = this.props.configData;
        this.pubsub = this.props.pubsub;
        this.getView = this.props.helpers.getView;
    },

    componentDidMount: function () {

        // Create local refs for DOM elements
        this.progress = document.getElementById( 'progress-bar' );

        // Subscribe to custom events
        this.startQuestionToken = this.pubsub.subscribe( 'startQuestion', this.startCountdown );
        this.nextQuestionToken = this.pubsub.subscribe( 'nextQuestion', this.nextQuestion );
        this.correctAnswerToken = this.pubsub.subscribe( 'correctAnswer', this.correctAnswer );
        this.openScoreToken = this.pubsub.subscribe( 'openScore', this.openScore );
        this.closeScoreToken = this.pubsub.subscribe( 'closeScore', this.closeScore );
    },

    componentWillUnmount: function () {

        // Unsubscribe to custom events before next render
        this.pubsub.unsubscribe( this.startQuestionToken );
        this.pubsub.unsubscribe( this.nextQuestionToken );
        this.pubsub.unsubscribe( this.correctAnswerToken );
        this.pubsub.unsubscribe( this.openScoreToken );
        this.pubsub.unsubscribe( this.closeScoreToken );
    },

    shouldComponentUpdate: function ( nextProps, nextState ) {

        // This view never needs to re-render
        return false;
    },

    openScore: function () {

        this.stopTimer();
    },

    closeScore: function () {

        this.progress.style.cssText = '';

        // console.log('this.getView', this.getView());

        if ( this.getView() === 'game-view' ) {

            this.startCountdown();
        }
    },

    correctAnswer: function ( topic, callback ) {

        sessionStorage.setItem( 'qTime', -1 );

        this.stopTimer();

        // Pass back the remaining time to callback
        callback( this.state.timerRemainder );
    },

    nextQuestion: function () {

        this.resetState();

        setTimeout( () => { //give time for progress bar to reset before counting down

            this.startCountdown();

        }, 200 );
    },

    resetProgressBar: function () {

        this.progress.style.cssText = '';
        this.progress.classList.remove( 'caution', 'warning', 'done' );
    },

    resetTimer: function () {

        this.setState( 
            {
                countRunning: false,
                timerRemainder: this.config.countdownDuration
            }
        );
    },

    resetState: function () {

        this.resetProgressBar();

        this.resetTimer();
    },

    stopTimer: function () {

        const progress = this.progress
            , currWidth = window.getComputedStyle( progress, null ).getPropertyValue( 'width' )
            ;

        progress.style.width = currWidth;

        clearTimeout( this.countdownTimer );

        this.setState( { countRunning: false } );
    },

    startCountdown: function () {

        const countRunning = this.state.countRunning;

        // console.log('startCountdown', countRunning);

        if ( countRunning ) return;

        sessionStorage.setItem( 'qTime', 0 );

        this.setState( { countRunning: true } );

        const interval = 200
            , progress = this.progress
            , warningCount = this.config.warningCount
            ;

        let cautionStarted = false
            , warningStarted = false
            ;

        const pollTimer = () => {

            this.countdownTimer = setTimeout( () => {

                const newTimerRemainder = this.state.timerRemainder - interval;

                this.setState( { timerRemainder: newTimerRemainder } );

                sessionStorage.setItem( 'qTime', newTimerRemainder );

                console.log()

                // Caution/Warning Phases: time running out
                if ( newTimerRemainder > 0 ) {

                    // Caution Phase
                    if ( newTimerRemainder > warningCount ) {

                        if ( !cautionStarted ) {

                            progress.classList.add( 'caution' );

                            this.pubsub.publish( 'cautionTime' );

                            cautionStarted = true;
                        }
                    }

                    // Warning Phase
                    else {

                        // this.pubsub.publish( 'countdownTicker' );

                        if ( !warningStarted ) {

                            progress.classList.remove( 'caution' );
                            progress.classList.add( 'warning' );

                            this.pubsub.publish( 'warningTime' );

                            warningStarted = true;
                        }
                    }
                }

                // Time Expired
                else if ( newTimerRemainder <= 0 ) {

                    sessionStorage.setItem( 'qTime', -1 );

                    this.pubsub.publish( 'endTime' );

                    this.stopTimer();

                    return;
                }

                pollTimer();

            }, interval );
        }

        // Start the countdown animation
        progress.style.transition = 'width ' + this.state.timerRemainder + 'ms linear'; //add inline transition
        progress.classList.add( 'done' );

        pollTimer();
    },

    render: function () {

        return (
            <div id="progress-bar"></div>
        );
    }
});

export default ProgressBar;

import React from 'react';

import ProgressBar from './ProgressBar.jsx';

const GameView = React.createClass({

    getInitialState: function() {

        return {
            currIndex: 0,
            responseIndex: 0,
            message: '',
            endTime: false,
            coaster: this.props.configData.coasters[ 0 ]
        }; 
    },

    componentWillMount: function () {

        this.config = this.props.configData;
        this.pubsub = this.props.pubsub;
        this.moveView = this.props.helpers.moveView;
        this.getView = this.props.helpers.getView;
        this.setView = this.props.helpers.setView;
        this.endTimeMsg = this.props.helpers.endTimeMsg;
        this.updateStats = this.props.helpers.updateStats;
        this.showOverlay = this.props.helpers.showOverlay;
        this.hideOverlay = this.props.helpers.hideOverlay;
        this.randomArrayVal = this.props.helpers.randomArrayVal;
        this.updateCurrIndex = this.props.helpers.updateCurrIndex;
        this.displayElephants = this.props.helpers.displayElephants;

        this.answeredQuestions = {};
    },

    componentDidMount: function () {

        // Define component elements and make them available to object
        this.letterImg = document.getElementById( 'letter-img' );
        this.question = document.getElementById( 'question-text' );
        this.answerBox = document.getElementById( 'answer-box' );
        this.gameView = document.getElementById( 'game-view' );
        this.gameInner = document.querySelector( '#game-view .inner' );
        this.gameContent = document.getElementById( 'game-content' );
        this.question = document.getElementById( 'question-text' );
        this.messaging = document.getElementById( 'messaging' );
        this.overlay = document.getElementById( 'game-overlay' );
        this.recipeView = document.getElementById( 'recipe-view' );
        // this.elephants = document.querySelectorAll( '.elephant' );

        // Subscribe to custom events
        this.warningTimeToken = this.pubsub.subscribe( 'warningTime', this.warningTime );
        this.endTimeToken = this.pubsub.subscribe( 'endTime', this.endTime );
        this.nextQuestionToken = this.pubsub.subscribe( 'nextQuestion', this.nextBtnClick );
        this.swipeLeftToken = this.pubsub.subscribe( 'swipeLeft', this.nextView() );
        this.indexUpdateToken = this.pubsub.subscribe( 'indexUpdate', this.updateIndex );
        // this.lastCoasterToken = this.pubsub.subscribe( 'lastCoaster', this.lastCoaster );
    },

    componentWillUnmount: function () {

        // Unsubscribe to custom events
        this.pubsub.unsubscribe( this.warningTimeToken );
        this.pubsub.unsubscribe( this.endTimeToken );
        this.pubsub.unsubscribe( this.nextQuestionToken );
        this.pubsub.unsubscribe( this.swipeLeftToken );
        this.pubsub.unsubscribe( this.indexUpdateToken );
        this.pubsub.unsubscribe( this.lastCoasterToken );
    },

    shouldComponentUpdate: function ( nextProps, nextState ) {

        // Only re-render if currIndex or message changes
        const updateBoolean = this.state.currIndex !== nextState.currIndex || this.state.message !== nextState.message

        return updateBoolean;
    },

    nextView: function () { //only used for swiping left

        // Callback for when animation ends
        const endCallback = () => {

            this.pubsub.publish( 'updateRecipe' );

            this.overlay.classList.remove( 'time' );
        };

        return () => {

            if ( !this.state.endTime ) return; //only advance to next view if time's up

            this.pubsub.publish( 'nextQuestion' );

            this.setView( this.overlay.id ); //update currView in parent state, since last trans didn't update, i.e. still 'game-view'

            this.moveView( this.overlay, this.gameView, endCallback );

            //  Turn elephants off
            this.displayElephants( 'hide' );
            
        };
    },

    nextBtnClick: function () {

        this.resetUi();
        this.nextQuestion();
    },

    nextQuestion: function () {

        const newIndex = this.state.currIndex + 1;

        this.updateCurrIndex( newIndex );

        this.loadQuestion( newIndex );
    },

    resetUi: function () {

        this.setState( { responseIndex: 0 } ); //reset response index

        this.resetText();
    },

    resetText: function () {

        this.updateMessaging( '' );

        this.messaging.classList.remove( 'correct', 'wrong' ); //remove all modifying classes

        this.answerBox.classList.remove( 'correct', 'wrong' ); //remove all modifying classes
        this.answerBox.value = ''; //clear text field

        this.showAnswerBox();
    },

    showAnswerBox: function () {

        this.answerBox.style.display = 'block';
    },

    showRecipe: function () {

        const endCallback = () => {

            this.updateMessaging( '' );
        };

        this.moveView( this.gameView, this.recipeView, endCallback );
    },

    updateIndex: function ( topic, index ) {

        this.setState( { currIndex: index } );
    },

    loadQuestion: function ( index ) {

        const newCoaster = this.config.coasters[ index ];

        this.answeredQuestions[ index ] = false; //set answered flag

        this.setState( 
            {
                coaster: newCoaster,
                endTime: false
            }
        );

        // Update reload session data
        sessionStorage.setItem( 'qIndex', index );
        sessionStorage.setItem( 'qTime', 0 );

        this.pubsub.publish( 'questionLoaded', index );
    },

    doneClick: function ( e ) {

        // console.log('Form field blurred');

        this.checkAnswer( e.target.value );
    },

    keyboardClick: function ( e ) {

        e.preventDefault();

        // Listen for enter key in answer box
        const key = e.keyCode ? e.keyCode : e.which;
        
        if ( key === 13 ) { //enter key

            this.checkAnswer( e.target.value );
        }
    },

    focusAnswerBox: function () {

        this.answerBox.focus();
    },

    warningTime: function () {

        this.updateMessaging( 'Time\'s almost up...hurry!' );
    },

    // Incorrectly answered question
    endTime: function () {

        const cssSelector = `.coaster[data-index="${ this.state.currIndex }"]`
            , thisCoaster= document.querySelector( cssSelector )
            ;

        this.updateStats( 'time', this.config.countdownDuration ); //update total time stat

        this.setState( { endTime: true } );

        // Affect layout
        this.answerBox.blur(); //needed for iphone

        thisCoaster.classList.add( 'wrong' );

        this.updateMessaging( '' ); //clear hurry messaging

        this.endTimeMsg();

        //  Turn elephants on
        this.displayElephants( 'show' );

        this.showOverlay( 'time' );
    },

    // lastCoaster: function () {

    //     this.gameView.classList.remove( 'active' );
    // },

    updateMessaging: function ( msg ) {

        this.setState( { message: msg } );
    },

    checkAnswer: function ( str ) {

        if ( this.answeredQuestions[ this.state.currIndex ] ) return;

        const answerBox = this.answerBox
            , messaging = this.messaging
            , guess = str.trim().toLowerCase() //trim and lowercase text field value
            , correctStr = 'correct'
            ;

        // CORRECT
        const correctAnswer = () => {

            const cssSelector = `.coaster[data-index="${ this.state.currIndex }"]`
                , thisCoaster = document.querySelector( cssSelector )
                , thisIndex = this.state.currIndex
                ;

            const callback = ( timeRemainder ) => {

                this.updateStats( 'time', timeRemainder );
            };

            this.answeredQuestions[ thisIndex ] = true;

            this.updateStats( correctStr, thisIndex );

            // Affect layout
            thisCoaster.classList.add( correctStr );
            messaging.classList.add( correctStr );
            answerBox.classList.add( correctStr );
            this.updateMessaging( 'Correct!' );

            this.showRecipe();

            this.pubsub.publish( 'correctAnswer', callback );
        }

        // INCORRECT
        const wrongAnswer = () => {

            // Check if we've run out of responses
            const responseIndex = ( this.state.responseIndex >= this.state.coaster.responses.length - 1 ) ? 0 : this.state.responseIndex + 1
                , response = this.state.coaster.responses[ this.state.responseIndex ]
                ;

            this.updateMessaging( response );

            this.setState( { responseIndex: responseIndex } );

            answerBox.classList.add( 'wrong' );
        }

        answerBox.classList.remove( 'correct', 'wrong' ); //remove all modifying classes

        // Correct answer
        if (
            guess === this.state.coaster.name.toLowerCase() //matches name of drint
            || ( this.state.coaster.altAnswers && this.state.coaster.altAnswers.indexOf( guess ) > -1 ) //or matches acceptable answers
        ) {

            correctAnswer();
        }

        // Wrong answer
        else {

            wrongAnswer();
        }
    },

    render: function () {

        const imgPath = 'img/drinks/' + this.state.coaster.image;

        return (
            <div id="game-view" className="view resize">
                <ProgressBar configData={ this.config } pubsub={ this.pubsub } helpers={ this.props.helpers } />
                <div className="inner">
                    <div id="game-content">
                        <img id="letter-img" src={ imgPath } />
                    </div>
                    <div id="messaging">{ this.state.message }</div>
                    <input type="text" id="answer-box" placeholder="Guess the cocktail" onKeyUp={ this.keyboardClick } onBlur={ this.doneClick } />
                </div>
            </div>
        );
    }
});

export default GameView;

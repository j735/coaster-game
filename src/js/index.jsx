import 'scss/style'; //import stylesheet
// import 'index.html';

import React from 'react';
import ReactDOM from 'react-dom';

import IntroView from './IntroView.jsx';
import InstructView from './InstructView.jsx';
import GameView from './GameView.jsx';
import RecipeView from './RecipeView.jsx';
import EndView from './EndView.jsx';

import ConfigData from './ConfigData.js';
import Utilities from './Utilities.js';
import PubSub from './PubSub.js';

const App = React.createClass({

    getInitialState: function () {

        return {
            currIndex: 0,
            lastIndex: 0,
            currView: '',
            lastView: '',
            notice: '',
            totalTime: 0,
            correctIndexes: [],
            lastCoaster: false
        };
    },

    componentWillMount: function () {

        const loadImgArr = [
                'misc/game-loader-red.gif'
            ]
            ;

        this.handleTouchStart = Utilities.handleTouchStart;
        this.handleTouchMove = Utilities.handleTouchMove;
        this.randomArrayVal = Utilities.randomArrayVal;
        this.debounce = Utilities.debounce;
        this.loadImages = Utilities.loadImages;

        this.loadImages( loadImgArr );

        // document.addEventListener( 'touchstart', this.handleTouchStart, false );        
        // document.addEventListener( 'touchmove', this.debounce( this.handleTouchMove ), false );
    },

    componentDidMount: function () {

        const loadImgArr = [
                'misc/aabcs-logo-anim.gif',
                'misc/bottles-home.png',
                'style/play-btn.png',
                'style/play-btn-alt.png',
                'style/transition-mask.png',
                'style/another-round-btn.png',
                'style/another-round-btn-alt.png',
                'style/hit-me-again-btn.png',
                'style/hit-me-again-btn-alt.png',
                'style/see-recipe-btn.png',
                'style/see-recipe-btn-alt.png',
                'style/take-a-shot-btn.png',
                'style/take-a-shot-btn-alt.png',
                'style/elephant-sprite.png'
            ]
            , loadDelay = 500 //milliseconds
            ;

        // Post load-images callback
        const callback = () => {

            setTimeout( () => {

                this.gameLoader.classList.remove( 'active' );

            }, loadDelay );
        };

        this.overlay = document.getElementById( 'game-overlay' );
        this.wrapper = document.getElementById( 'wrapper' );
        this.gameHeader = document.getElementById( 'game-header' );
        this.gameLoader = document.getElementById( 'game-loader' );
        this.nextBtn = document.getElementById( 'overlay-next-btn' );
        this.endView = document.getElementById( 'end-view' );
        this.elephants = document.querySelectorAll( '.elephant' );

        this.loadImages( loadImgArr, callback );
        this.resizeElems();

        this.setView( 'intro-view' ); //initialize view var
    },

    shouldComponentUpdate: function ( nextProps, nextState ) {

        const updateBoolean = this.state.currIndex !== nextState.currIndex;

        // Only re-render if currIndex changes
        return updateBoolean;
    },

    lastCoaster: function () {

        // Override nextBtnClick function
        // this.nextBtnClick = () => {

        //     console.log('nextBtnClick');

        //     const scoreArr = this.state.correctIndexes;

        //     const callback = () => {

        //         this.displayElephants( 'hide' );
        //         this.hideOverlay();
        //     };

        //     PubSub.publish( 'lastCoaster', scoreArr.length );

        //     this.moveView( this.overlay, this.endView, callback );
        // };

        this.setState( { lastCoaster: true } );

        this.nextBtn.classList.add( 'done' );
    },

    updateCurrIndex: function ( index ) {

        this.setState( { currIndex: index } );

        PubSub.publish( 'indexUpdate', index );

        if ( index + 1 >= ConfigData.coasters.length ) {

            this.lastCoaster();
        }
    },

    getParentState: function ( key ) {

        return this.state[ key ];
    },

    updateStats: function ( action, val ) {

        switch ( action ) {

            // Correct answer
            case 'correct':

                // Stop processing if entry already present
                if ( this.state.correctIndexes.indexOf( val ) > -1 ) return;

                // Copy state array (to update state) and add new question index
                const newArray = this.state.correctIndexes.concat( [ val ] );

                this.setState( { correctIndexes: newArray } );
            
                sessionStorage.setItem( 'qCorrect', JSON.stringify( newArray ) );

                break;

            // Total time update
            case 'time':

                const newTime = this.state.totalTime + val;

                this.setState( { totalTime: newTime } );

                break;

            default:

                console.log( 'No action passed!' );

        }
    },

    resizeElems: function () {

        const rElems = document.querySelectorAll( '.resize' )
            , winHeight = window.innerHeight
            ;

        Array.prototype.forEach.call( rElems, elem => {

            const thisFullHeight = elem.classList.contains( 'full-height' );

            let viewHeight = winHeight;
            
            elem.style.minHeight = viewHeight + 'px';
        });
    },

    endTimeMsg: function () {

        const msg = this.randomArrayVal( ConfigData.nextMessages );

        this.setState( { notice: msg } );
    },

    nextBtnClick: function () {

        const index = this.state.currIndex;

        // Last coaster
        if ( this.state.lastCoaster ) {

            const scoreArr = this.state.correctIndexes;

            const callback = () => {

                this.hideOverlay();
            };

            PubSub.publish( 'lastCoaster', scoreArr.length );

            this.moveView( this.overlay, this.endView, callback );

            this.displayElephants( 'hide' );

            return;
        }

        PubSub.publish( 'swipeLeft' );
    },

    getView: function () {

        return this.state.currView;
    },

    setView: function ( elemId ) {

        const thisView = this.state.currView;

        this.setState( { currView: elemId, lastView: thisView } );

        this.wrapper.className = elemId;
    },

    moveViewEnd: function ( oldView, newView, callback, endCallback ) {

        oldView.removeEventListener( 'animationend', callback );

        oldView.classList.remove( 'active', 'hide' );

        if ( endCallback ) endCallback();
    },

    moveView: function ( oldView, newView, endCallback ) {

        if ( oldView.id !== this.state.currView ) return; //return if oldView isn't the current one

        const viewFunction = () => {

            const callback = () => {

                this.moveViewEnd( oldView, newView, callback, endCallback );
            };

            return callback;
        };

        document.body.scrollTop = document.documentElement.scrollTop = 0;

        oldView.addEventListener( 'animationend', viewFunction(), false );

        newView.classList.add( 'active' );

        oldView.classList.add( 'hide' );

        this.setView( newView.id );
    },

    showOverlay: function ( modeClass, callback ) {

        const viewName = this.overlay.id;

        this.setView( viewName );

        this.overlay.classList.add( 'active', modeClass );

        document.body.scrollTop = document.documentElement.scrollTop = 0;

        if ( callback ) callback();
    },

    hideOverlay: function ( callback ) {

        const isScore = this.overlay.classList.contains( 'score' );

        if ( isScore ) {

            PubSub.publish( 'closeScore' );
        }

        this.overlay.className = '';

        this.setView( this.state.lastView );
    },

    displayElephants: function ( displayState ) {

        const displayMethod = displayState === 'hide' ? 'remove' : 'add';

        Array.prototype.forEach.call( this.elephants, ( elephant ) => {

            elephant.classList[ displayMethod ]( 'active' );
        });
    },

    layoutDrinks: function () {

        const coasterData = ConfigData.coasters;

        // Click listener
        const showRecipe = ( e ) => {

            const thisCoaster = e.currentTarget
                , dataIndex = parseInt( thisCoaster.dataset.index, 10 )
                , currIndex = this.state.currIndex
                ;

            if ( this.state.correctIndexes.indexOf( dataIndex ) > -1 ) {

                this.setState({ 
                    currIndex: dataIndex,
                    lastIndex: currIndex
                });

                this.overlay.classList.remove( 'score' );

                this.overlay.classList.add( 'recipe', 'from-score' );
            }
        };

        // Create array of DOM elements from coaster object
        const coasters = coasterData.map( ( coaster, index ) => {

            const imgPath = 'img/drinks/' + coaster.image;

            return ( <div className="coaster" data-index={ index } key={ coaster.letter } onClick={ showRecipe }><img src={ imgPath } /><span className="status"></span></div> );
        });

        return coasters;
    },

    openScore: function () {

        this.showOverlay( 'score' );

        PubSub.publish( 'openScore' );
    },

    goBack: function () {

        this.setState( { currIndex: this.state.lastIndex } );

        this.overlay.classList.remove( 'recipe', 'from-score' );

        this.overlay.classList.add( 'score' );
    },

    checkContentBlocker: function () {

        if ( !fbLoaded ) {

            alert( 'You have a content blocker enabled.  Please disable if you want to share.' );
        }

        return fbLoaded;
    },

    fbShare: function () {

        if ( !this.checkContentBlocker() ) return;

        const thisCoaster = ConfigData.coasters[ this.state.currIndex ]
            , thisRecipe = thisCoaster.name
            , thisLetter = thisCoaster.letter
            , siteUrl = ConfigData.share.baseUrl
            , thisCaption = ConfigData.share.title
            , thisImg = siteUrl + '/img/' + ConfigData.share.image.replace( '{letter}', thisLetter )
            , thisText = ConfigData.share.copy.replace( '{recipe}', thisRecipe ) + ' #' + ConfigData.share.hashtags
            ;

        console.log('thisImg', thisImg);

        FB.ui({
            method: 'feed',
            link: siteUrl,
            picture: thisImg,
            caption: thisCaption,
            description: thisText,
            display: 'iframe'
        }, function( response ){});
    },

    twShare: function () {

        if ( !this.checkContentBlocker() ) return;

        const twUrl = 'https://twitter.com/intent/tweet'
            , thisCoaster = ConfigData.coasters[ this.state.currIndex ]
            , thisRecipe = thisCoaster.name
            , siteUrl = ConfigData.share.baseUrl
            , hashtags = ConfigData.share.hashtags
            , thisText = ConfigData.share.copy.replace( '{recipe}', thisRecipe )
            , qString = 'url=' + encodeURIComponent( siteUrl ) + '&text=' + encodeURIComponent( thisText ) + '&hashtags=' + encodeURIComponent( hashtags )
            , shareUrl = twUrl + '?' + qString
            ;

        window.open( 
                shareUrl,
                'shareWin',
                'width=500,height=300'
        );
    },

    _fbShare: function () {

        PubSub.publish( 'endShare', 'fbShare' );
    },

    _twShare: function () {

        PubSub.publish( 'endShare', 'twShare' );
    },

    render: function () {

        const coasterNumber = this.state.currIndex + 1
            , thisIndex = this.state.currIndex
            , thisCoaster = ConfigData.coasters[ thisIndex ]
            , recipeImg = 'img/drinks/' + thisCoaster.recipe.body
            , helpers = {
                moveView: this.moveView,
                getView: this.getView,
                setView: this.setView,
                endTimeMsg: this.endTimeMsg,
                showOverlay: this.showOverlay,
                hideOverlay: this.hideOverlay,
                pauseGame: this.pauseGame,
                updateStats: this.updateStats,
                randomArrayVal: this.randomArrayVal,
                getParentState: this.getParentState,
                updateCurrIndex: this.updateCurrIndex,
                checkContentBlocker: this.checkContentBlocker,
                displayElephants: this.displayElephants
            }
            ;

        return (
            <div id="views" className="resize full-height">
                <div id="game-header">
                    <button id="pause-btn" onMouseUp={ this.openScore }>
                        { coasterNumber } / { ConfigData.coasters.length }
                    </button>
                </div>
                <IntroView configData={ this.props.config } pubsub={ this.props.pubsub } helpers={ helpers } />
                <InstructView configData={ this.props.config } pubsub={ this.props.pubsub } helpers={ helpers } />
                <GameView configData={ this.props.config } pubsub={ this.props.pubsub } helpers={ helpers } />
                <RecipeView configData={ this.props.config } pubsub={ this.props.pubsub } helpers={ helpers } />
                <EndView configData={ this.props.config } pubsub={ this.props.pubsub } helpers={ helpers } />
                <div id="game-overlay">
                    <button id="back-btn" onMouseUp={ this.goBack }>
                        <img src="img/misc/back-btn.png" alt="Back" />
                    </button>
                    <button id="close-btn" onMouseUp={ this.hideOverlay }>
                        <img src="img/misc/close-btn.png" alt="Close" />
                    </button>
                    <div className="time-up">
                        <div className="heading">
                            <img src="img/misc/time-up-text.png" alt="Time's Up!" />
                        </div>
                        <div className="notice">{ this.state.notice }</div>
                        <button id="overlay-next-btn" className="next-btn" onMouseUp={ this.nextBtnClick }></button>
                    </div>
                    <div className="questions">
                        { ConfigData.gameLogo }
                        { this.layoutDrinks() }
                    </div>
                    <div className="recipe-text">
                        <img src={ recipeImg } alt="Recipe for { thisCoaster.name }" />
                        <div className="share-buttons">
                            <button onMouseUp={ this.fbShare }><img src="img/misc/fb-share-btn.png" alt="Share on Facebook" /></button>
                            <button onMouseUp={ this.twShare }><img src="img/misc/twitter-share-btn.png" alt="Share on Twitter" /></button>
                        </div>
                    </div>
                    <div className="prize-content">
                        <div className="title">
                            <img src="img/misc/prizes-text.png" alt="Prizes" />
                        </div>
                        <div className="sub-title">Want one of these? Share the game.</div>
                        <div className="share-buttons">
                            <button onMouseUp={ this._fbShare }><img src="img/misc/fb-share-btn.png" alt="Share on Facebook" /></button>
                            <button onMouseUp={ this._twShare }><img src="img/misc/twitter-share-btn.png" alt="Share on Twitter" /></button>
                        </div>
                        <div className="prize">
                            <img src="img/prizes/prize-whiskey.png" alt="Texas Whiskey" />
                            <p className="caption">Texas Whiskey</p>
                        </div>
                        <div className="prize">
                            <img src="img/prizes/prize-mixology-kit.png" alt="Mixology Kit" />
                            <p className="caption">Mixology Kit</p>
                        </div>
                        <div className="prize">
                            <img src="img/prizes/prize-coasters.png" alt="Coasters Set" />
                            <p className="caption">AABC's Coaster Set</p>
                        </div>
                        { ConfigData.copyright }
                    </div>
                </div>
                <div id="game-loader" className="active resize full-height">
                    <img src="img/misc/game-loader-red.gif" alt="Loading..." />
                </div>
                <div className="elephant left"><div className="sprite"></div></div>
                <div className="elephant right"><div className="sprite"></div></div>
            </div>
        );
    }
});

// Init app
ReactDOM.render(
    <App config={ ConfigData } pubsub={ PubSub } />,
    document.getElementById( 'app' )
);

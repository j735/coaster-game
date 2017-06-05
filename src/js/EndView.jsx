import React from 'react';

const EndView = React.createClass({

    getInitialState: function () {

        return {
            title: '',
            message: '',
            shareMsg: '',
            shareImg: ''
        };
    },

    componentWillMount: function () {

        this.config = this.props.configData;
        this.pubsub = this.props.pubsub;
        this.moveView = this.props.helpers.moveView;
        this.getView = this.props.helpers.getView;
        this.showOverlay = this.props.helpers.showOverlay;
        this.checkContentBlocker = this.props.helpers.checkContentBlocker;
    },

    componentDidMount: function () {

        this.wrapper = document.getElementById( 'wrapper' );
        this.endView = document.getElementById( 'end-view' );
        this.overlay = document.getElementById( 'game-overlay' );

        // Subscribe to custom events
        this.lastCoasterToken = this.pubsub.subscribe( 'lastCoaster', this.setEndContent );
        this.endShareToken = this.pubsub.subscribe( 'endShare', this.endShare );
    },

    componentWillUnmount: function () {

        this.pubsub.unsubscribe( this.lastCoasterToken );
        this.pubsub.unsubscribe( this.endShareToken );
    },

    shouldComponentUpdate: function ( nextProps, nextState ) {

        // Only re-render if currIndex changes
        return this.state.title !== nextState.title;
    },

    setEndContent: function ( topic, score ) {

        const endGameObj = this.config.endGameMessages
            , arrKeys = Object.keys( endGameObj )
            ;

        const compareNumbers = ( a, b ) => {

            return a - b;
        };

        const resize = () => {

            const viewHeight = this.endView.offsetHeight + 'px';

            this.wrapper.style.height = viewHeight;
            this.overlay.style.height = viewHeight;
        };

        arrKeys.sort( compareNumbers ); //order array numerically

        for ( var i = 0; i < arrKeys.length; i++) { //using for loop so I can break/return during loop iteration

            const key = arrKeys[ i ]
                , keyNum = parseInt( key, 10 )
                , thisObj = endGameObj[ key ]
                , message = thisObj.message.replace( '{count}', score )
                ;

            if ( score <= keyNum ) {

                const nonZeroIndex = i + 1
                    , imgPath = '/img/share/theaabc_cocktail_share-' + nonZeroIndex + '.jpg'
                    ;

                this.setState({
                    title: thisObj.title,
                    message: message,
                    shareMsg: thisObj.share,
                    shareImg: imgPath
                });

                resize();

                return;
            }
        }
    },

    endShare: function ( topic, shareFunc ) {

        this[ shareFunc ]();
    },

    fbShare: function () {

        if ( !this.checkContentBlocker() ) return;

        const siteUrl = this.config.share.baseUrl
            , thisCaption = this.config.share.title
            , thisImg = siteUrl + this.state.shareImg
            , thisText = this.state.shareMsg + ' #' + this.config.share.hashtags
            ;

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
            , siteUrl = this.config.share.baseUrl
            , thisText = this.state.shareMsg
            , hashtags = this.config.share.hashtags
            , qString = 'url=' + encodeURIComponent( siteUrl ) + '&text=' + encodeURIComponent( thisText ) + '&hashtags=' + encodeURIComponent( hashtags )
            , shareUrl = twUrl + '?' + qString
            ;

        window.open( 
                shareUrl,
                'shareWin',
                'width=500,height=300'
        );
    },

    showScore: function () {

        this.showOverlay( 'score' );
    },

    showPrizes: function () {

        this.showOverlay( 'prizes' );
    },

    playAgain: function () {

        window.location.href = '/';
    },

    render: function () {

        return (
            <div id="end-view" className="view resize">
                <div id="game-logo-wrapper">
                    { this.config.gameLogo }
                </div>
                <div className="intro">You’re a</div>
                <div className="title">{ this.state.title }</div>
                <div className="message">
                    <p>{ this.state.message }</p>
                    <p>Share the game for your chance<br />to win a prize.</p>
                </div>
                <div className="share-buttons">
                    <button onMouseUp={ this.fbShare }><img src="img/misc/fb-share-btn.png" alt="Share on Facebook" /></button>
                    <button onMouseUp={ this.twShare }><img src="img/misc/twitter-share-btn.png" alt="Share on Twitter" /></button>
                </div>
                <div className="buttons">
                    <button id="see-score-btn" className="next-btn" onMouseUp={ this.showScore }></button>
                    <button id="see-prizes-btn" className="next-btn" onMouseUp={ this.showPrizes }></button>
                    <button id="play-again-btn" className="next-btn" onMouseUp={ this.playAgain }></button>
                </div>
                { this.config.copyright }
            </div>
        );
    }
});

export default EndView;

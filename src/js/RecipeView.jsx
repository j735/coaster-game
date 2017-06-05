import React from 'react';

const RecipeView = React.createClass({

    getInitialState: function() {

        return {
            currIndex: 0,
            coaster: {},
            lastCoaster: false
        };
    },

    componentWillMount: function () {

        this.config = this.props.configData;
        this.pubsub = this.props.pubsub;
        this.moveView = this.props.helpers.moveView;
        this.getView = this.props.helpers.getView;
        this.showOverlay = this.props.helpers.showOverlay;
        this.getParentState = this.props.helpers.getParentState;
        this.updateCurrIndex = this.props.helpers.updateCurrIndex;

        this.updateRecipe();
    },

    componentDidMount: function () {

        this.recipeView = document.getElementById( 'recipe-view' );
        this.gameView = document.getElementById( 'game-view' );
        this.endView = document.getElementById( 'end-view' );
        this.nextBtn = document.getElementById( 'recipe-next-btn' );

        // Subscribe to custom events
        this.swipeLeftToken = this.pubsub.subscribe( 'swipeLeft', this.nextView() );
        this.questionLoadedToken = this.pubsub.subscribe( 'questionLoaded', this.updateIndex );
        this.updateRecipeToken = this.pubsub.subscribe( 'updateRecipe', this.updateRecipe );
    },

    componentWillUnmount: function () {

        this.pubsub.unsubscribe( this.swipeLeftToken );
        this.pubsub.unsubscribe( this.questionLoadedToken );
        this.pubsub.unsubscribe( this.updateRecipeToken );
    },

    shouldComponentUpdate: function ( nextProps, nextState ) {

        const updateBoolean = this.state.currIndex !== nextState.currIndex  || this.state.coaster !== nextState.coaster

        // Only re-render if currIndex changes
        return updateBoolean;
    },

    updateIndex: function ( topic, parentIndex ) {

        this.setState( { currIndex: parentIndex } );
    },

    updateRecipe: function () {

        // Update recipe after transition
        const newCoaster = this.config.coasters[ this.state.currIndex ];

        this.setState( { coaster: newCoaster } );

        // Last coaster
        if ( ( this.state.currIndex + 1 ) === this.config.coasters.length ) {

            this.nextBtn.classList.add( 'done' );

            this.setState( { lastCoaster: true } );
        }
    },

    showRecipe: function () {

        this.updateCurrIndex( this.state.currIndex );

        this.showOverlay( 'recipe' );
    },

    nextView: function () {

        return () => {

            const currView = this.getView();

            if ( currView !== 'recipe-view' ) return;

            // Last coaster
            if ( this.state.lastCoaster ) {

                const scoreArr = this.getParentState( 'correctIndexes' );

                this.pubsub.publish( 'lastCoaster', scoreArr.length );

                this.moveView( this.recipeView, this.endView );
            }

            else {

                const endCallback = () => {

                    this.updateRecipe();
                }

                this.pubsub.publish( 'nextQuestion' );

                this.moveView( this.recipeView, this.gameView, endCallback );
            }
        };
    },

    render: function () {

        const thisCoaster = this.state.coaster
            , letterImg = 'img/drinks/' + thisCoaster.image
            , headingImg = 'img/drinks/' + thisCoaster.recipe.heading
            , frameImg = 'img/drinks/drink-' + thisCoaster.letter + '-frame.png'
            ;

        return (
            <div id="recipe-view" className="view resize">
                <div className="content">
                    <img id="letter-img-sm" src={ letterImg } />
                    <img className="hrule top" src="img/misc/horizontal-rule.png" />
                    <img id="recipe-img-1" src={ headingImg } />
                    <div className="frame-wrapper">
                        <img className="frame" src={ frameImg } />
                        <div className="buttons">
                            <button id="recipe-next-btn" className="next-btn" onMouseUp={ this.nextView() }></button>
                            <button id="view-recipe-btn" onMouseUp={ this.showRecipe }></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default RecipeView;

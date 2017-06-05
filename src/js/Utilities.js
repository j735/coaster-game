export default {

    xDown: null,
    yDown: null,

    handleTouchStart: function ( e ) {    

        this.xDown = e.touches[ 0 ].clientX;                                      
        this.yDown = e.touches[ 0 ].clientY;                                      
    },                                             

    handleTouchMove: function ( e ) {

        const instructView = this.instructView;

        if ( ! this.xDown || ! this.yDown ) {

            return;
        }

        const xUp = e.touches[ 0 ].clientX                               
            , yUp = e.touches[ 0 ].clientY
            , xDiff = this.xDown - xUp
            , yDiff = this.yDown - yUp
            ;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/

            if ( xDiff > 0 ) {

                /* left swipe */
                PubSub.publish( 'swipeLeft', this.moveView );
            }

            else {

                /* right swipe */
                PubSub.publish( 'swipeRight', this.moveView );
            }                       
        }

        /* Reset values */
        this.xDown = null;
        this.yDown = null;                                             
    },
    
    loadImages: function ( imgArr, callback ) {

        let imagesLoaded = 0
            , cache = []
            ;

        // Load image array
        imgArr.forEach( ( imgName, i ) => {

            const imgPath = 'img/' + imgName;

            cache[ i ] = new Image();
            cache[ i ].src = imgPath;

            cache[ i ].addEventListener( 'load', () => {

                imagesLoaded += 1;

                // console.log(imagesLoaded + ' of ' + imgArr.length);

                if ( imagesLoaded === imgArr.length && callback ) {

                    callback();
                }
            });
        });
    },

    randomArrayVal: function ( arr ) {

        return arr[ Math.floor( Math.random() * arr.length ) ];
    },

    debounce: function ( fn, delay ) {

        let timer = null;

        return function () {
        
            const context = this
                , args = arguments
                ;

            clearTimeout( timer );

            timer = setTimeout( function () {

                fn.apply( context, args );

            }, delay );
        };
    }
};
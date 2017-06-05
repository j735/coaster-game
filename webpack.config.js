const path = require( 'path' );

const webpack = require( 'webpack' );
const autoprefixer = require( 'autoprefixer' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const BUILD_DIR = path.join( __dirname, './build' );
const APP_DIR = path.join( __dirname, './src' );

const sassLoaders = [
    'css-loader?sourceMap',
    'postcss-loader',
    'sass-loader?sourceMap&indentedSyntax=sass&includePaths[]=' + APP_DIR
];

const config = {
    entry: [
        // 'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
        // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        'js/index.jsx' 
    ],
    output: {
        devtool: 'cheap-module-source-map',
        filename: 'app.js',
        path: path.join( APP_DIR, './js' ),
        publicPath: ''
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract( 'style-loader', sassLoaders.join( '!' ) )
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=../img/style/[name].[ext]'
            }
        
        ]
    },
    // devServer: {
    //     contentBase: './build',
    //     inline: true,
    //     watchOptions: {
    //         aggregateTimeout: 2000 //2 seconds: gives time for view to update
    //     },
    // },
    plugins: [
        new ExtractTextPlugin( '../css/style.css' ), //relative to output.path
        // new webpack.HotModuleReplacementPlugin()
    ],
    postcss: function () {
        return [
            autoprefixer({
                browsers: [ 'last 2 versions' ]
            })
        ];
    },
    resolve: {
        extensions: [ '', '.js', '.jsx', '.scss' ],
        root: [ APP_DIR ]
    }
};

module.exports = config;
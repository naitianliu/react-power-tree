//require our dependencies
let path = require('path');
let webpack = require('webpack');
let BundleTracker = require('webpack-bundle-tracker');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = env => {

    return {
        //the base directory (absolute path) for resolving the entry option
        context: __dirname,
        //the entry point we created earlier. Note that './' means
        //your current directory. You don't have to specify the extension  now,
        //because you will specify extensions later in the `resolve` section
        entry: './example/index.jsx',

        output: {
            //where you want your compiled bundle to be stored
            path: path.resolve('./docs/'),
            //naming convention webpack should use for your files
            filename: 'example.main.js',
        },

        plugins: [
            //tells webpack where to store data about your bundles.
            new BundleTracker({filename: './webpack-stats.json'}),
            new webpack.SourceMapDevToolPlugin({
                exclude: ['popper.js']
            }),
            new webpack.EnvironmentPlugin({}),
            new HtmlWebPackPlugin({
                template: "./example/index.html",
                filename: "./index.html"
            }),
        ],

        module: {
            rules: [
                //a regexp that tells webpack use the following loaders on all
                //.js and .jsx files
                {
                    test: /\.(js|jsx)?$/,
                    //we definitely don't want babel to transpile all the files in
                    //node_modules. That would take a long time.
                    exclude: /node_modules/,
                    //use the babel loader
                    loader: 'babel-loader',
                    query: {
                        //specify that we will be dealing with React code
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-transform-spread"
                        ]
                    },
                },
                {
                    test: /\.txt$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                    use: 'url-loader?limit=8192'
                },
                {
                    test: /\.css$/,
                    // loader: 'style-loader!css-loader',
                    use: ['style-loader', 'css-loader'],
                }
            ],
        },

        resolve: {
            //tells webpack where to look for modules
            modules: [
                "node_modules",
                path.resolve('./src'),
                path.resolve('./example'),
            ],
            alias: {
                src: path.resolve('./src'),
                example: path.resolve('./example'),
            },
            //extensions that should be used to resolve modules
            extensions: ['.js', '.jsx'],
        },

        mode: 'development',

        devtool: 'inline-source-map',

        stats: {
            errorDetails: true,
            errors: true,
            source: true,
        }
    }
};

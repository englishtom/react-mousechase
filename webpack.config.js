const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = () => {
    return {
        mode: 'development',
        entry: ['./example/main.js'],
        //output: {
            //path: path.resolve(__dirname, 'dist'),
            //filename: './js/bundle.js',
        //},
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                    exclude: /(node_modules|bower_components)/,
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        //'postcss-loader',
                        {
                            loader: 'sass-loader',
                            query: {
                                includePaths: [path.resolve(__dirname, 'node_modules')]
                            }
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-url-loader',
                    options: {
                        // Images larger than 10 KB won’t be inlined
                        //limit: 10 * 1024,
                        // Remove quotes around the encoded URL –
                        // they’re rarely useful
                        noquotes: true,
                        fallback: 'file-loader',
                        name: '/assets/images/[name].[ext]',
                        useRelativePath: false,
                    },
                },
                {
                    test: /\.(jpe?g|png|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                // Images larger than 10 KB won’t be inlined
                                //limit: 10 * 1024,
                                fallback: 'file-loader',
                                name: '[name].[ext]',
                                useRelativePath: true,
                            },
                        },
                    ],
                },
            ],
        },
        stats: {
            colors: true,
        },
        devtool: 'source-map',
        //devServer: {
            //contentBase: path.join(__dirname, 'dist'),
        //},
        plugins: [
            new HtmlWebpackPlugin({
                template: './example/index.html',
                //filename: './index.html',
            }),
        ],
    };
};

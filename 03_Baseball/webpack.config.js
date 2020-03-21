const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'baseball-setting',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    
    entry: { // 입력
        app: ['./client']
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR']
                        },
                        debug: true
                }],
                 '@babel/preset-react'
                ],
                plugins: ['@babel/plugin-proposal-class-properties', 'react-hot-loader/babel']
            }
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true })
    ],
    output: { // 출력
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist' // 가상경로
    }
};
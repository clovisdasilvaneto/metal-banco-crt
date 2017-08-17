const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Banco CRT'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	],
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				'style-loader',
				'css-loader',
				'sass-loader'
			]
		}],
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015'],
					plugins: ['babel-plugin-transform-node-env-inline']
				}
			}
		]
	},
	output: {
		filename: '[name]bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};

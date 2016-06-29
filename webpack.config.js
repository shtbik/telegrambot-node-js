var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

module.exports = {

	name: 'js',
	passPerPreset: true,
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'./src/js/index.js',
		'./src/scss/index.scss'
	],

	vendor: [
		'classnames',
		'react',
		'react-dom',
		'react-redux',
		'react-router',
		'react-router-redux',
		'react-virtualized',
		'redux',
		'redux-form',
		'redux-thunk'
	],

	output: {
		path: path.join(__dirname, 'static/scripts'),
		filename: 'bundle.js'
	},

	plugins: [
		new ExtractTextPlugin('../styles/[name].css'),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: nodeEnv
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
			filename: 'vendor.bundle.js'
		})

	],

	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'babel',
			
			query: {presets: ['react', 'es2015', 'stage-0']},
			exclude: /node_modules/,
			include: __dirname
		}, {
			test: /\.less?$/,
			loaders: ['style', 'raw', 'less'],
			include: __dirname
		}, {
			test: /\.(css|scss)$/,
			loader: ExtractTextPlugin.extract('style-loader', 'raw-loader!sass-loader'),
			include: __dirname
		}]
	}
}
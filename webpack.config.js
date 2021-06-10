const path = require('path');

module.exports = {
	mode: 'development',
	// mode: 'production',
	entry: {
		index: "./src/index.js"
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'public')
	},
};
module.exports = function (api) {
	api.cache(true);

	const exclude = [ 'node_modules/**' ];
	const presets = [ '@babel/preset-env', '@babel/preset-react' ];
	const plugins = [ ];

	return {
		exclude,
		presets,
		plugins
	};
};

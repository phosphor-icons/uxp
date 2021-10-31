module.exports = {
    entry: "./src/main.jsx",
    output: {
        path: __dirname,
        filename: 'main.js',
        libraryTarget: "commonjs2"
    },
    devtool: "none", // prevent webpack from using eval() on my module
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    plugins: [
                        "transform-react-jsx"
                    ]
                }
            },
            {
				test: /\.(png|svg|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'dist/assets',
							publicPath: 'assets'
						}
					}
				]
			},
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    externals: {
        assets: 'assets',
		scenegraph: 'scenegraph',
		application: 'application',
		commands: 'commands',
		clipboard: 'clipboard',
		cloud: 'cloud',
		uxp: 'uxp',
		viewport: 'viewport',
		interactions: 'interactions'
    }
};
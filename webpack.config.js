module.exports = {
    entry: "./src/app.js",
    output: {
        path: './dist/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        host: 'localhost',
        contentBase: './dist/'
    },
    resolve: {
        extensions: ['', '.js']
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};

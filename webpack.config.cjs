// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

module.exports = {
    entry: './src/module.ts',
    output: {
        filename: 'module.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'development',
}
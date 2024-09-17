// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/module.ts',
    output: {
        filename: 'module.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.hbs$/,
                use: 'raw-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/templates', to: 'templates' }
            ]
        })
    ]
};
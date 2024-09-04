// eslint-disable-next-line @typescript-eslint/no-require-imports
const { merge } = require('webpack-merge');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const common = require('./webpack.common.cjs');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
    },
});
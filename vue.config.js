const path = require('path');

module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve('src/assets/style/common.less')]
        }
    }
};

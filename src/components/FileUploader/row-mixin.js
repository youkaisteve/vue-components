import utils from './utils.js';
export default {
    methods: {
        formatSize(row) {
            return utils.formatSize(row.size);
        },
        formatProgress(row) {
            return parseFloat(row.progress).toFixed(0) + '%';
        },
        fileName(row) {
            return row.name.substring(row.name.lastIndexOf('/') + 1, row.name.length);
        }
    }
};

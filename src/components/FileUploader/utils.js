export default {
  formatSize: function(size) {
    if (isNaN(size)) {
      return size;
    }
    if (size > 1024 * 1024 * 1024 * 1024) {
      return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB';
    } else if (size > 1024 * 1024 * 1024) {
      return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
    } else if (size > 1024 * 1024) {
      return (size / 1024 / 1024).toFixed(2) + ' MB';
    } else if (size > 1024) {
      return (size / 1024).toFixed(0) + ' KB';
    }
    return size.toString() + ' B';
  }
};

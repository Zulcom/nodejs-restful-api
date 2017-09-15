'use strict';

const del = require('del');

/*
  del eg:
  del.sync(['files', '!file.js'])
*/

class CleanPlugin {
  constructor (options) {
    this.options = options;
  }
  apply () {
    del.sync(
      this.options.files
    );
  }
};

module.exports = CleanPlugin;

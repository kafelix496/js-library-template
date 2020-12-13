'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./customLibraryTemplate.min.js');
} else {
  module.exports = require('./customLibraryTemplate.js');
}

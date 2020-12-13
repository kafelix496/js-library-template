'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./customLibrary.min.js');
} else {
  module.exports = require('./customLibrary.js');
}

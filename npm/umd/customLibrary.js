(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.customLibrary = {}));
}(this, (function (exports) { 'use strict';

	var add = function add(a, b) {
	  return a + b;
	};

	var multiply = function multiply(a, b) {
	  return a * b;
	};

	exports.add = add;
	exports.multiply = multiply;

	Object.defineProperty(exports, '__esModule', { value: true });

})));

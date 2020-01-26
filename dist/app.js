module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./db.js":
/*!***************!*\
  !*** ./db.js ***!
  \***************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MongoClient = __webpack_require__(/*! mongodb */ "mongodb").MongoClient;

const state = {
  db: null
};

exports.connect = (url, done) => {
  if (state.db) return state.db;
  MongoClient.connect(url, (err, db) => {
    if (err) return done(err);
    state.db = db;
    done();
  });
};

exports.get = () => state.db;

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(/*! express */ "express");

const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");

const app = express();

const db = __webpack_require__(/*! ../db */ "./db.js");

const dataController = __webpack_require__(/*! ./controllers/data */ "./src/controllers/data.js");

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 'GET, POST, OPTIONS, PUT, PATCH, DELETE'

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); // db.connect('mongodb://mongo:27017/gate', (err) => {

db.connect('mongodb://127.0.0.1:27017/gate', err => {
  if (err) return console.log(err);
  app.listen(3012, () => {
    console.log('API app started!');
  });
});
app.get('/places', dataController.getPlaces);
app.get('/', (req, res) => {
  res.send('What did u want to see here?');
});

/***/ }),

/***/ "./src/controllers/data.js":
/*!*********************************!*\
  !*** ./src/controllers/data.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Data = __webpack_require__(/*! ../models/data */ "./src/models/data.js");

exports.getPlaces = (req, res) => {
  const {
    min_latitude = '',
    min_longitude = '',
    max_latitude = '',
    max_longitude = '',
    city_id = '',
    limit = '',
    cursor = ''
  } = req;
  Data.getPlaces({
    min_latitude,
    min_longitude,
    max_latitude,
    max_longitude,
    city_id,
    limit
  }, cursor, (err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.send(docs);
  });
};

/***/ }),

/***/ "./src/models/data.js":
/*!****************************!*\
  !*** ./src/models/data.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const db = __webpack_require__(/*! ../../db */ "./db.js");

const ObjectID = __webpack_require__(/*! mongodb */ "mongodb").ObjectID;

exports.getPlaces = (userID, cursor, cb) => {
  db.get().collection('users').findOne({
    userID: userID
  }, (err, doc) => {
    if (!!!doc) cb(true, doc);else cb(err, doc);
  });
};

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ })

/******/ });
//# sourceMappingURL=app.js.map
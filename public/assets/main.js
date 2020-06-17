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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar url = window.location.href;\nvar roomArr = url.split('/');\nvar roomName = roomArr[roomArr.length - 1];\nvar validRooms = [\"css\", \"javascript\", \"swift\"];\nvar isCurrentRoom = validRooms.includes(roomName);\n\nif (isCurrentRoom) {\n    var room = roomName;\n    var socket = io('/tech');\n    $('form').submit(function () {\n        var msg = $('#m').val();\n        var user = localStorage.getItem('username');\n\n        socket.emit('message', { msg: msg, room: room, user: user });\n        $('#m').val('');\n        return false;\n    });\n\n    socket.on('connect', function () {\n        var user = localStorage.getItem('userName');\n\n        socket.emit('join', { room: room, user: user });\n    });\n\n    socket.on('message', function (data) {\n        var user = localStorage.getItem('userName');\n        console.log(data);\n        if (user == data.user) {\n            $('#messages').append($('<le class=\"mine\">').text(data.msg + ' _ ' + data.user));\n        } else {\n            $('#messages').append($('<le class=\"other\">').text(data.msg + ' _ ' + data.user));\n        }\n    });\n\n    socket.on('singleMessage', function (msg) {\n        $('#messages').append($('<li class=\"other\">').text(msg));\n    });\n\n    socket.on('historyChats', function (data) {\n        var user = localStorage.getItem('userName');\n\n        for (var i = 0; 1, data.length; i++) {\n            if (user == data[i].user_name) {\n                $('#messages').append($('<le class=\"mine\">').text(data[i].chat_text + ' _ ' + data[i].user_name));\n            } else {\n                $('#messages').append($('<le class=\"other\">').text(data[i].chat_text + ' _ ' + data[i].user_name));\n            }\n        }\n    });\n}\n\n$(document).ready(function () {\n    $('.room-name').text(roomName);\n    var title = $('title').html();\n    $('title').html(title.replace(\"{{room}}\", roomName));\n\n    $('body').on('click', '._saveUsername', function (event) {\n        event.preventDefault();\n        var userName = $('._userName', userName);\n\n        localStorage.setItem('userName', userName);\n\n        window.location.href = '/rooms';\n    });\n});\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });
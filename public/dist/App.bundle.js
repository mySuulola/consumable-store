/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem) {
    elem.on(name, fn);
  });
};

exports.$ = $;
exports.$$ = $$;

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function autocomplete(input, latInput, lngInput) {
  if (!input) return;
  var dropdown = new google.maps.places.Autocomplete(input);
  dropdown.addListener('place_changed', function () {
    var place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });

  input.on('keydown', function (e) {
    if (e.keyCode === 13) e.preventDefault();
  });
}

exports.default = autocomplete;

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _bling = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ajaxHeart(e) {
  var _this = this;

  e.preventDefault();
  _axios2.default.post(this.action).then(function (res) {
    var isHearted = _this.heart.classList.toggle("heart__button--hearted");
    (0, _bling.$)(".heart-count").textContent = res.data.hearts.length;
    if (isHearted) {
      _this.heart.classList.add('heart__button--float');
      setTimeout(function () {
        return _this.heart.classList.remove('heart__button--float');
      }, 2500);
    }
  });
}

exports.default = ajaxHeart;

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _bling = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapOptions = {
    center: { lat: 43.2, lng: -79.8 },
    zoom: 8
};

function loadPlaces(map) {
    var lat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 43.2;
    var lng = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -79.8;

    _axios2.default.get('/api/stores/near?lat=' + lat + '&lng=' + lng).then(function (res) {
        var places = res.data;
        if (!places.length) {
            alert('no place found');
            return;
        }
        var bounds = new google.maps.LatLngBounds();

        var infoWindow = new google.maps.InfoWindow();

        var markers = places.map(function (place) {
            var _place$location$coord = _slicedToArray(place.location.coordinates, 2),
                placeLng = _place$location$coord[0],
                placeLat = _place$location$coord[1];

            var position = { lat: placeLat, lng: placeLng };
            bounds.extend(position);
            var marker = new google.maps.Marker({
                map: map,
                position: position
            });
            marker.place = place;
            return marker;
        });
        markers.forEach(function (marker) {
            return marker.addListener('click', function () {
                var html = '\n            <div class=\'popup\'>\n            <a href="/uploads/' + this.place.slug + '" >\n            <img src="/uploads/' + (this.place.photo || 'store.png') + '" alt="' + this.place.name + '" />\n            <p>' + this.place.name + ' - ' + this.place.location.address + '</p>\n            </a>\n            </div>\n           ';

                infoWindow.setContent(html);
                infoWindow.open(map, this);
            });
        });
        map.setCenter(bounds.getCenter());
        map.fitBounds(bounds);
    });
}
function makeMap(mapDiv) {
    if (!mapDiv) return;
    var map = new google.maps.Map(mapDiv, mapOptions);
    loadPlaces(map);

    var input = (0, _bling.$)('[name="geolocate"]');
    var autocomplete = new google.map.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        loadPlaces(map, place.geometry.location.lat(), place.geometry.location.lng());
    });
}

exports.default = makeMap;

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _dompurify = __webpack_require__(32);

var _dompurify2 = _interopRequireDefault(_dompurify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchResultsHTML(stores) {
  return stores.map(function (store) {
    return "\n    <a href=\"/store/" + store.slug + "\" class='search__result'> \n          <strong>" + store.name + "</strong>\n        </a>\n        ";
  }).join("");
}

var typeAhead = function typeAhead(search) {
  if (!search) return;
  var searchInput = search.querySelector('input[name="search"]');
  var searchResults = search.querySelector(".search__results");

  searchInput.on("input", function () {
    var _this = this;

    if (!this.value) {
      searchResults.style.display = "none";
      return;
    }
    searchResults.style.display = "block";
    _axios2.default.get("/api/search?q=" + this.value).then(function (res) {
      if (res.data.length) {
        searchResults.innerHTML = (0, _dompurify2.default)(searchResultsHTML(res.data));
        return;
      }
      searchResults.innerHTML = (0, _dompurify2.default)("<div class=\"search__result\">No result for " + _this.vaue + " found</div>");
    }).catch(function (err) {
      console.error(err);
    });
  });

  searchInput.on("keyup", function (e) {
    if (![38, 40, 13].includes(e.keyCode)) return;

    var current = search.querySelector(".search__result--active");
    var items = search.querySelectorAll(".search__result");
    var next = void 0;
    if (e.keyCode === 40 && current) {
      next = current.nextElementSibling || items[0];
    } else if (e.keyCode === 40) {
      next = items[0];
    } else if (e.keyCode === 38 && current) {
      next = current.previousElementSibling || items[items.length - 1];
    } else if (e.keyCode === 38) {
      next = items[items.length - 1];
    } else if (e.keyCode === 13 && current.href) {
      window.location = current.href;
    }
    if (current) {
      current.classList.remove("search__result--active");
    }
    next.classList.add("search__result--active");
  });
};

exports.default = typeAhead;

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\USER\\Documents\\COdes\\Node\\LearnNodeProject\\node_modules\\css-loader\\lib\\css-base.js'\n    at C:\\Users\\USER\\Documents\\COdes\\Node\\LearnNodeProject\\node_modules\\webpack\\lib\\NormalModule.js:141:35\n    at C:\\Users\\USER\\Documents\\COdes\\Node\\LearnNodeProject\\node_modules\\loader-runner\\lib\\LoaderRunner.js:367:11\n    at C:\\Users\\USER\\Documents\\COdes\\Node\\LearnNodeProject\\node_modules\\loader-runner\\lib\\LoaderRunner.js:203:19\n    at C:\\Users\\USER\\Documents\\COdes\\Node\\LearnNodeProject\\node_modules\\enhanced-resolve\\lib\\CachedInputFileSystem.js:70:14\n    at process._tickCallback (internal/process/next_tick.js:61:11)");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\USER\\Documents\\COdes\\Node\\LearnNodeProject\\node_modules\\axios\\index.js'");

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\USER\\Documents\\COdes\\Node\\LearnNodeProject\\node_modules\\dompurify\\src\\purify.js'");

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(14);

var _bling = __webpack_require__(1);

var _autocomplete = __webpack_require__(10);

var _autocomplete2 = _interopRequireDefault(_autocomplete);

var _typeAhead = __webpack_require__(13);

var _typeAhead2 = _interopRequireDefault(_typeAhead);

var _map = __webpack_require__(12);

var _map2 = _interopRequireDefault(_map);

var _heart = __webpack_require__(11);

var _heart2 = _interopRequireDefault(_heart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _autocomplete2.default)((0, _bling.$)("#address"), (0, _bling.$)("#lat"), (0, _bling.$)("#lng"));

(0, _typeAhead2.default)((0, _bling.$)('.search'));

(0, _map2.default)((0, _bling.$)('#map'));

var heartForms = (0, _bling.$$)('form.heart');
heartForms.on('submit', _heart2.default);

/***/ })

/******/ });
//# sourceMappingURL=App.bundle.js.map
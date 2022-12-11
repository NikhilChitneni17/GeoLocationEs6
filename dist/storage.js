/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkpoc_js_es6"] = self["webpackChunkpoc_js_es6"] || []).push([["storage"],{

/***/ "./src/Storage/storage.css":
/*!*********************************!*\
  !*** ./src/Storage/storage.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://poc-js-es6/./src/Storage/storage.css?");

/***/ }),

/***/ "./src/Storage/firebaseinit.js":
/*!*************************************!*\
  !*** ./src/Storage/firebaseinit.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"./node_modules/firebase/app/dist/index.esm.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/index.esm.js\");\n\r\n\r\n \r\n// if (firebase.apps.length === 0) {\r\nconst firebaseConfig = {\r\n    apiKey: \"AIzaSyBrcpF9VkloaVySuHQxpzjf22Wy-Wgx1YE\",\r\n    authDomain: \"fir-demo-ba443.firebaseapp.com\",\r\n    databaseURL: \"https://fir-demo-ba443-default-rtdb.firebaseio.com\",\r\n    projectId: \"fir-demo-ba443\",\r\n    storageBucket: \"fir-demo-ba443.appspot.com\",\r\n    messagingSenderId: \"739695130615\",\r\n    appId: \"1:739695130615:web:3b5002890888858e54a0f2\",\r\n    measurementId: \"G-ZJ7GNHM732\"\r\n};\r\n// Initialize Firebase\r\nfirebase_app__WEBPACK_IMPORTED_MODULE_0__.default.initializeApp(firebaseConfig);\r\nvar db=firebase_app__WEBPACK_IMPORTED_MODULE_0__.default.firestore();\r\ndb.settings({timestampsInSnapshots:true});\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);\n\n//# sourceURL=webpack://poc-js-es6/./src/Storage/firebaseinit.js?");

/***/ }),

/***/ "./src/Storage/navigation.js":
/*!***********************************!*\
  !*** ./src/Storage/navigation.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @googlemaps/js-api-loader */ \"./node_modules/@googlemaps/js-api-loader/dist/index.esm.js\");\n/* harmony import */ var _storage_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.css */ \"./src/Storage/storage.css\");\n/* harmony import */ var _firebaseinit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./firebaseinit */ \"./src/Storage/firebaseinit.js\");\n\r\n\r\n\r\n\r\nfunction navigation() {\r\n    let map,mapWindow,marker;\r\n    let positions={};\r\n    let formattedAddress;\r\n    let data=[];\r\n    let markers=[];\r\n    let place=document.getElementById(\"map\");\r\n    const loader = new _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__.Loader({\r\n        apiKey: \"AIzaSyCtqSZ-0fMP2eTqFYa4qXUPeRqDcv6h2bI\",\r\n        version: \"weekly\",\r\n      });\r\n      loader.load().then(() => {\r\n        map = new google.maps.Map(place, {\r\n          center: { lat:40.53 , lng: 40.53 },\r\n          zoom: 2,\r\n        });\r\n        mapWindow=new google.maps.InfoWindow;\r\n        // map.setCenter({lat:30,lng:30});\r\n      }).then(()=>{\r\n                /**\r\n         * createRow creates the row dynamically with one value and returns the row\r\n         * @param {string} formattedAddress \r\n         */\r\n        function createRow(formattedAddress) {\r\n            let row=document.createElement(\"tr\");\r\n            let value=document.createElement(\"td\");\r\n            value.innerHTML=formattedAddress;\r\n            row.appendChild(value);\r\n            return row;\r\n        }\r\n        _firebaseinit__WEBPACK_IMPORTED_MODULE_2__.default.collection(\"searches\").get().then(function(snapshot){\r\n            console.log(snapshot.docs[0].data());\r\n            var saved_data=snapshot.docs[0].data().saved_Address;\r\n            console.log(saved_data);\r\n           // console.log(saved_data.saved_Address.length);\r\n            saved_data.forEach(element => {\r\n                positions.lat=element.Latitude;\r\n                positions.lng=element.Longitude;\r\n                formattedAddress=element.Formatted_address;\r\n                console.log(positions,formattedAddress);\r\n                data.push({positions:Object.assign({},positions),formattedAddress:formattedAddress});               \r\n            });\r\n            console.log(data);\r\n            data.forEach((element,i) => {\r\n                console.log(data);\r\n                let table=document.getElementById(\"formatted\");\r\n                let row=createRow(element.formattedAddress);\r\n                row.classList.add(\"table-row\");\r\n                table.appendChild(row);\r\n                row.addEventListener(\"click\",function(){\r\n                    console.log(this,this.children[0].innerHTML);\r\n                    console.log(data);\r\n                    mapWindow.setPosition(data[i].positions);                  \r\n                    mapWindow.setContent(\"Location=\"+data[i].formattedAddress);  \r\n                    map.setCenter(data[i].positions);                   \r\n                    map.setZoom(16);                               \r\n                    mapWindow.open(map);                            \r\n                  });\r\n                addMarker(data[i]);\r\n            });\r\n        })\r\n        /**\r\n         * Adds Marker to the Map with the Click on Table cell\r\n         * \r\n         * @param {object} nav_data \r\n         */\r\n        function addMarker(nav_data) {\r\n                  \r\n                  console.log(nav_data.positions);\r\n                  console.log(\"addmarker\");\r\n                  marker =  new google.maps.Marker({\r\n                    position:nav_data.positions,\r\n                    map:map\r\n                  });\r\n                  console.log(\"executed\");\r\n                  markers.push(marker);\r\n               google.maps.event.addListener(marker,\"mouseover\",function(e){\r\n                //mapWindow.setPosition(data.positions);\r\n                markers.forEach(element => {\r\n                    if(nav_data.positions.lat==element.position.lat())\r\n                    {\r\n                        mapWindow.setContent(\"Location=\"+nav_data.formattedAddress);\r\n                        mapWindow.open(map,element);\r\n                    }\r\n                });  \r\n               });\r\n               google.maps.event.addListener(marker,\"click\",function(e){\r\n                markers.forEach(element => {\r\n                    if(nav_data.positions.lat==element.position.lat())\r\n                    {\r\n                        map.setCenter({lat:element.position.lat(),lng:element.position.lng()})\r\n                        map.setZoom(16);\r\n                    }\r\n                });\r\n            })\r\n        }\r\n      })\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (navigation);\n\n//# sourceURL=webpack://poc-js-es6/./src/Storage/navigation.js?");

/***/ }),

/***/ "./src/Storage/storage.js":
/*!********************************!*\
  !*** ./src/Storage/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _storage_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.css */ \"./src/Storage/storage.css\");\n/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navigation */ \"./src/Storage/navigation.js\");\n/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap */ \"./node_modules/bootstrap/dist/css/bootstrap.css\");\n\r\n\r\n\r\n/**\r\n * createTable creates the table dynamically with sectionhead as heading and returns the table\r\n * @param {string} sectionhead \r\n */\r\nfunction createTable(sectionhead) {\r\n    let table=document.createElement(\"table\");\r\n    table.setAttribute(\"id\",\"formatted_address\"); \r\n    let head=document.createElement(\"tr\");\r\n    let heading=document.createElement(\"th\");\r\n    heading.innerHTML=sectionhead;\r\n    head.appendChild(heading);\r\n    head.classList.add(\"thead\");\r\n    table.appendChild(head);\r\n    table.classList.add(\"table\");\r\n    return table;\r\n}\r\n\r\nlet table=createTable(\"Formatted Address\");\r\ntable.setAttribute(\"id\",\"formatted\");\r\ndocument.getElementById(\"table_container\").appendChild(table);\r\n(0,_navigation__WEBPACK_IMPORTED_MODULE_1__.default)();\n\n//# sourceURL=webpack://poc-js-es6/./src/Storage/storage.js?");

/***/ })

},
0,[["./src/Storage/storage.js","runtime","vendors-node_modules_googlemaps_js-api-loader_dist_index_esm_js-node_modules_firebase_app_dis-d502e8"]]]);
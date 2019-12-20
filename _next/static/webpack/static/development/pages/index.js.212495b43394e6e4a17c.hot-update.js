webpackHotUpdate("static/development/pages/index.js",{

/***/ "./node_modules/process/browser.js":
false,

/***/ "./node_modules/string-hash/index.js":
false,

/***/ "./node_modules/styled-jsx/dist/lib/stylesheet.js":
false,

/***/ "./node_modules/styled-jsx/dist/style.js":
false,

/***/ "./node_modules/styled-jsx/dist/stylesheet-registry.js":
false,

/***/ "./node_modules/styled-jsx/style.js":
false,

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_reservation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-reservation */ "./node_modules/react-reservation/esm/index.js");
/* harmony import */ var react_reservation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_reservation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);





const IndexPage = () => {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", null, "Reservation"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
    charSet: "utf-8"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
    name: "viewport",
    content: "initial-scale=1.0, width=device-width"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("style", {
    jsx: true
  }, `
          .container {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
          }

          h1 {
            text-align: center;
          }
        `), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Reservation"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Repeat "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_reservation__WEBPACK_IMPORTED_MODULE_2___default.a, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Repeat, set disabled weeks and set disabled days"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_reservation__WEBPACK_IMPORTED_MODULE_2___default.a, {
    days: {
      disabledWeeks: [0, 1],
      disabledDays: [moment__WEBPACK_IMPORTED_MODULE_1___default()('2020-04-03')]
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Repeat, set start day and set end day"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_reservation__WEBPACK_IMPORTED_MODULE_2___default.a, {
    days: {
      startDay: moment__WEBPACK_IMPORTED_MODULE_1___default()('2020-02-03'),
      endDay: moment__WEBPACK_IMPORTED_MODULE_1___default()('2020-05-03')
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Specified days"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_reservation__WEBPACK_IMPORTED_MODULE_2___default.a, {
    days: [moment__WEBPACK_IMPORTED_MODULE_1___default()('2020-04-03'), moment__WEBPACK_IMPORTED_MODULE_1___default()('2020-02-04')]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Time Buckets"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_reservation__WEBPACK_IMPORTED_MODULE_2__["ReservationTimeBuckets"], {
    days: {
      startDay: moment__WEBPACK_IMPORTED_MODULE_1___default()('2020-02-03'),
      endDay: moment__WEBPACK_IMPORTED_MODULE_1___default()('2020-05-03')
    },
    ranges: [{
      start: [10, 10],
      end: [11, 20]
    }, {
      start: [11, 30],
      end: [13, 30]
    }, {
      start: [13, 30],
      end: [15, 30]
    }, {
      start: [15, 30],
      end: [20, 30]
    }]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Time Buckets list"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_reservation__WEBPACK_IMPORTED_MODULE_2__["ReservationTimeBuckets"], {
    days: {
      startDay: moment__WEBPACK_IMPORTED_MODULE_1___default()('2020-02-03'),
      endDay: moment__WEBPACK_IMPORTED_MODULE_1___default()('2020-05-03')
    },
    ranges: [{
      start: [10, 10],
      end: [11, 20]
    }, {
      start: [11, 30],
      end: [13, 30]
    }, {
      start: [13, 30],
      end: [15, 30]
    }, {
      start: [15, 30],
      end: [20, 30]
    }],
    mode: "tabs"
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (IndexPage);

/***/ })

})
//# sourceMappingURL=index.js.212495b43394e6e4a17c.hot-update.js.map